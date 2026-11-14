import type { Metadata } from "next";
import { Geist_Mono, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Providers from "@/provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const hindSiliguri = Hind_Siliguri({
  variable: "--font-sans",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bongaon Bazar | গ্রামের খাঁটি ও ইউনিক প্যাকেটজাত খাবার",
  description:
    "শহরের মানুষ ও প্রবাসীদের পরিবারের জন্য বনগাঁও গ্রামের স্পেশাল প্যাকেটজাত খাবার — ৪ থেকে ৭ দিনে সারাদেশে ক্যাশ অন ডেলিভারি।",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="bn"
      suppressHydrationWarning
      className={`${hindSiliguri.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
