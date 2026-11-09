import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { universeId, recipientName, mood, message, timestamp } = data;

    if (!universeId || !message) {
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
    }

    const logEntry = {
      universeId,
      recipientName,
      mood,
      message,
      timestamp: timestamp || new Date().toISOString(),
      userAgent: req.headers.get("user-agent") || "unknown",
    };

    // Safely write to local responses vault file if possible
    try {
      const responsesDir = path.join(process.cwd(), "data");
      if (!fs.existsSync(responsesDir)) {
        fs.mkdirSync(responsesDir, { recursive: true });
      }
      const filePath = path.join(responsesDir, "recipient_responses.jsonl");
      fs.appendFileSync(filePath, JSON.stringify(logEntry) + "\n");
    } catch {}

    return NextResponse.json({ success: true, message: "Response vaulted safely" });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to vault response" }, { status: 500 });
  }
}
