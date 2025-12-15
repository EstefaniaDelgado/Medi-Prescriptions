import { baseApi } from "./baseApi";
import { usersEP } from "@/config/endpoints";
import { UpdateUserDto, UserResponseDto } from "@/types/user/user.dto";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UserResponseDto[], void>({
      query: () => usersEP.users,
      providesTags: ["Users"],
    }),

    getUserById: builder.query<UserResponseDto, string>({
      query: (id) => usersEP.userById(id),
      providesTags: (result, error, id) => [{ type: "Users", id }],
    }),

    updateUser: builder.mutation<
      UserResponseDto,
      { id: string; data: UpdateUserDto }
    >({
      query: ({ id, data }) => ({
        url: usersEP.updateUser(id),
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Users", id },
        "Users",
      ],
    }),

    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: usersEP.deleteUser(id),
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
