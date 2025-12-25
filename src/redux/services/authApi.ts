import { authEP } from "@/src/config/endpoints";
import { baseApi } from "./baseApi";
import {
  CreateUserDto,
  LoginUserDto,
  UserResponseDto,
  AuthResponse,
} from "@/src/types/user/user.dto";
import { ApiResponse } from "@/src/types/apiResponse";

interface RegisterResponse {
  message: string;
  user?: UserResponseDto;
}

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerPatient: builder.mutation<RegisterResponse, CreateUserDto>({
      query: (userData) => ({
        url: `${authEP.register}/patient`,
        method: "POST",
        body: userData,
      }),
      transformResponse: (response: ApiResponse<RegisterResponse>) =>
        response.data,
    }),

    registerDoctor: builder.mutation<RegisterResponse, CreateUserDto>({
      query: (userData) => ({
        url: `${authEP.register}/doctor`,
        method: "POST",
        body: userData,
      }),
      transformResponse: (response: ApiResponse<RegisterResponse>) =>
        response.data,
    }),

    login: builder.mutation<{ message: string }, LoginUserDto>({
      query: (credentials) => ({
        url: authEP.login,
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: ApiResponse<null>) => {
        // El backend devuelve { success: true, message: 'Successful login', data: null }
        // Los datos del usuario están en las cookies, no en la respuesta
        return { message: response.message };
      },
      invalidatesTags: ["Auth", "Users"],
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: authEP.logout,
        method: "POST",
      }),
      invalidatesTags: ["Auth", "Users"],
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          // Limpiar el caché de getMe después del logout exitoso
          dispatch(authApi.util.resetApiState());
        } catch {}
      },
    }),

    refreshToken: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: authEP.refreshToken,
        method: "POST",
      }),
      transformResponse: (response: ApiResponse<{ message: string }>) =>
        response.data,
      invalidatesTags: ["Auth"],
    }),

    getMe: builder.query<UserResponseDto, void>({
      query: () => authEP.getProfile,
      transformResponse: (response: ApiResponse<{ user: UserResponseDto }>) =>
        response.data.user,
      providesTags: ["Auth", "Users"],
    }),
  }),
});

export const {
  useRegisterPatientMutation,
  useRegisterDoctorMutation,
  useLoginMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useGetMeQuery,
  useLazyGetMeQuery,
} = authApi;
