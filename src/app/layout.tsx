import * as React from "react";
import { Metadata } from "next";
// Css
import "../styles/globals.css";
import ThemeRegistry from "@/styles/ThemeRegistry/ThemeRegistry";
import { Radio_Canada } from "next/font/google";

const radioCanada = Radio_Canada({
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: {
    default: "Fichas Médicas",
    template: `%s | Fichas Médicas`,
  },
  description:
    "Aqui você pode cadastrar e consultar as fichas médicas dos seus pacientes.",
  colorScheme: "light",
  viewport: "width=device-width, initial-scale=1",
  referrer: "origin-when-cross-origin",
  generator: "Next.js",
  robots: {
    index: process.env.NEXT_PUBLIC_ENVIRONMENT === "DEV" ? false : true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={radioCanada.className}>
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
