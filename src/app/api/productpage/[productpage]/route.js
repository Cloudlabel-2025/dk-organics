import { connectDB } from "../../../lib/mongodb";
import Product from "../../../models/productpage";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { productpage } = await params;
    const product = await Product.findOne({ slug: productpage }).lean();

    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: product });
  } catch (err) {
    console.error("GET /api/productpage/[slug] ERROR:", err);
    return NextResponse.json({ success: false, error: "Failed to fetch product" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { productpage } = await params;
    const data = await request.json();

    const product = await Product.findByIdAndUpdate(productpage, data, { new: true });

    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: product });
  } catch (err) {
    console.error("PUT /api/productpage/[id] ERROR:", err);
    return NextResponse.json({ success: false, error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { productpage } = await params;

    const product = await Product.findByIdAndDelete(productpage);

    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Product deleted" });
  } catch (err) {
    console.error("DELETE /api/productpage/[id] ERROR:", err);
    return NextResponse.json({ success: false, error: "Failed to delete product" }, { status: 500 });
  }
}
