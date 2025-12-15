"use client";

import { createContext, useContext, ReactNode } from "react";
import { useGetMeQuery } from "@/src/redux/services/authApi";
import { UserResponseDto } from "@/src/types/user/user.dto";

interface AuthContextType {
  user: UserResponseDto | undefined;
  isLoading: boolean;
  error: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: user, isLoading, error } = useGetMeQuery();

  return (
    <AuthContext.Provider value={{ user, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}