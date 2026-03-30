import { connectDB } from "../../../lib/mongodb";
import User from "../../../models/User";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    await connectDB();
    const { login, password } = await request.json();

    if (!login || !password) {
      return NextResponse.json({ success: false, error: "Login and password required" }, { status: 400 });
    }

    const user = await User.findOne({
      $or: [{ email: login }, { username: login }]
    });

    if (!user || !(await user.comparePassword(password))) {
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
    }

    if (!process.env.JWT_SECRET) {
      console.error("FATAL ERROR: JWT_SECRET is not defined in environment variables.");
      return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      user: { id: user._id, username: user.username, email: user.email, role: user.role }
    });

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return response;

  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}