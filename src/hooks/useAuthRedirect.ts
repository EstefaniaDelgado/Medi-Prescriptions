import { useEffect } from "react";
import { useAuth } from "./useAuth";

/**
 * Hook para manejar redirecciones automáticas basadas en autenticación
 * Útil para páginas que requieren autenticación específica
 */
export const useAuthRedirect = (options?: {
  requireAuth?: boolean;
  allowedRoles?: string[];
  redirectTo?: string;
}) => {
  const { hasValidToken, getRoleFromCookies, redirectByRole } = useAuth();

  useEffect(() => {
    const { requireAuth = true, allowedRoles = [], redirectTo } = options || {};

    // Si no requiere autenticación, no hacer nada
    if (!requireAuth) return;

    // Verificar si hay token válido
    if (!hasValidToken()) {
      // Si no hay token válido, redirigir al login
      if (redirectTo) {
        window.location.href = redirectTo;
      } else {
        redirectByRole(); // Esto redirigirá al login por defecto
      }
      return;
    }

    // Si hay roles permitidos específicos, verificar
    if (allowedRoles.length > 0) {
      const userRole = getRoleFromCookies();
      if (!userRole || !allowedRoles.includes(userRole.toLowerCase())) {
        // Usuario no tiene el rol correcto, redirigir según su rol actual
        redirectByRole();
        return;
      }
    }
  }, [hasValidToken, getRoleFromCookies, redirectByRole, options]);

  return {
    hasValidToken: hasValidToken(),
    userRole: getRoleFromCookies(),
  };
};
