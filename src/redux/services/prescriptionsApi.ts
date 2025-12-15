import { ApiResponse } from "@/src/types/apiResponse";
import { baseApi } from "./baseApi";
import {
  CreatePrescriptionDto,
  PrescriptionResponseDto,
  UpdatePrescriptionDto,
  UpdatePrescriptionStatusDto,
  FilterPrescriptionsDto,
  PaginatedPrescriptionsResponse,
} from "@/src/types/prescription/prescription.dto";
import { prescriptionsEP } from "@/src/config/endpoints";

const prescriptionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPrescriptions: builder.query<
      PaginatedPrescriptionsResponse,
      FilterPrescriptionsDto | void
    >({
      query: (filters = {}) => ({
        url: prescriptionsEP.prescriptions,
        params: filters,
      }),
      transformResponse: (
        response: ApiResponse<PaginatedPrescriptionsResponse>
      ) => response.data,
      providesTags: ["Prescriptions"],
    }),

    getPatientPrescriptions: builder.query<
      PaginatedPrescriptionsResponse,
      FilterPrescriptionsDto | void
    >({
      query: (filters = {}) => ({
        url: prescriptionsEP.myPrescriptions,
        params: filters,
      }),
      transformResponse: (
        response: ApiResponse<PaginatedPrescriptionsResponse>
      ) => response.data,
      providesTags: ["Prescriptions"],
    }),

    getDoctorPrescriptions: builder.query<
      PaginatedPrescriptionsResponse,
      FilterPrescriptionsDto | void
    >({
      query: (filters = {}) => ({
        url: prescriptionsEP.prescriptions,
        params: { ...filters, mine: true },
      }),
      transformResponse: (
        response: ApiResponse<PaginatedPrescriptionsResponse>
      ) => response.data,
      providesTags: ["Prescriptions"],
    }),

    getPrescriptionById: builder.query<PrescriptionResponseDto, string>({
      query: (id) => prescriptionsEP.prescriptionById(id),
      transformResponse: (response: ApiResponse<PrescriptionResponseDto>) =>
        response.data,
      providesTags: (result, error, id) => [{ type: "Prescriptions", id }],
    }),

    createPrescription: builder.mutation<
      PrescriptionResponseDto,
      CreatePrescriptionDto
    >({
      query: (data) => ({
        url: prescriptionsEP.createPrescription,
        method: "POST",
        body: data,
      }),
      transformResponse: (response: ApiResponse<PrescriptionResponseDto>) =>
        response.data,
      invalidatesTags: ["Prescriptions"],
    }),

    updatePrescription: builder.mutation<
      PrescriptionResponseDto,
      { id: string; data: UpdatePrescriptionDto }
    >({
      query: ({ id, data }) => ({
        url: prescriptionsEP.updatePrescription(id),
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response: ApiResponse<PrescriptionResponseDto>) =>
        response.data,
      invalidatesTags: (result, error, { id }) => [
        { type: "Prescriptions", id },
        "Prescriptions",
      ],
    }),

    updatePrescriptionStatus: builder.mutation<
      PrescriptionResponseDto,
      { id: string; data: UpdatePrescriptionStatusDto }
    >({
      query: ({ id, data }) => ({
        url: prescriptionsEP.updateStatus(id),
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response: ApiResponse<PrescriptionResponseDto>) =>
        response.data,
      invalidatesTags: (result, error, { id }) => [
        { type: "Prescriptions", id },
        "Prescriptions",
      ],
    }),

    downloadPrescriptionPdf: builder.mutation<Blob, string>({
      query: (id) => ({
        url: prescriptionsEP.downloadPdf(id),
        method: "GET",
        responseHandler: (response: Response) => response.blob(),
      }),
      transformResponse: (response: Blob) => response,
    }),

    downloadPatientPrescriptionPdf: builder.mutation<Blob, string>({
      query: (id) => ({
        url: `/prescriptions/${id}/pdf`,
        method: "GET",
        responseHandler: (response: Response) => response.blob(),
      }),
      transformResponse: (response: Blob) => response,
    }),

    deletePrescription: builder.mutation<void, string>({
      query: (id) => ({
        url: prescriptionsEP.deletePrescription(id),
        method: "DELETE",
      }),
      invalidatesTags: ["Prescriptions"],
    }),

    consumePrescription: builder.mutation<PrescriptionResponseDto, string>({
      query: (id) => ({
        url: prescriptionsEP.consumePrescription(id),
        method: "PUT",
      }),
      transformResponse: (response: ApiResponse<PrescriptionResponseDto>) =>
        response.data,
      invalidatesTags: ["Prescriptions"],
    }),

    getMetrics: builder.query<any, { from?: string; to?: string } | void>({
      query: (filters = {}) => ({
        url: "/prescriptions/admin/metrics",
        params: filters,
      }),
      transformResponse: (response: ApiResponse<any>) => response.data,
      providesTags: ["Metrics"],
    }),
  }),
});

export const {
  useGetPrescriptionsQuery,
  useGetPatientPrescriptionsQuery,
  useGetDoctorPrescriptionsQuery,
  useGetPrescriptionByIdQuery,
  useCreatePrescriptionMutation,
  useUpdatePrescriptionMutation,
  useUpdatePrescriptionStatusMutation,
  useDownloadPrescriptionPdfMutation,
  useDownloadPatientPrescriptionPdfMutation,
  useDeletePrescriptionMutation,
  useConsumePrescriptionMutation,
  useGetMetricsQuery,
} = prescriptionsApi;
