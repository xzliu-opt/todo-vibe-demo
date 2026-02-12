import type { Metadata } from "next";
import "./globals.css";
import Background from "@/components/Background";
import { LanguageProvider } from "@/hooks/useLanguage";

export const metadata: Metadata = {
  title: "flow.",
  description: "Simplicity in every task.",
  metadataBase: new URL("https://liuxiaozhi.org"),
  openGraph: {
    title: "flow.",
    description: "Simplicity in every task.",
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
      <body className="antialiased">
        <Background />
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
