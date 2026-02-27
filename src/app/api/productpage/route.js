import { connectDB } from "../../lib/mongodb";
import Product from "../../models/productpage";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    console.log("GET /api/productpage started");
    if (!process.env.MONGODB_URI) {
      console.error("MONGODB_URI missing");
      return NextResponse.json({ success: false, error: "Database not configured" }, { status: 500 });
    }
    await connectDB();
    console.log("Database connected for products");
    const products = await Product.find({}).lean();
    console.log(`Fetched ${products.length} products`);
    return NextResponse.json({ success: true, data: products });
  } catch (err) {
    console.error("GET /api/productpage ERROR:", err);
    return NextResponse.json({
      success: false,
      error: "Failed to fetch products",
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    }, { status: 500 });
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