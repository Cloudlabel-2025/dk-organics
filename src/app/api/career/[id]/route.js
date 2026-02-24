import { connectDB } from "../../../lib/mongodb";
import Career from "../../../models/Career";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    
    const career = await Career.findByIdAndDelete(id);
    
    if (!career) {
      return NextResponse.json({ success: false, error: "Career posting not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, message: "Career posting deleted" });
  } catch (err) {
    console.error("DELETE /api/career/[id] ERROR:", err.message);
    return NextResponse.json({ success: false, error: "Failed to delete career posting" }, { status: 500 });
  }
}
