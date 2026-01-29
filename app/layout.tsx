import type { Metadata } from "next";
import { manrope, spaceGrotesk } from "./fonts";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Project on Finance",
  description: "Just another project by yours only Niraj",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${spaceGrotesk.variable} antialiased`}>
      <body>
        <main className="h-full w-full">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
