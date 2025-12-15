export interface AdminMetricsDto {
  totalPatients: number;
  totalDoctors: number;
  totalPrescriptions: number;
  prescriptionsByStatus: PrescriptionStatusMetric[];
  prescriptionsByDay: PrescriptionDayMetric[];
}

export interface PrescriptionStatusMetric {
  status: string;
  count: number;
}

export interface PrescriptionDayMetric {
  date: string;
  count: number;
}

export interface CreateUserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phone?: string;
  specialization?: string;
  licenseNumber?: string;
  dateOfBirth?: string;
  address?: string;
}

export interface AssignRoleDto {
  role: UserRole;
}

export enum UserRole {
  ADMIN = "admin",
  DOCTOR = "doctor",
  PATIENT = "patient",
}