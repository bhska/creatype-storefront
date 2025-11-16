import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";
import { CartProvider } from "@/lib/cart-context";
import { Toaster } from "sonner";

const generalSans = localFont({
  src: [
    {
      path: "../../public/fonts/GeneralSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/GeneralSans-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/GeneralSans-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/GeneralSans-Italic.woff",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/GeneralSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/GeneralSans-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/GeneralSans-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/fonts/GeneralSans-MediumItalic.woff",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/fonts/GeneralSans-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/GeneralSans-Semibold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/GeneralSans-SemiboldItalic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../public/fonts/GeneralSans-SemiboldItalic.woff",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../public/fonts/GeneralSans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/GeneralSans-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/GeneralSans-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/fonts/GeneralSans-BoldItalic.woff",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-general-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Creatype Studio - Font Marketplace",
  description: "Discover fonts that define your style",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={generalSans.variable}>
      <head>
        <Script
          crossOrigin="anonymous"
          src="//unpkg.com/same-runtime/dist/index.global.js"
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${generalSans.className} antialiased`}
      >
        <CartProvider>
          <ClientBody>{children}</ClientBody>
          <Toaster position="bottom-right" richColors />
        </CartProvider>
      </body>
    </html>
  );
}
