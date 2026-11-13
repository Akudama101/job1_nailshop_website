import type { Metadata } from "next";
import { Geist, Geist_Mono, Playwrite_BE_WAL_Guides } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playwrite = Playwrite_BE_WAL_Guides({
  variable: "--font-playwrite",
  
  weight: "400",
});

export const metadata: Metadata = {
  title: "Shades Demure",
  description: "Whispered Elegance in Every hue.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playwrite.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
