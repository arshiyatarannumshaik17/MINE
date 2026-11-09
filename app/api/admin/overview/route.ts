import { NextRequest, NextResponse } from "next/server";
import { isCurrentUserAdmin } from "@/lib/admin/admin-auth";
import { CredentialRepository } from "@/lib/db/repositories/credential-repository";
import { QuizRepository } from "@/lib/db/repositories/quiz-repository";
import { ResponseRepository } from "@/lib/db/repositories/response-repository";
import { QRCodeGenerator } from "@/lib/qrcode/qr-generator";

export async function GET(req: NextRequest) {
  try {
    const isAdmin = await isCurrentUserAdmin();
    if (!isAdmin) {
      return NextResponse.json({ success: false, error: "Unauthorized access" }, { status: 403 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const credentials = CredentialRepository.getCredentialsOverview();

    // Generate QR codes for each recipient
    const recipientsWithQR = await Promise.all(
      credentials.map(async (c) => {
        const inviteUrl = QRCodeGenerator.buildInviteUrl(baseUrl, c.token);
        const qrDataUrl = await QRCodeGenerator.generateDataURL(inviteUrl);
        return {
          ...c,
          inviteUrl,
          qrDataUrl,
        };
      })
    );

    const attempts = QuizRepository.getAllAttempts();
    const responses = ResponseRepository.getAllResponses();

    return NextResponse.json({
      success: true,
      recipients: recipientsWithQR,
      attempts,
      responses,
      stats: {
        totalRecipients: credentials.length,
        totalAttempts: attempts.length,
        totalResponses: responses.length,
      },
    });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to load overview" }, { status: 500 });
  }
}

