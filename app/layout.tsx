import type { Metadata } from "next";
// Correctly import from the 'geist' package
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Script from "next/script";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import ToastProvider from "@/components/providers/toaster-provider";

// The `GeistSans` and `GeistMono` imports are now used directly as class names
// so you no longer need to declare them as constants here.
// You can delete the old `geistSans` and `geistMono` constant declarations.

export const metadata: Metadata = {
  title: "Fly In Fantasy",
  description: "kursus online anda",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        {/* --- THIS IS THE CRUCIAL SCRIPT FOR MIDTRANS --- */}
        <Script
          type="text/javascript"
          src="https://app.sandbox.midtrans.com/snap/snap.js"
          data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        />
        {/* Use the new font variables provided by the geist package */}
        <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
          <ToastProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}