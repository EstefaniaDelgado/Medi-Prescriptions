import { NextRequest, NextResponse } from "next/server";

/**
 * Decodifica un token JWT
 */
function decodeJWT(token: string): { role?: string } | null {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

/**
 * Obtiene la ruta de redirección basada en el rol del usuario
 */
function getRoleRoute(role: string): string {
  switch (role.toLowerCase()) {
    case "admin":
      return "/admin";
    case "doctor":
      return "/doctor/prescriptions";
    case "patient":
      return "/patient/prescriptions";
    default:
      return "/login";
  }
}

/**
 * Verifica si el usuario tiene acceso a la ruta solicitada
 */
function hasRouteAccess(pathname: string, userRole: string): boolean {
  const role = userRole.toLowerCase();

  if (pathname.startsWith("/admin")) return role === "admin";
  if (pathname.startsWith("/doctor")) return role === "doctor";
  if (pathname.startsWith("/patient")) return role === "patient";

  return true;
}

/**
 * Middleware de autenticación y autorización
 */
export async function proxy(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const { pathname } = req.nextUrl;

  // Rutas públicas que no requieren autenticación
  const publicRoutes = ["/", "/login"];
  const isPublicRoute = publicRoutes.includes(pathname);

  // Si es ruta pública, permitir acceso
  if (isPublicRoute) {
    // Si está autenticado y trata de acceder a login, redirigir según rol
    if (pathname === "/login" && accessToken) {
      const payload = decodeJWT(accessToken);
      if (payload?.role) {
        return NextResponse.redirect(
          new URL(getRoleRoute(payload.role), req.url)
        );
      }
    }
    return NextResponse.next();
  }

  // Para rutas protegidas, verificar autenticación
  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Verificar que el token sea válido y tenga rol
  const payload = accessToken ? decodeJWT(accessToken) : null;
  const userRole = payload?.role;

  if (!userRole) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Verificar autorización: el usuario tiene acceso a esta ruta?
  if (!hasRouteAccess(pathname, userRole)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/doctor/:path*", "/patient/:path*", "/admin/:path*"],
};
