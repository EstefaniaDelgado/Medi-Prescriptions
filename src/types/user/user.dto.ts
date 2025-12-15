export interface LoginUserDto {
  email: string;
  password: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export interface RegisterUserDto extends CreateUserDto {
  confirmPassword: string;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  role?: 'patient' | 'doctor' | 'admin';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor' | 'admin';
  createdAt: string;
}

export interface UserResponseDto {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor' | 'admin';
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  message: string;
  accessToken?: string;
}