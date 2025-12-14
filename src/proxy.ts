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

export async function proxy(req: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const { pathname } = req.nextUrl;

  // Rutas públicas permitidas
  const publicRoutes = ["/login", "/"];
  const isPublic = publicRoutes.includes(pathname);

  // Si es ruta pública, permitir acceso
  if (isPublic) {
    return NextResponse.next();
  }

  // Si no hay ningún token (ni access ni refresh), redirigir al login
  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Decodificar token para obtener roles (solo si existe accessToken)
  if (accessToken) {
    // const payload = decodeJWT(accessToken);
    // if (payload?.role) {
    //   // Ejemplo: Control de acceso por roles
    //   if (pathname.startsWith("/admin") && payload.role !== "ADMIN") {
    //     return NextResponse.redirect(new URL("/", req.url));
    //   }
    //   if (pathname.startsWith("/doctor") && payload.role !== "DOCTOR") {
    //     return NextResponse.redirect(new URL("/", req.url));
    //   }
    // }
  }

  // Si hay al menos uno de los tokens, permitir acceso
  return NextResponse.next();
}

export const config = {
  // matcher: ["/doctor/:path*", "/patient/:path*", "/admin/:path*"],
  matcher: [],
};
