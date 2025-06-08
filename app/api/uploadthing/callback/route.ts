// app/api/uploadthing/callback/route.ts
import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "../core";

// Create the callback route handler
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: {
    callbackUrl: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/uploadthing/callback`,
  },
});