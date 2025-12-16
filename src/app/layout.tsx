import type { Metadata } from "next";
import { Geist_Mono, Poppins, Playfair_Display } from "next/font/google";
import { ReduxProvider } from "@/src/redux/providers";
import { AuthProvider } from "@/src/contexts/AuthContext";
import ConditionalNavbar from "@/src/app/components/ConditionalNavbar";

import "./globals.css";
import { Toaster } from "react-hot-toast";

const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const poppinsSans = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Medi-Prescriptions",
  description: "Aplicación para gestionar prescripciones medicas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppinsSans.variable} ${geistMono.variable} ${playfairDisplay.variable} antialiased`}
      >
        <Toaster />
        <ReduxProvider>
          <AuthProvider>
            <ConditionalNavbar />
           {children}
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
