import { connectDB } from "../../lib/mongodb";
import Product from "../../models/productpage";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({}).lean();
    return NextResponse.json({ success: true, data: products });
  } catch (err) {
    console.error("GET /api/productpage ERROR:", err);
    return NextResponse.json({ success: false, error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    
    if (!data.name || !data.slug) {
      return NextResponse.json({ success: false, error: "Name and slug required" }, { status: 400 });
    }

    const newProduct = await Product.create(data);
    return NextResponse.json({ success: true, data: newProduct }, { status: 201 });
  } catch (err) {
    console.error("POST /api/productpage ERROR:", err);
    return NextResponse.json({ success: false, error: "Failed to create product" }, { status: 500 });
  }
}