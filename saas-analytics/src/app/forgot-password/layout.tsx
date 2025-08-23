import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "../globals.css";
import "../theme.css";

const NunitoSans = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SaaS Analytics | Reset Password",
  description: "Open-source analytics platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        {children}
    </div>
  );
}
