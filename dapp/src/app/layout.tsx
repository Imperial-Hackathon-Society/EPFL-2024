import type { Metadata } from "next";
import "./main.css";
import "@mysten/dapp-kit/dist/index.css";
import SuiRegistry from "./components/SuiRegistry";
import localFont from 'next/font/local'

export const horizon = localFont({ src: './font/horizon.otf', variable: '--font-horizon', })

export const metadata: Metadata = {
  title: "Life Premium",
  description: "Life Premium",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={horizon.variable}>
        <SuiRegistry>{children}</SuiRegistry>
      </body>
    </html>
  );
}
