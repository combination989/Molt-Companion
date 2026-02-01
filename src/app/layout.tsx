import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: 'swap',
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: "OpenClaw AI",
  description: "Your confident and slightly mischievous lobster hero AI. OpenClaw is here to help you, mostly.",
  openGraph: {
    title: "OpenClaw AI",
    description: "Your confident and slightly mischievous lobster hero AI. OpenClaw is here to help you, mostly.",
    siteName: "OpenClaw AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenClaw AI",
    description: "Your confident and slightly mischievous lobster hero AI. OpenClaw is here to help you, mostly.",
  },
  icons: {
    icon: "/iddle.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${spaceGrotesk.variable} antialiased`}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
        suppressHydrationWarning
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
