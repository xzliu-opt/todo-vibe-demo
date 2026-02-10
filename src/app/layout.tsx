import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Liuxiaozhi Todo - Minimalist Task Manager",
  description:
    "A beautifully minimal, engineering-grade todo app. Simplicity is the ultimate sophistication.",
  metadataBase: new URL("https://liuxiaozhi.org"),
  openGraph: {
    title: "Liuxiaozhi Todo",
    description: "Simplicity is the ultimate sophistication.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-[family-name:var(--font-inter)] antialiased">
        {children}
      </body>
    </html>
  );
}
