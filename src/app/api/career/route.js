import { connectDB } from "../../lib/mongodb";
import Career from "../../models/Career";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    const careers = await Career.find({}).lean();
    return NextResponse.json({ success: true, data: careers });
  } catch (err) {
    console.error("GET /api/career ERROR:", err.message);
    return NextResponse.json({ success: false, error: "Failed to fetch careers" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();

    if (!data.title || !data.location || !data.type || !data.roleAndResponsibility || !data.gender) {
      return NextResponse.json({ success: false, error: "Title, location, type, role and responsibility, and gender required" }, { status: 400 });
    }

    const newCareer = await Career.create(data);
    return NextResponse.json({ success: true, data: newCareer }, { status: 201 });
  } catch (err) {
    console.error("POST /api/career ERROR:", err.message);
    return NextResponse.json({ success: false, error: "Failed to create career" }, { status: 500 });
  }
}
