// app/api/auth/[auth0]/route.js
import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

export const GET = handleAuth({
  login: handleLogin({
    authorizationParams: {
      audience: process.env.NEXT_PUBLIC_API_URL, // or AUTH0_AUDIENCE
      // Add the `offline_access` scope to also get a Refresh Token
      scope: "openid profile email read:products offline_access", // or AUTH0_SCOPE,
    },
    returnTo: "/dashboard/sites",
  }),
});
