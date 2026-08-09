import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

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
  title: "MAG | Premium African Fashion",
  description:
    "MAG is a premium Nigerian fashion brand creating ready-to-wear dresses, kaftans, ankara sets, and contemporary African clothing for the modern woman.",
  keywords: [
    "Nigerian fashion",
    "African clothing",
    "Ankara",
    "Adire",
    "Kaftans",
    "Lagos fashion",
    "women's wear",
    "ready to wear",
  ],
  openGraph: {
    title: "MAG | Premium African Fashion",
    description:
      "Contemporary African fashion for the modern woman. Dresses, kaftans, ankara sets and more.",
    url: "https://mag.vercel.app",
    siteName: "MAG Fashion",
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
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
