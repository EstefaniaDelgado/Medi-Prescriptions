/**
 * Utilidades para manejo de autenticación
 */

export interface DecodedToken {
  role: string;
  email: string;
  sub: string;
  exp: number;
  iat: number;
}

/**
 * Decodifica un JWT token
 */
export function decodeJWT(token: string): DecodedToken | null {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

/**
 * Obtiene el token de acceso desde las cookies del navegador
 */
export function getAccessTokenFromCookies(): string | null {
  if (typeof document === "undefined") return null;

  const accessToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("accessToken="))
    ?.split("=")[1];

  return accessToken || null;
}

/**
 * Obtiene el rol del usuario desde el token en cookies
 */
export function getUserRoleFromToken(): string | null {
  const token = getAccessTokenFromCookies();
  if (!token) return null;

  const decoded = decodeJWT(token);
  return decoded?.role || null;
}

/**
 * Verifica si el token ha expirado
 */
export function isTokenExpired(token: string): boolean {
  const decoded = decodeJWT(token);
  if (!decoded) return true;

  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp < currentTime;
}
