import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google";
import { BRAND_INFO } from "@/lib/constants";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${BRAND_INFO.name} | Advertising & Cinematic Film Production House`,
    template: `%s | ${BRAND_INFO.name}`,
  },
  description: BRAND_INFO.description,
  keywords: [
    "70MM Visual Media",
    "Advertising Agency Chennai",
    "Film Production House Chennai",
    "Commercial Films",
    "Brand Films",
    "Cinematic Production",
    "Post-Production",
    "Chennai Production House",
    "Indian Advertising Agency",
  ],
  authors: [{ name: BRAND_INFO.name }],
  creator: BRAND_INFO.name,
  publisher: BRAND_INFO.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://70mmvisualmedia.com",
    siteName: BRAND_INFO.name,
    title: `${BRAND_INFO.name} | From Script to Screen`,
    description: BRAND_INFO.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "darkreader-lock": "true",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1A0B0B",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cormorant.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen flex flex-col font-sans bg-[#1A0B0B] text-[#F7EFE7] selection:bg-[#C49A5A] selection:text-[#1A0B0B]"
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#C49A5A] focus:text-[#1A0B0B] focus:font-semibold focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
