import { NextRequest, NextResponse } from "next/server";
import { CredentialRepository } from "@/lib/db/repositories/credential-repository";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token") || searchParams.get("key");

    if (!token) {
      return NextResponse.json({ valid: false, error: "Token is required" }, { status: 400 });
    }

    const info = CredentialRepository.getTokenInfo(token);
    return NextResponse.json(info);
  } catch {
    return NextResponse.json({ valid: false, error: "Failed to resolve invitation" }, { status: 500 });
  }
}

