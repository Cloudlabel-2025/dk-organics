import { connectDB } from "../../lib/mongodb";
import Blog from "../../models/blogpage";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find({}).lean();
    return NextResponse.json({ success: true, data: blogs });
  } catch (err) {
    console.error("GET /api/blogpage ERROR:", err);
    return NextResponse.json({ success: false, error: "Failed to fetch blogs" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();

    if (!data.title || !data.slug || !data.content) {
      return NextResponse.json({ success: false, error: "Title, slug and content required" }, { status: 400 });
    }

    const newBlog = await Blog.create(data);
    return NextResponse.json({ success: true, data: newBlog }, { status: 201 });
  } catch (err) {
    console.error("POST /api/blogpage ERROR:", err);
    return NextResponse.json({ success: false, error: "Failed to create blog" }, { status: 500 });
  }
}