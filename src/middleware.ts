// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const path = request.nextUrl.pathname;
//   const isPublicPath =  path === "/login-homepage" || path === "/";
//   const token = request.cookies.get("token")?.value || "";
//   const userType = request.cookies.get("userType")?.value; // "user" or "vendor"

//   if (isPublicPath && token) {
//     if (userType === "vendor") {
//       return NextResponse.redirect(new URL("/vendor-profile/dashboard", request.nextUrl));
//     }
//     if(userType === "user") {
//       return NextResponse.redirect(new URL("/UserHomePage/Home", request.nextUrl));
//     }
//   }

//   if (!isPublicPath && !token) {
//     return NextResponse.redirect(new URL("/login-homepage", request.nextUrl));
//   }
// }

// export const config = {
//   matcher: [
//     "/",
//     "/login-homepage",
//     "/UserHomePage/Home",
//     "/UserHomePage/:path*",
//     "/vendor-profile/:path*",
//   ],
// };
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("Middleware running on:", request.nextUrl.pathname); // Debugging

  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/" || path === "/login-homepage"; // Allow "/" before login

  const token = request.cookies.get("token")?.value || "";
  const userType = request.cookies.get("userType")?.value; // "user" or "vendor"

  // Redirect logged-in users to their respective dashboards
  if (isPublicPath && token) {
    if (userType === "vendor") {
      return NextResponse.redirect(new URL("/vendor-profile/dashboard", request.nextUrl));
    } else {
      return NextResponse.redirect(new URL("/user-profile", request.nextUrl));
    }
  }

  // Restrict vendors from accessing user routes
  if (userType === "vendor" && path.startsWith("/user-profile")) {
    return NextResponse.redirect(new URL("/vendor-profile/dashboard", request.nextUrl));
  }

  // Restrict users from accessing vendor routes
  if (userType === "user" && path.startsWith("/vendor-profile")) {
    return NextResponse.redirect(new URL("/user-profile", request.nextUrl));
  }

  // Redirect to login-homepage if trying to access protected routes without a token
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login-homepage", request.nextUrl));
  }

  return NextResponse.next(); // Allow request to continue if authenticated
}

export const config = {
  matcher: [
    "/",
    "/login-homepage",
    "/user-profile",
    "/user-profile/:path*",
    "/vendor-profile/:path*",
  ],
};
