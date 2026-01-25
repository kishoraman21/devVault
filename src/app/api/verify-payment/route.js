export const runtime = "nodejs";
import crypto from "crypto";
import { connect } from "@/db/connectDB";
import Order from "@/models/order";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import DownloadToken from "@/models/DownloadToken";
import { secureToken } from "@/lib/downloadtoken";
import Product from "@/models/product";

export async function POST(req) {
  try {
    await connect();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      dbOrderId,
      userEmail,
      isFree,
    } = await req.json();

    const order = await Order.findById(dbOrderId);
    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }
    //duplicate payment
    if (order.status === "success") {
      return Response.json({ message: "Payment already processed" });
    }

    if (!isFree) {
      const body = razorpay_order_id + "|" + razorpay_payment_id; // verification
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest("hex");

      if (expectedSignature !== razorpay_signature) {
        order.status = "failed";
        await order.save();

        return NextResponse.json(
          { message: "Payment verification failed" }, //page to be made for failure
          { status: 400 },
        );
      }
    } else {
      // For free orders, ensure the order amount is actually 0 in DB
      if (order.amount !== "FREE") {
        return NextResponse.json(
          { message: "Invalid free order attempt" },
          { status: 400 },
        );
      }
    }

    //for success
    order.status = "success";
    if (!isFree) {
      order.razorpayPaymentId = razorpay_payment_id;
      order.razorpaySignature = razorpay_signature;
    }
    await order.save();

    const product = await Product.findById(order.product);
    if (!product || !product.files?.length) {
      return NextResponse.json(
        { message: "Product files not found" },
        { status: 404 },
      );
    }

    const downloadLinks = [];
    for (let index = 0; index < product.files.length; index++) {
      const { raw, jwtToken } = secureToken(product._id, index);
      await DownloadToken.create({
        token: raw,
        productId: product._id,
        index,
        email: userEmail,
        expiresAt: Date.now() + 15 * 60 * 1000,
        maxDownloads: 3,
        usedCount: 0,
      });
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
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Downloads are Ready</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0;">
                
                <!-- Header Component -->
                <tr>
                  <td align="center" style="padding: 40px 40px 20px 40px;">
                    <img src="${process.env.BASE_URL}/logo_final.png" alt="DevVault" width="48" height="48" style="display: block; margin-bottom: 16px;">
                    <h1 style="margin: 0; color: #0f172a; font-size: 28px; font-weight: 800; letter-spacing: -0.025em;">Your Downloads Are Ready 🎉</h1>
                    <p style="margin: 8px 0 0 0; color: #64748b; font-size: 16px;">Thank you for your purchase from <strong>DevVault</strong></p>
                  </td>
                </tr>

                <!-- Expiration & Limit Warning Component -->
                <tr>
                  <td style="padding: 0 40px;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #eff6ff; border-radius: 12px; border-left: 4px solid #3b82f6;">
                      <tr>
                        <td style="padding: 16px;">
                          <p style="margin: 0; color: #1e40af; font-size: 14px; line-height: 1.5;">
                            <strong>Note:</strong> Your secure download links are active below. For security, these links will <strong>expire in 15 minutes</strong> and have a <strong>limit of 3 download attempts</strong> per file.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Content Body -->
                <tr>
                  <td style="padding: 32px 40px;">
                    <h3 style="margin: 0 0 16px 0; color: #0f172a; font-size: 18px; font-weight: 700;">Access Your Files</h3>
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      ${downloadLinks.map((link, i) => `
                        <tr>
                          <td style="padding-bottom: 12px;">
                            <a href="${link}" style="display: block; background-color: #0f172a; color: #ffffff; text-align: center; padding: 14px 24px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 15px; border: 1px solid #0f172a;">
                              📄 Download File ${i + 1}
                            </a>
                          </td>
                        </tr>
                      `).join('')}
                    </table>
                  </td>
                </tr>

                <!-- Divider -->
                <tr>
                  <td style="padding: 0 40px;">
                    <div style="border-top: 1px solid #e2e8f0;"></div>
                  </td>
                </tr>

                <!-- Footer/Support Component -->
                <tr>
                  <td style="padding: 32px 40px; background-color: #fafafa;">
                    <p style="margin: 0 0 12px 0; color: #475569; font-size: 14px; line-height: 1.6;">
                      Having trouble with your download? Simply reply to this email or contact our support team — we're here to help.
                    </p>
                    <p style="margin: 0; color: #0f172a; font-size: 15px;">
                      Regards,<br>
                      <strong>The DevVault Team</strong>
                    </p>
                  </td>
                </tr>

              </table>
              
              <!-- Legal Footer -->
              <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="padding-top: 24px;">
                <tr>
                  <td align="center">
                    <p style="margin: 0; color: #94a3b8; font-size: 12px;">
                      &copy; 2026 DevVault. All rights reserved.<br>
                      Empowering the next generation of engineers.
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: `"DevVault" <${process.env.MAIL_USER}>`,
      to: userEmail,
      subject: `Your Downloads for ${product.title}`,
      html,
    });

    return NextResponse.json({
      success: true,
      message: "Payment verified and download links sent",
    });
  } catch (error) {
    console.error("Verify payment error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
