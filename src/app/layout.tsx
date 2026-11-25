import type { Metadata } from "next";
import { Geist_Mono, Hind_Siliguri } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import "./globals.css";
import Providers from "@/provider";

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
  icons: {
    icon: "/images/logo-mark.png",
    apple: "/images/logo-mark.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${hindSiliguri.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <NextIntlClientProvider messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
