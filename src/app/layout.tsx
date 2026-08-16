import type { Metadata } from "next";
import { Outfit, Cairo } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { FaGraduationCap } from "react-icons/fa6";

import { supabase } from "@/lib/supabase";
import FloatingContact from "@/components/FloatingContact";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });
const cairo = Cairo({ subsets: ["arabic"], weight: ["400", "600", "700"], variable: "--font-cairo" });

export const metadata: Metadata = {
  title: "Kalimat - Vocabulary Prep",
  description: "Master your English vocabulary",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch contact settings from Supabase
  const { data: settings } = await supabase.from("settings").select("key, value");
  const settingsMap = settings?.reduce((acc: any, setting: any) => {
    acc[setting.key] = setting.value;
    return acc;
  }, {}) || {};

  return (
    <html lang="en">
      <body className={`${outfit.className} ${cairo.variable}`}>
        <div className="background-globes">
          <div className="globe globe-1"></div>
          <div className="globe globe-2"></div>
        </div>

        <header>
          <div className="container header-content">
            <h1>Kalimat</h1>
            <p>Master your vocabulary for all grades</p>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <Link href="/" className="primary-btn">
                <FaGraduationCap />
                <span>All Grades</span>
              </Link>
            </div>
          </div>
        </header>

        {children}

        <FloatingContact 
          phone={settingsMap.contact_phone}
          telegram={settingsMap.contact_telegram}
          whatsapp={settingsMap.contact_whatsapp}
          facebook={settingsMap.contact_facebook}
        />
      </body>
    </html>
  );
}
