// Auth endpoints
export const authEP = {
  login: "/auth/login",
  register: "/auth/register",
  logout: "/auth/logout",
  refreshToken: "/auth/refresh",
  getProfile: "/auth/profile",
};

// Users endpoints
export const usersEP = {
  users: "/users",
  userById: (id: string) => `/users/${id}`,
  updateUser: (id: string) => `/users/${id}`,
  deleteUser: (id: string) => `/users/${id}`,
};

// Prescriptions endpoints
export const prescriptionsEP = {
  prescriptions: "/prescriptions",
  prescriptionById: (id: string) => `/prescriptions/${id}`,
  createPrescription: "/prescriptions",
  updatePrescription: (id: string) => `/prescriptions/${id}`,
  deletePrescription: (id: string) => `/prescriptions/${id}`,
  downloadPdf: (id: string) => `/prescriptions/${id}/pdf`,
  updateStatus: (id: string) => `/prescriptions/${id}/status`,
  myPrescriptions: "/prescriptions/me/prescriptions",
  consumePrescription: (id: string) => `/prescriptions/${id}/consume`,
};

// Admin endpoints
export const adminEP = {
  metrics: "/admin/metrics",
  createUser: "/admin/users",
  assignRole: (userId: string) => `/admin/users/${userId}/role`,
  prescriptionsByStatus: "/admin/prescriptions/by-status",
  prescriptionsByDay: "/admin/prescriptions/by-day",
};

// Doctor endpoints
export const doctorEP = {
  profile: "/doctor/profile",
  prescriptions: "/doctor/prescriptions",
  createPrescription: "/doctor/prescriptions",
  patients: "/doctor/patients",
};

// Patient endpoints
export const patientEP = {
  profile: "/patient/profile",
  prescriptions: "/patient/prescriptions",
  updatePrescriptionStatus: (id: string) => `/patient/prescriptions/${id}/status`,
  downloadPrescription: (id: string) => `/patient/prescriptions/${id}/download`,
};