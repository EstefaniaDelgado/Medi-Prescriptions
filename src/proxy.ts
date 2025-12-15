import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

function decodeJWT(token: string) {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

function getRoleRoute(role: string): string {
  switch (role.toLowerCase()) {
    case "admin":
      return "/admin";
    case "doctor":
      return "/doctor";
    case "patient":
      return "/patient";
    default:
      return "/login";
  }
}

// Función helper para verificar si el usuario tiene acceso a la ruta
function hasRouteAccess(pathname: string, userRole: string): boolean {
  const role = userRole.toLowerCase();

  if (pathname.startsWith("/admin")) return role === "admin";
  if (pathname.startsWith("/doctor")) return role === "doctor";
  if (pathname.startsWith("/patient")) return role === "patient";

  return true;
}

export async function proxy(req: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const { pathname } = req.nextUrl;

  // Rutas públicas que no requieren autenticación
  const publicRoutes = ["/", "/login"];
  const isPublicRoute = publicRoutes.includes(pathname);

  // Decodificar token si existe
  const payload = accessToken ? decodeJWT(accessToken) : null;
  const userRole = payload?.role;

  if (pathname === "/login" && accessToken && userRole) {
    const roleRoute = getRoleRoute(userRole);
    return NextResponse.redirect(new URL(roleRoute, req.url));
  }

  if (isPublicRoute) {
    return NextResponse.next();
  }

  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (accessToken && !userRole) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (userRole && !hasRouteAccess(pathname, userRole)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/doctor/:path*", "/patient/:path*", "/admin/:path*"],
};
