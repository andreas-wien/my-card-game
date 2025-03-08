export function middleware(req) {
  const { user } = req.nextauth;

  if (req.url.includes("/admin") && !user?.isAdmin) {
    return Response.redirect(new URL("/", req.url));
  }

  return Response.next();
}

export const config = {
  matcher: ["/admin/*"],
};
