export const runtime = "nodejs";
import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import { connect } from "@/db/connectDB";
import Product from "@/models/product";
import Order from "@/models/order";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
  try {
    await connect();

    const { productId, userEmail } = await req.json();

    const product = await Product.findById(productId);
    // console.log("product id ",product)
    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    // Check if product is FREE
    const isFree = product.price === "FREE";

    let razorpayOrder = null;
    if (!isFree) {
      razorpayOrder = await razorpay.orders.create({
        amount: product.price * 100,
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
      });
    }

    //  Save order
    const order = await Order.create({
      product: productId,
      email: userEmail,
      amount: product.price,
      razorpayOrderId: isFree ? "FREE" : razorpayOrder.id,
      status: "pending",
    });

    return NextResponse.json({
      success: true,
      isFree: isFree,
      orderId: isFree ? null : razorpayOrder.id,
      dbOrderId: order._id,
      amount: isFree ? 0 : razorpayOrder.amount,
      currency: "INR",
      userEmail: userEmail
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Order creation failed" },
      { status: 500 },
    );
  }
}
