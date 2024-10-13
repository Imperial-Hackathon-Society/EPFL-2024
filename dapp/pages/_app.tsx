import React from "react";
import SuiProvider from "../lib/SuiProvider";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SuiProvider>
      <Component {...pageProps} />
    </SuiProvider>
  );
}

export default MyApp;
