import { baseApi } from "./baseApi";
import { patientEP } from "@/config/endpoints";
import { 
  PatientProfileDto, 
  PatientPrescriptionDto 
} from "@/types/patient/patient.dto";
import { 
  UpdatePrescriptionStatusDto,
  PrescriptionResponseDto 
} from "@/types/prescription/prescription.dto";
import { ApiResponse } from "@/types/apiResponse";

const patientApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPatientProfile: builder.query<PatientProfileDto, void>({
      query: () => patientEP.profile,
      transformResponse: (response: ApiResponse<PatientProfileDto>) => response.data,
      providesTags: ["Patient"],
    }),

    getPatientPrescriptions: builder.query<PatientPrescriptionDto[], void>({
      query: () => patientEP.prescriptions,
      transformResponse: (response: ApiResponse<PatientPrescriptionDto[]>) => response.data,
      providesTags: ["Prescriptions"],
    }),

    updatePatientPrescriptionStatus: builder.mutation<
      PrescriptionResponseDto,
      { id: string; data: UpdatePrescriptionStatusDto }
    >({
      query: ({ id, data }) => ({
        url: patientEP.updatePrescriptionStatus(id),
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response: ApiResponse<PrescriptionResponseDto>) => response.data,
      invalidatesTags: (result, error, { id }) => [
        { type: "Prescriptions", id },
        "Prescriptions",
      ],
    }),

    downloadPatientPrescription: builder.mutation<Blob, string>({
      query: (id) => ({
        url: patientEP.downloadPrescription(id),
        method: "GET",
        responseHandler: (response) => response.blob(),
      }),
    }),
  }),
});

export const {
  useGetPatientProfileQuery,
  useGetPatientPrescriptionsQuery,
  useUpdatePatientPrescriptionStatusMutation,
  useDownloadPatientPrescriptionMutation,
} = patientApi;