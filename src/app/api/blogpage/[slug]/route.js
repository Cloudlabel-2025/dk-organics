import { connectDB } from "../../../lib/mongodb";
import Blog from "../../../models/blogpage";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { slug } = await params;
    const blog = await Blog.findOne({ slug }).lean();

    if (!blog) {
      return NextResponse.json({ success: false, error: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: blog });
  } catch (err) {
    console.error("GET /api/blogpage/[slug] ERROR:", err);
    return NextResponse.json({ success: false, error: "Failed to fetch blog post" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { slug } = await params; // Here 'slug' is actually the ID from the URL
    const data = await request.json();
    console.log(`PUT /api/blogpage/${slug} (ID update)`);

    const blog = await Blog.findByIdAndUpdate(slug, data, { new: true });

    if (!blog) {
      return NextResponse.json({ success: false, error: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: blog });
  } catch (err) {
    console.error("PUT /api/blogpage/[slug] ERROR:", err);
    return NextResponse.json({ success: false, error: "Failed to update blog post" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { slug } = await params;

    const blog = await Blog.findByIdAndDelete(slug);

    if (!blog) {
      return NextResponse.json({ success: false, error: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Blog post deleted" });
  } catch (err) {
    console.error("DELETE /api/blogpage/[id] ERROR:", err);
    return NextResponse.json({ success: false, error: "Failed to delete blog post" }, { status: 500 });
  }
}
