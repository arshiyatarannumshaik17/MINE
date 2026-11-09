import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "12 Little Universes — Arshiya's Edition",
  description: "Twelve personalized interactive animated universes created for twelve special souls in Arshiya's life.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#04060c] text-slate-100 antialiased min-h-screen selection:bg-rose-500/30 selection:text-rose-200">
        {children}
      </body>
    </html>
  );
}

