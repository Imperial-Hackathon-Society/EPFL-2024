"use client";

import SuiProvider from "@/lib/SuiProvider";
import { withGoogleCallback } from "@shinami/nextjs-zklogin/client";

export default function GoogleCallback(props: any) {
  return (
    <SuiProvider>
      {withGoogleCallback(({ status }) => {
        switch (status) {
          case "loggingIn":
            return <p>Chugging along...</p>;
          case "error":
            return <p>Something went wrong</p>;
          default:
            return <p>Google callback</p>;
        }
      })(props)}
    </SuiProvider>
  );
}
