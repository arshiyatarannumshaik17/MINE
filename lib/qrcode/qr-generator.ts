import QRCode from "qrcode";

export const QRCodeGenerator = {
  /**
   * Generate high-res base64 data URL for a recipient portal link
   */
  async generateDataURL(text: string): Promise<string> {
    try {
      return await QRCode.toDataURL(text, {
        width: 400,
        margin: 2,
        color: {
          dark: "#05070f",
          light: "#ffffff",
        },
      });
    } catch {
      return "";
    }
  },

  /**
   * Generate SVG string for vector rendering
   */
  async generateSVG(text: string): Promise<string> {
    try {
      return await QRCode.toString(text, {
        type: "svg",
        margin: 2,
        color: {
          dark: "#0a0d1d",
          light: "#ffffff",
        },
      });
    } catch {
      return "";
    }
  },

  /**
   * Helper to build recipient portal URL
   */
  buildInviteUrl(baseUrl: string, token: string): string {
    const cleanBase = baseUrl.replace(/\/+$/, "");
    return `${cleanBase}/portal?key=${encodeURIComponent(token)}`;
  },
};

