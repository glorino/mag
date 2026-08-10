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
  title: "GZK | Women's Wears",
  description:
    "GZK is a clothing brand located in Lagos Nigeria. We produce ready to wear dresses, blouses, shirts, jackets and tunics for women of all sizes.",
  keywords: [
    "Nigerian fashion",
    "African clothing",
    "Ankara",
    "Adire",
    "Kaftans",
    "Lagos fashion",
    "women's wear",
    "ready to wear",
    "GZK",
  ],
  openGraph: {
    title: "GZK | Women's Wears",
    description: "Ready to wear dresses, blouses, shirts, jackets and tunics for women of all sizes.",
    url: "https://mag-drab.vercel.app",
    siteName: "GZK Fashion",
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
