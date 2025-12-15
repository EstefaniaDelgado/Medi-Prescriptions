import { baseApi } from "./baseApi";
import { UserResponseDto } from "@/types/user/user.dto";
import { PrescriptionResponseDto } from "@/types/prescription/prescription.dto";
import { ApiResponse, PaginatedResponse } from "@/types/apiResponse";

interface SearchParams {
  query?: string;
  role?: string;
  status?: string;
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
}

const searchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    searchUsers: builder.query<PaginatedResponse<UserResponseDto>, SearchParams>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined) {
            searchParams.append(key, value.toString());
          }
        });
        return `/users/search?${searchParams.toString()}`;
      },
      transformResponse: (response: ApiResponse<PaginatedResponse<UserResponseDto>>) => response.data,
      providesTags: ["Users"],
    }),

    searchPrescriptions: builder.query<PaginatedResponse<PrescriptionResponseDto>, SearchParams>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined) {
            searchParams.append(key, value.toString());
          }
        });
        return `/prescriptions/search?${searchParams.toString()}`;
      },
      transformResponse: (response: ApiResponse<PaginatedResponse<PrescriptionResponseDto>>) => response.data,
      providesTags: ["Prescriptions"],
    }),

    getUsersByRole: builder.query<UserResponseDto[], string>({
      query: (role) => `/users/by-role/${role}`,
      transformResponse: (response: ApiResponse<UserResponseDto[]>) => response.data,
      providesTags: ["Users"],
    }),

    getPrescriptionsByStatus: builder.query<PrescriptionResponseDto[], string>({
      query: (status) => `/prescriptions/by-status/${status}`,
      transformResponse: (response: ApiResponse<PrescriptionResponseDto[]>) => response.data,
      providesTags: ["Prescriptions"],
    }),
  }),
});

export const {
  useSearchUsersQuery,
  useSearchPrescriptionsQuery,
  useGetUsersByRoleQuery,
  useGetPrescriptionsByStatusQuery,
} = searchApi;