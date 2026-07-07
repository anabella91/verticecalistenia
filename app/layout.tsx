import type { Metadata } from "next";
import { Archivo_Black, Nunito_Sans } from "next/font/google";
import Header from "@/components/layout/Header";
import "./globals.css";

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Vértice | Clases de calistenia",
  description:
    "Clases de calistenia para ganar fuerza, movilidad y control con entrenamientos adaptados a tu nivel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${archivoBlack.variable} ${nunitoSans.variable}`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
