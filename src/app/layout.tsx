import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MAGRE | Premium Women's Fashion",
  description:
    "MAGRE is a premium Nigerian fashion brand. Ready-to-wear shirts, trousers, and nickers designed exclusively for women of all sizes.",
  keywords: [
    "Nigerian fashion",
    "African clothing",
    "Women's shirts",
    "Women's trousers",
    "Women's undergarments",
    "Lagos fashion",
    "women's wear",
    "ready to wear",
    "MAGRE",
  ],
  openGraph: {
    title: "MAGRE | Premium Women's Fashion",
    description: "Ready-to-wear shirts, trousers, and nickers designed exclusively for women of all sizes.",
    url: "https://mag-drab.vercel.app",
    siteName: "MAGRE Fashion",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${playfair.variable}`}>
      <body className="min-h-screen">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
