import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/test(.*)', '/api/courses','/api/uploadthing(.*)', '/api/courses/(.*)/attachments(.*)', '/api/webhooks/midtrans',])

export default clerkMiddleware(async (auth, request) => {

  if (request.nextUrl.pathname === '/api/webhooks/midtrans') {
    return;
  }
  
  if (!isPublicRoute(request)) {
    await auth.protect()
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}