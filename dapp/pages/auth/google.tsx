"use client";

import DeformCanvas from "@/app/components/ui/HoverCanvas";
import SuiProvider from "@/lib/SuiProvider";
import { withGoogleCallback } from "@shinami/nextjs-zklogin/client";
import "./../../app/main.css";
import Loading from "@/app/components/Loading";

export default function GoogleCallback(props: any) {
  return (
    <SuiProvider>
      <div>
        <div className="background" />
        <DeformCanvas />
        {withGoogleCallback(({ status }) => {
          switch (status) {
            case "error":
              return (
                <div className="centered">
                  <p>Something went wrong. Please try again.</p>
                </div>
              );
            default:
              return <Loading />;
          }
        })(props)}
      </div>
    </SuiProvider>
  );
}
