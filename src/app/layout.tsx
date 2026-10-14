import type { Metadata } from "next";
import { Inter, Sora, Tajawal } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/layout/Providers";
import { Navbar } from "@/components/layout/Navbar";
import { FooterClient } from "@/components/layout/FooterClient";
import { DemoBar } from "@/components/layout/DemoBar";
import { en } from "@/i18n/en";
import { SITE } from "@/data/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });
const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-tajawal",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${SITE.domain}`),
  icons: { icon: "/favicon.svg" },
  title: {
    default: `${en.meta.siteName} — ${en.meta.tagline}`,
    template: `%s · ${en.meta.siteName}`,
  },
  description: en.meta.description,
  openGraph: {
    title: `${en.meta.siteName} — ${en.meta.tagline}`,
    description: en.meta.description,
    type: "website",
    locale: "en_US",
    alternateLocale: ["ar_SA"],
    images: [{ url: "/og.jpg", width: 2048, height: 1152, alt: en.meta.siteName }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${en.meta.siteName} — ${en.meta.tagline}`,
    description: en.meta.description,
    images: ["/og.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${inter.variable} ${sora.variable} ${tajawal.variable}`}
    >
      <body>
        <Providers>
          <Navbar />
          <main className="min-h-[60vh]">{children}</main>
          <FooterClient />
          <DemoBar />
        </Providers>
      </body>
    </html>
  );
}
