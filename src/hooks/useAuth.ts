import { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import {
  setUser,
  clearUser,
  setLoading,
  setError,
  clearError,
  setInitialized,
} from "@/src/redux/slices/authSlice";
import {
  useGetMeQuery,
  useLoginMutation,
  useLogoutMutation,
} from "@/src/redux/services/authApi";
import { LoginUserDto } from "@/src/types/user/user.dto";
import { useRouter } from "next/navigation";
import {
  getUserRoleFromToken,
  getAccessTokenFromCookies,
  isTokenExpired,
} from "@/src/utils/auth";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, isAuthenticated, isLoading, error, isInitialized } =
    useAppSelector((state) => state.auth);

  const {
    data: profileData,
    isLoading: profileLoading,
    error: profileError,
    refetch: refetchProfile,
  } = useGetMeQuery(undefined, {
    skip: true, // Deshabilitamos el query automático
  });
  const [login, { isLoading: loginLoading }] = useLoginMutation();
  const [logout] = useLogoutMutation();

  // Función para verificar autenticación
  const checkAuth = useCallback(async () => {
    try {
      const result = await refetchProfile();
      if (result.data) {
        dispatch(setUser(result.data));
      } else {
        dispatch(clearUser());
      }
    } catch (error) {
      dispatch(clearUser());
    }
  }, [refetchProfile, dispatch]);

  // Inicializar la aplicación
  useEffect(() => {
    const initializeAuth = async () => {
      await checkAuth();
      dispatch(setInitialized(true));
    };

    initializeAuth();
  }, [dispatch, checkAuth]);

  const handleLogin = useCallback(
    async (credentials: LoginUserDto) => {
      try {
        dispatch(setLoading(true));
        dispatch(clearError());
        const result = await login(credentials).unwrap();

        // Después del login exitoso, obtenemos los datos del usuario
        await checkAuth();

        return result;
      } catch (error: any) {
        const errorMessage = error?.data?.message || "Error al iniciar sesión";
        dispatch(setError(errorMessage));
        dispatch(setLoading(false));
        throw error;
      }
    },
    [dispatch, login]
  );

  const getRoleFromCookies = useCallback(() => {
    return getUserRoleFromToken();
  }, []);

  const hasValidToken = useCallback(() => {
    const token = getAccessTokenFromCookies();
    if (!token) return false;
    return !isTokenExpired(token);
  }, []);

  const redirectByRole = useCallback(
    (role?: string) => {
      const userRole = role || getRoleFromCookies();

      if (!userRole) {
        router.push("/login");
        return;
      }

      switch (userRole.toLowerCase()) {
        case "admin":
          router.push("/admin");
          break;
        case "doctor":
          router.push("/doctor/prescriptions");
          break;
        case "patient":
          router.push("/patient/prescriptions");
          break;
        default:
          router.push("/login");
      }
    },
    [router, getRoleFromCookies]
  );

  const handleLogout = useCallback(async () => {
    try {
      await logout().unwrap();
    } catch (error) {
      // Continuar con el logout local incluso si falla el servidor
      console.error("Error during logout:", error);
    } finally {
      dispatch(clearUser());
      router.push("/login");
    }
  }, [dispatch, logout, router]);

  return {
    user,
    isAuthenticated,
    isLoading: isLoading || loginLoading,
    error,
    isInitialized,
    login: handleLogin,
    logout: handleLogout,
    redirectByRole,
    checkAuth,
    getRoleFromCookies,
    hasValidToken,
    clearError: () => dispatch(clearError()),
  };
};
