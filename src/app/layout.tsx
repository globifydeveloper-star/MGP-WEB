import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import BranchSelector from "@/components/home/BranchSelector/BranchSelector";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Goldpoint - Muthoot Exim | Sell Your Gold & Get Cash Today",
  description: "Sell your old, unused, or pledged gold instantly at Muthoot Goldpoint. Get the true market value through a transparent evaluation process conducted right in front of you.",
  openGraph: {
    title: "Goldpoint - Muthoot Exim | Sell Your Gold & Get Cash Today",
    description: "Get the true market value for your gold through a transparent process.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable} suppressHydrationWarning>
      <body>
        {children}
        <BranchSelector />
      </body>
    </html>
  );
}
