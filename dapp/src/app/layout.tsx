import type { Metadata } from "next";
import "@fontsource/inter";
import "@mysten/dapp-kit/dist/index.css";
import ThemeRegistry from "./components/ThemeRegistry";
import SuiRegistry from "./components/SuiRegistry";

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
      <body>
        <SuiRegistry>
          <ThemeRegistry options={{ key: "joy" }}>{children}</ThemeRegistry>
        </SuiRegistry>
      </body>
    </html>
  );
}
