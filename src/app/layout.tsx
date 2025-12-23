import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "MIMIZO STORE - Marketplace Aman & Terpercaya untuk Akun Sosmed & Game",
  description: "Marketplace modern dan profesional untuk jual beli akun sosial media dan game. 100% aman dengan sistem escrow, proses cepat, dan terpercaya.",
  keywords: ["MIMIZO STORE", "marketplace", "akun game", "akun sosmed", "jual beli akun", "escrow", "aman", "terpercaya"],
  authors: [{ name: "MIMIZO STORE Team" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "MIMIZO STORE - Marketplace Akun Sosmed & Game",
    description: "Marketplace Aman & Terpercaya untuk Akun Sosial Media & Game",
    url: "https://mimizostore.com",
    siteName: "MIMIZO STORE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MIMIZO STORE - Marketplace Akun Sosmed & Game",
    description: "Marketplace Aman & Terpercaya untuk Akun Sosial Media & Game",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
