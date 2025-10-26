import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

// No external CSS needed for Lexical - it's styled with Tailwind

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Puck Website",
  description: "Built with Puck, Next.js, and Tailwind CSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}