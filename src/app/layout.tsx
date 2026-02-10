import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "flow. — Minimalist Task Manager",
  description:
    "A beautifully minimal, engineering-grade todo app crafted with care.",
  metadataBase: new URL("https://liuxiaozhi.org"),
  openGraph: {
    title: "flow.",
    description: "A beautifully minimal task manager.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
