"use client";

import {
  getGoogleAuthUrl,
  relativeToCurrentEpoch,
  withNewZkLoginSession,
} from "@shinami/nextjs-zklogin/client";
import { useRouter, useSearchParams } from "next/navigation";

// This page should be installed at path "/auth/login".
// If you move it to a different path, remember to update env NEXT_PUBLIC_LOGIN_PAGE_PATH.
export default withNewZkLoginSession(
  () => relativeToCurrentEpoch(sui),
  ({ session }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = first(searchParams.get("redirectTo"));

    return (
      <>
        {process.env["GOOGLE_CLIENT"] && (
          <div>
            <button
              onClick={() => {
                void router.replace(
                  getGoogleAuthUrl(
                    session,
                    process.env["GOOGLE_CLIENT"]!,
                    "google",
                    redirectTo,
                  ).toString(),
                );
              }}
            >
              Sign in with Google
            </button>
          </div>
        )}
      </>
    );
  },
);