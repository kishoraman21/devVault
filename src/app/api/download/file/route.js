import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import DownloadToken from "@/models/DownloadToken";
import { connect } from "@/db/connectDB";

export async function GET(req) {
  try {
    await connect();

    const { searchParams } = new URL(req.url);
    const jwtToken = searchParams.get("token");

    if (!jwtToken) {
      return NextResponse.json({ message: "Token missing" }, { status: 400 });
    }

    // VERIFY JWT
    let decoded;
    try {
      decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    } catch (err) {
      return Response.redirect(`${process.env.BASE_URL}/error/link-expired`);
    }

    const { raw, productId, index } = decoded;

    // VERIFY RAW TOKEN IN DATABASE
    const tokenRecord = await DownloadToken.findOne({ token: raw });

    if (!tokenRecord) {
      return NextResponse.json(
        { message: "Token not found or revoked" },
        { status: 404 }
      );
    }

    // EXPIRY CHECK
    if (Date.now() > tokenRecord.expiresAt) {
      return Response.redirect(`${process.env.BASE_URL}/error/link-expired`);
    }

    // RATE LIMIT CHECK
    if (tokenRecord.usedCount >= tokenRecord.maxDownloads) {
      return Response.redirect(`${process.env.BASE_URL}/error/download-limit`);
    }

    // SERVE PDF FILE
    const Product = await import("../../../../models/product").then(
      (m) => m.default
    );

    const productData = await Product.findById(productId);
    if (!productData) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    const filePath = productData.files[index];
    if (!filePath) {
      return NextResponse.json({ message: "File not found" }, { status: 404 });
    }

    // const absolutePath = path.join(process.cwd(),
    const absolutePath = path.join(process.cwd(), "public", filePath);

    if (!fs.existsSync(absolutePath)) {
      return Response.redirect(`${process.env.BASE_URL}/error/file-missing`);
    }
    // UPDATE USAGE COUNT
    tokenRecord.usedCount += 1;
    await tokenRecord.save();

    // Return PDF stream
    const fileStream = fs.createReadStream(absolutePath);

    return new Response(fileStream, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${path.basename(
          absolutePath
        )}"`,
      },
    });
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
