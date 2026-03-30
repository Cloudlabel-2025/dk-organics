import { connectDB } from "../../../lib/mongodb";
import User from "../../../models/User";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();
    const { username, email, password, confirmPassword, secretKey } = await request.json();

    if (!username || !email || !password || !confirmPassword || !secretKey) {
      return NextResponse.json({ success: false, error: "All fields required" }, { status: 400 });
    }

    // Site Owner Secret Key Verification
    const VALID_SECRET_KEY = process.env.ADMIN_SIGNUP_KEY || "DKOrganic2026";
    if (secretKey !== VALID_SECRET_KEY) {
      return NextResponse.json({ success: false, error: "Invalid Admin Secret Key" }, { status: 403 });
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ success: false, error: "Passwords don't match" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ success: false, error: "Password must be at least 6 characters" }, { status: 400 });
    }

    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (existingUser) {
      return NextResponse.json({ success: false, error: "User already exists" }, { status: 400 });
    }

    const userData = {
      username,
      email,
      password,
      role: 'viewer'
    };

    const user = new User(userData);
    await user.save();

    return NextResponse.json({ 
      success: true, 
      message: "User created successfully"
    }, { status: 201 });

  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}