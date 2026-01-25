import {connect} from "@/db/connectDB"
import product from "@/models/product";
import nodemailer from "nodemailer";
import { secureToken } from "@/lib/downloadtoken";
import DownloadToken from "@/models/DownloadToken";

export async function POST(req) {
  try {
    await connect();

    const { productId, userEmail } = await req.json();

    const products = await product.findById(productId);
    if (!products || !products.files?.length) {
      return Response.json({ message: "No files found" }, { status: 404 });
    }

    // download links 
    const downloadLinks = [];

    for (let index = 0; index < products.files.length; index++) {
      const { raw, jwtToken } = secureToken(productId, index);

      await DownloadToken.create({
        token: raw, 
        productId,
        index,
        email: userEmail,
        expiresAt: Date.now() + 15 * 60 * 1000,
        maxDownloads: 3,
        usedCount: 0,
      });

      //  full URL
      const link = `${process.env.BASE_URL}/api/download/file?token=${jwtToken}`;
      downloadLinks.push(link);
    }


    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const html = `
  <div style="font-family: Arial, sans-serif; background-color: #f7f9fc; padding: 32px; color: #333;">

    <div style="
      max-width: 600px;
      margin: auto;
      background: #ffffff;
      border-radius: 12px;
      padding: 32px;
      border: 1px solid #e5e9f2;
      box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    ">

      <h2 style="text-align: center; color: #1e3a8a; font-size: 26px; margin-bottom: 10px;">
        Your Downloads Are Ready 🎉
      </h2>

      <p style="text-align: center; color: #64748b; font-size: 14px;">
        Thank you for your purchase from <strong>CSEHeavens</strong>
      </p>

      <div style="
        background-color: #eff6ff;
        border-left: 4px solid #3b82f6;
        padding: 16px;
        border-radius: 8px;
        margin-top: 20px;
        margin-bottom: 25px;
      ">
        <p style="margin: 0; color: #1e3a8a; font-size: 15px;">
          Your digital files are available below.  
          <strong>Links expire in 15 minutes.</strong>
        </p>
      </div>

      <h3 style="color: #1e3a8a; font-size: 18px; margin-bottom: 12px;">
        Download Your Files:
      </h3>

      ${downloadLinks
        .map(
          (link, i) => `
          <div style="
            background: #f1f5f9;
            padding: 12px 16px;
            border-radius: 8px;
            margin-bottom: 10px;
            border: 1px solid #e2e8f0;
          ">
            <a href="${link}" style="
              color: #2563eb;
              text-decoration: none;
              font-weight: 600;
            ">📄 File ${i + 1} — Download</a>
          </div>
        `
        )
        .join("")}

      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />

      <p style="color: #64748b; font-size: 14px;">
        Facing issues? Reply to this email — we’ll help you.
      </p>

      <p style="color: #1e293b; font-size: 16px; margin-top: 25px;">
        Regards,<br/>
        <strong>CSEHeavens Team</strong>
      </p>
    </div>
  </div>
`;

    await transporter.sendMail({
      from: `"CSEHeavens" <${process.env.MAIL_USER}>`,
      to: userEmail,
      subject: `Your Downloads for ${products.title}`,
      html,
    });

    return Response.json({ success: true });

  } catch (error) {
    console.error(error);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
