import type { Metadata } from "next";
import { manrope, spaceGrotesk } from "./fonts";
import "./globals.css";
import { Toaster } from "@Components/ui/sonner";
import { AuthProvider } from "@/context/Auth";

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
    <html
      lang="en"
      className={`${manrope.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <body>
        <AuthProvider>
          <main className="h-full w-full">{children}</main>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
