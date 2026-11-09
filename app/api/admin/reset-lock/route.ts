import { NextRequest, NextResponse } from "next/server";
import { isCurrentUserAdmin } from "@/lib/admin/admin-auth";
import { CredentialRepository } from "@/lib/db/repositories/credential-repository";
import { UniverseId } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const isAdmin = await isCurrentUserAdmin();
    if (!isAdmin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 });
    }

    const { recipientId } = await req.json();
    if (!recipientId) {
      return NextResponse.json({ success: false, error: "Recipient ID required" }, { status: 400 });
    }

    CredentialRepository.resetLockout(recipientId as UniverseId);

    return NextResponse.json({ success: true, message: `Lockout reset for ${recipientId}` });
  } catch {
    return NextResponse.json({ success: false, error: "Reset failed" }, { status: 500 });
  }
}
