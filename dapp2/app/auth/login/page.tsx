"use client";

import { sui } from "@/lib/hooks/sui";
import {
  GOOGLE_CLIENT_ID,
} from "@/lib/shared/openid";
import { first } from "@/lib/shared/utils";
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
    const redirectTo = first(searchParams!.get("redirectTo"));

    // Render sign-in options based on what's configured.
    return (
      <>
        {GOOGLE_CLIENT_ID && (
          <div>
            <button
              onClick={() => {
                void router.replace(
                  getGoogleAuthUrl(
                    session,
                    GOOGLE_CLIENT_ID!,
                    "google", // Update if moved to another path
                    redirectTo!,
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
