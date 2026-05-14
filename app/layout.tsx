import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "./_context/AuthContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "7DS - Face Your Demons | Break the Chains of Sin",
  description:
    "A brutal self-discipline platform. Conquer the 7 Deadly Sins through 70 hardcore challenges, AI-verified proof, and a community of warriors.",
  keywords: ["self-discipline", "7 deadly sins", "productivity", "mental toughness", "habit tracker", "discipline app"],
  authors: [{ name: "7DS Team" }],
  openGraph: {
    title: "7DS - Face Your Demons",
    description: "Conquer the 7 Deadly Sins and forge unbreakable discipline.",
    url: "https://7ds.app", // Change this to your real domain later
    siteName: "7DS",
    images: [
      {
        url: "/favicon.png",
        width: 512,
        height: 512,
        alt: "7DS Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "7DS - Break The Chains",
    description: "Brutal challenges to forge a legendary version of yourself.",
    images: ["/favicon.png"],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
