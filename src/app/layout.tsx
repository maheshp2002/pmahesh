import type { Metadata, Viewport } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import CustomCursor from "@/components/CustomCursor";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://maheshp.dev"),
  title: "Mahesh P — Software Engineer | .NET Backend Developer",
  description: "Personal portfolio of Mahesh P, Software Engineer specializing in .NET Core, database query optimization, high-throughput APIs, and enterprise integrations.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://maheshp.dev",
    siteName: "Mahesh P Portfolio",
    title: "Mahesh P — Software Engineer | .NET Backend Developer",
    description: "Building reliable backend systems and making complex applications work better.",
    images: [
      {
        url: "/images/hero-portrait.png",
        width: 890,
        height: 1024,
        alt: "Mahesh P — Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahesh P — Software Engineer | .NET Backend Developer",
    description: "Building reliable backend systems and making complex applications work better.",
    images: ["/images/hero-portrait.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable} h-full dark`}>
      <body className="min-h-full font-sans antialiased selection:bg-white selection:text-black">
        <ThemeProvider>
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
