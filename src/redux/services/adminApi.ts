import { adminEP } from "@/src/config/endpoints";
import { baseApi } from "./baseApi";

import { AdminMetricsDto, AssignRoleDto } from "@/src/types/admin/admin.dto";
import { ApiResponse } from "@/src/types/apiResponse";
import { CreateUserDto, UserResponseDto } from "@/src/types/user/user.dto";




const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminMetrics: builder.query<AdminMetricsDto, void>({
      query: () => adminEP.metrics,
      transformResponse: (response: ApiResponse<AdminMetricsDto>) => response.data,
      providesTags: ["Admin"],
    }),

    createUserByAdmin: builder.mutation<UserResponseDto, CreateUserDto>({
      query: (userData) => ({
        url: adminEP.createUser,
        method: "POST",
        body: userData,
      }),
      transformResponse: (response: ApiResponse<UserResponseDto>) => response.data,
      invalidatesTags: ["Users", "Admin"],
    }),

    assignUserRole: builder.mutation<
      UserResponseDto,
      { userId: string; data: AssignRoleDto }
    >({
      query: ({ userId, data }) => ({
        url: adminEP.assignRole(userId),
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response: ApiResponse<UserResponseDto>) => response.data,
      invalidatesTags: (result, error, { userId }) => [
        { type: "Users", id: userId },
        "Users",
        "Admin",
      ],
    }),
  }),
});

export const {
  useGetAdminMetricsQuery,
  useCreateUserByAdminMutation,
  useAssignUserRoleMutation,
} = adminApi;