import { withAuth } from "next-auth/middleware";

export function middleware(req) {
  const { user } = req.nextauth;
  
  // Protect the admin route
  if (req.url.includes("/admin") && !user?.isAdmin) {
    return Response.redirect(new URL("/", req.url)); // Redirect non-admin users to home page
  }

  return Response.next();
}

export const config = {
  matcher: ["/admin/*"], // Protect the `/admin` route
};
