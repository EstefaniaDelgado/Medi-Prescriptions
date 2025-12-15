// Export all API hooks
export * from "./authApi";
export * from "./usersApi";
export * from "./doctorApi";
export * from "./adminApi";
export * from "./searchApi";
export * from "./baseApi";

export {
  useGetPrescriptionsQuery,
  useGetPatientPrescriptionsQuery as useGetPatientPrescriptionsFromPrescriptionsQuery,
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
} from "./prescriptionsApi";

export {
  useGetPatientProfileQuery,
  useGetPatientPrescriptionsQuery,
  useUpdatePatientPrescriptionStatusMutation,
  useDownloadPatientPrescriptionMutation,
} from "./patientApi";