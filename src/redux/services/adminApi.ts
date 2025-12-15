import { baseApi } from "./baseApi";
import { adminEP } from "@/config/endpoints";
import { 
  AdminMetricsDto, 
  CreateUserDto, 
  AssignRoleDto 
} from "@/types/admin/admin.dto";
import { UserResponseDto } from "@/types/user/user.dto";
import { ApiResponse } from "@/types/apiResponse";

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