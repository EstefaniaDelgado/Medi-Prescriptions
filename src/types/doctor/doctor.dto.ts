export interface DoctorProfileDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  specialization?: string;
  licenseNumber?: string;
  phone?: string;
  createdAt: string;
}

export interface PatientSearchDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface DoctorPrescriptionDto {
  id: string;
  patientName: string;
  patientEmail: string;
  diagnosis: string;
  status: string;
  createdAt: string;
  itemsCount: number;
}