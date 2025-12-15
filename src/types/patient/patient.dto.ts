export interface PatientProfileDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: string;
  address?: string;
  createdAt: string;
}

export interface PatientPrescriptionDto {
  id: string;
  doctorName: string;
  diagnosis: string;
  status: string;
  createdAt: string;
  itemsCount: number;
}