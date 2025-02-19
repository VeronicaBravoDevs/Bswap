import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/features/ui/header/header";
import Footer from "@/features/ui/footer/Footer";
import { Roboto, Roboto_Serif } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  weight: ['400', '500', '700', '900' ],
  subsets: ['latin'],
  variable: '--font-roboto'
} );

const robotoSerif = Roboto_Serif({
  weight: ['400', '500', '700', '900' ],
  subsets: ['latin'],
  variable: '--font-roboto-serif'
} );

export const metadata: Metadata = {
  title: "Bswap",
  description: "Bswap es una aplicación web para intercambios de libros.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${roboto.variable} ${robotoSerif.variable}`}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased container mx-auto`}>
        <Header />
        <main>{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
