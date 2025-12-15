import { authEP } from "@/src/config/endpoints";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Función para refrescar token
const refreshToken = async (): Promise<boolean> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}${authEP.refreshToken}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.ok;
  } catch (_error) {
    return false;
  }
};

export const baseApi = createApi({
  baseQuery: async (args, api, extraOptions) => {
    const baseQuery = fetchBaseQuery({
      baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
      credentials: "include",
      mode: "cors",
    });

    let result = await baseQuery(args, api, extraOptions);

    // Si hay error 401, intentar refrescar token
    const error = result?.error;
    const status = error?.status as number | undefined;
    const message =
      (error?.data as { message?: string })?.message ?? "Error desconocido";

    if (status === 401 && message.includes("Token has expired")) {
      const refreshSuccess = await refreshToken();

      if (refreshSuccess) {
        result = await baseQuery(args, api, extraOptions);
      } else {
        // Solo redirigir si no estamos ya en login
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      }
    }

    return result;
  },
  tagTypes: [
    "Users",
    "Auth",
    "Prescriptions",
    "Admin",
    "Doctor",
    "Patient",
    "Patients",
    "Doctors",
    "Metrics",
  ],
  endpoints: () => ({}),
});
