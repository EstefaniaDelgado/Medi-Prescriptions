import { DoctorPrescriptionDto, DoctorProfileDto, PatientSearchDto } from "@/src/types/doctor/doctor.dto";
import { baseApi } from "./baseApi";
import { doctorEP } from "@/src/config/endpoints";
import { ApiResponse } from "@/src/types/apiResponse";
import { CreatePrescriptionDto, PrescriptionResponseDto } from "@/src/types/prescription/prescription.dto";


const doctorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDoctorProfile: builder.query<DoctorProfileDto, void>({
      query: () => doctorEP.profile,
      transformResponse: (response: ApiResponse<DoctorProfileDto>) => response.data,
      providesTags: ["Doctor"],
    }),

    getDoctorPrescriptions: builder.query<DoctorPrescriptionDto[], void>({
      query: () => doctorEP.prescriptions,
      transformResponse: (response: ApiResponse<DoctorPrescriptionDto[]>) => response.data,
      providesTags: ["Prescriptions"],
    }),

    createDoctorPrescription: builder.mutation<PrescriptionResponseDto, CreatePrescriptionDto>({
      query: (data) => ({
        url: doctorEP.createPrescription,
        method: "POST",
        body: data,
      }),
      transformResponse: (response: ApiResponse<PrescriptionResponseDto>) => response.data,
      invalidatesTags: ["Prescriptions"],
    }),

    searchPatients: builder.query<PatientSearchDto[], string>({
      query: (searchTerm) => `${doctorEP.patients}?search=${searchTerm}`,
      transformResponse: (response: ApiResponse<PatientSearchDto[]>) => response.data,
      providesTags: ["Patients"],
    }),
  }),
});

export const {
  useGetDoctorProfileQuery,
  useGetDoctorPrescriptionsQuery,
  useCreateDoctorPrescriptionMutation,
  useSearchPatientsQuery,
} = doctorApi;