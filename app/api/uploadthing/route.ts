// app/api/uploadthing/route.ts
import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

// Create the route handler with proper callback configuration
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: {
    callbackUrl: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/uploadthing`,
    logLevel: "Info", // Add logging for debugging
  },
});