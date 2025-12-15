export interface PrescriptionItem {
  id?: string;
  name: string;
  dosage: string;
  quantity: number;
  instructions?: string;
}

export interface CreatePrescriptionDto {
  patientId: string;
  items: {
    name: string;
    dosage?: string;
    quantity?: number;
    instructions?: string;
  }[];
  notes?: string;
}

export interface UpdatePrescriptionDto {
  items?: PrescriptionItem[];
  notes?: string;
  status?: PrescriptionStatus;
}

export interface PrescriptionResponseDto {
  id: string;
  code: string;
  patientId: string;
  authorId: string;
  items: PrescriptionItem[];
  notes?: string;
  status: PrescriptionStatus;
  createdAt: string;
  consumedAt?: string;
  deletedAt?: string;
  patient: {
    id: string;
    userId: string;
    birthDate?: string;
    deletedAt?: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  };
  author: {
    id: string;
    userId: string;
    specialty?: string;
    deletedAt?: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  };
}

export enum PrescriptionStatus {
  PENDING = "pending",
  CONSUMED = "consumed",
}

export interface UpdatePrescriptionStatusDto {
  status: PrescriptionStatus;
}

export interface FilterPrescriptionsDto {
  mine?: boolean;
  status?: PrescriptionStatus;
  from?: string;
  to?: string;
  page?: number;
  limit?: number;
  order?: 'asc' | 'desc';
}

export interface PaginatedPrescriptionsResponse {
  data: PrescriptionResponseDto[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}