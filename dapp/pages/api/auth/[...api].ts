import { sui, zkp, zkw } from "@/lib/api/shinami";
import {
  APPLE_CLIENT_ID,
  FACEBOOK_CLIENT_ID,
  GOOGLE_CLIENT_ID,
  TWITCH_CLIENT_ID,
} from "@/lib/shared/openid";
import { authHandler } from "@shinami/nextjs-zklogin/server/pages";

export default authHandler(
  sui, // Alternatively, you can use mystenSui
  zkw, // Alternatively, you can use mystenSaltProvider
  zkp, // Alternatively, you can use mystenProver
  {
    google: GOOGLE_CLIENT_ID ? [GOOGLE_CLIENT_ID] : undefined,
    facebook: FACEBOOK_CLIENT_ID ? [FACEBOOK_CLIENT_ID] : undefined,
    twitch: TWITCH_CLIENT_ID ? [TWITCH_CLIENT_ID] : undefined,
    apple: APPLE_CLIENT_ID ? [APPLE_CLIENT_ID] : undefined,
  }
);
