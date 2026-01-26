import { connectDB } from "../../lib/mongodb";
import User from "../../models/Emp";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const users = await User.find({}).lean();
    return NextResponse.json({ success: true, data: users });
  } catch (err) {
    console.error("GET /api/users ERROR:", err);
    return NextResponse.json({ success: false, error: "Failed to fetch users" }, { status: 500 });
  }
}

// ----- POST User -----
export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();

    if (!data.name || !data.email) {
      return NextResponse.json({ success: false, error: "Name and email required" }, { status: 400 });
    }

    const newUser = await User.create(data);
    return NextResponse.json({ success: true, data: newUser }, { status: 201 });
  } catch (err) {
    console.error("POST /api/users ERROR:", err.message);
    return NextResponse.json({ 
      success: false, 
      error: err.message || "Failed to create user",
      details: err.name 
    }, { status: 500 });
  }
}