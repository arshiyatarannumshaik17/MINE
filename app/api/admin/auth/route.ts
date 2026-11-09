import { NextRequest, NextResponse } from "next/server";
import { verifyAdminPassword, createAdminSessionToken } from "@/lib/admin/admin-auth";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (!verifyAdminPassword(password)) {
      return NextResponse.json({ success: false, error: "Invalid master admin key" }, { status: 401 });
    }

    const token = createAdminSessionToken();
    const res = NextResponse.json({ success: true, redirectUrl: "/admin" });

    res.cookies.set({
      name: "admin_session",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch {
    return NextResponse.json({ success: false, error: "Authentication failed" }, { status: 500 });
  }
}
