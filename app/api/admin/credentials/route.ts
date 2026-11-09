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

    const { action, recipientId, newPin } = await req.json();

    if (!action || !recipientId) {
      return NextResponse.json(
        { success: false, error: "Action and Recipient ID are required" },
        { status: 400 }
      );
    }

    switch (action) {
      case "regenerate_token": {
        const newToken = CredentialRepository.regenerateToken(recipientId as UniverseId);
        return NextResponse.json({
          success: true,
          message: `Generated new secure token for ${recipientId}`,
          newToken,
        });
      }

      case "update_pin": {
        if (!newPin || typeof newPin !== "string" || newPin.length < 4) {
          return NextResponse.json(
            { success: false, error: "PIN must be at least 4 digits" },
            { status: 400 }
          );
        }
        CredentialRepository.updatePin(recipientId as UniverseId, newPin);
        return NextResponse.json({
          success: true,
          message: `PIN updated successfully for ${recipientId}`,
        });
      }

      case "revoke": {
        CredentialRepository.revokeAccess(recipientId as UniverseId);
        return NextResponse.json({
          success: true,
          message: `Access revoked for ${recipientId}`,
        });
      }

      case "restore": {
        CredentialRepository.restoreAccess(recipientId as UniverseId);
        return NextResponse.json({
          success: true,
          message: `Access restored for ${recipientId}`,
        });
      }

      case "reset_lock": {
        CredentialRepository.resetLockout(recipientId as UniverseId);
        return NextResponse.json({
          success: true,
          message: `Lockout reset for ${recipientId}`,
        });
      }

      default:
        return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ success: false, error: "Credential operation failed" }, { status: 500 });
  }
}

