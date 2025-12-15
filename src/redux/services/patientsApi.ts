import { ApiResponse } from "@/src/types/apiResponse";
import { baseApi } from "./baseApi";

export interface Patient {
  id: string;
  birthDate: string | null;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface PaginatedPatientsResponse {
  data: Patient[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface FilterPatientsDto {
  query?: string;
  page?: number;
  limit?: number;
}

const patientsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPatients: builder.query<PaginatedPatientsResponse, FilterPatientsDto | void>({
      query: (filters = {}) => ({
        url: "/patients",
        params: filters,
      }),
      transformResponse: (response: ApiResponse<PaginatedPatientsResponse>) =>
        response.data,
      providesTags: ["Patients"],
    }),
  }),
});

export const { useGetPatientsQuery } = patientsApi;