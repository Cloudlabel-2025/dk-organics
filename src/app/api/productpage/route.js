import { connectDB } from "../../lib/mongodb";
import Product from "../../models/productpage";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ success: false, error: "Database not configured" }, { status: 500 });
    }
    await connectDB();
    const products = await Product.find({}).lean();
    return NextResponse.json({ success: true, data: products });
  } catch (err) {
    console.error("GET /api/productpage ERROR:", err.message);
    return NextResponse.json({ success: false, error: "Failed to fetch products", details: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ success: false, error: "Database not configured" }, { status: 500 });
    }
    await connectDB();
    const data = await request.json();
    
    if (!data.name || !data.slug) {
      return NextResponse.json({ success: false, error: "Name and slug required" }, { status: 400 });
    }

    const newProduct = await Product.create(data);
    return NextResponse.json({ success: true, data: newProduct }, { status: 201 });
  } catch (err) {
    console.error("POST /api/productpage ERROR:", err.message);
    return NextResponse.json({ success: false, error: "Failed to create product", details: err.message }, { status: 500 });
  }
}