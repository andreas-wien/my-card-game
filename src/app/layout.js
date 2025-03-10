import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LoginButton from "@/components/LoginButton";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "My card game",
  description: "A virtual card collection game",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProviderWrapper>
          <LoginButton />
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
