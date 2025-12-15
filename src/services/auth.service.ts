// Utilidades de autenticación para trabajar con localStorage
// Nota: RTK Query maneja las llamadas HTTP, este servicio solo maneja el almacenamiento local

import { User } from '@/src/types/user/user.dto';

class AuthService {
  // Limpiar datos de autenticación del localStorage
  clearAuthData(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }

  // Obtener token del localStorage
  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  // Obtener usuario del localStorage
  getUser(): any {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  // Establecer datos de autenticación en localStorage
  setAuthData(token: string, user: any): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  // Verificar si hay datos de autenticación
  hasAuthData(): boolean {
    return !!this.getToken() && !!this.getUser();
  }
}

export const authService = new AuthService();