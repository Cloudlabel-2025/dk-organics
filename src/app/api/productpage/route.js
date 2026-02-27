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
    console.log("POST /api/productpage started");
    if (!process.env.MONGODB_URI) {
      console.error("MONGODB_URI missing in POST");
      return NextResponse.json({ success: false, error: "Database not configured" }, { status: 500 });
    }
    await connectDB();
    const data = await request.json();
    console.log("Received product data:", { ...data, image: data.image ? "PRESENT" : "MISSING" });

    // Validate required fields explicitly to provide better error messages
    const requiredFields = ['name', 'slug', 'description', 'image', 'category'];
    const missingFields = requiredFields.filter(field => !data[field]);

    if (missingFields.length > 0) {
      console.warn("Missing required fields:", missingFields);
      return NextResponse.json({
        success: false,
        error: `Missing required fields: ${missingFields.join(', ')}`
      }, { status: 400 });
    }

    const newProduct = await Product.create(data);
    console.log("Product created successfully:", newProduct._id);
    return NextResponse.json({ success: true, data: newProduct }, { status: 201 });
  } catch (err) {
    console.error("POST /api/productpage ERROR:", err);
    return NextResponse.json({
      success: false,
      error: "Failed to create product",
      message: err.message,
      details: err.errors // Mongoose validation errors
    }, { status: 500 });
  }
}