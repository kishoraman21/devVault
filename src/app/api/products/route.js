import {connect} from "@/db/connectDB"
import product from "@/models/product";

export async function GET() {
  try {
    await connect();

    const products = await product
      .find({ isActive: true })
      .select("title category price description pages outcomes contents counts")
      .sort({ createdAt: -1 });

    return Response.json(
      {
        success: true,
        products,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetch products", error);
    return Response.json(
      { success: false, message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
