import type { Metadata } from "next";
import "./main.css";
import "@mysten/dapp-kit/dist/index.css";
import localFont from "next/font/local";
import SuiProvider from "../lib/SuiProvider";

export const horizon = localFont({
  src: "./font/horizon.otf",
  variable: "--font-horizon",
});

export const metadata: Metadata = {
  title: "Health 3",
  description: "Health 3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={horizon.variable}>
        <SuiProvider>{children}</SuiProvider>
      </body>
    </html>
  );
}
