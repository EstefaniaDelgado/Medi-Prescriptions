"use client";
import { useAuthContext } from "@/src/contexts/AuthContext";
import { FaUser, FaSpinner } from "react-icons/fa";

export default function PatientLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { user, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <FaSpinner className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center">
      <div className="bg-white dark:bg-background-secondary mx-auto my-4 lg:my-4 lg:px-4 rounded-xl w-11/12 max-w-6xl px-3">
        <div className="flex items-center justify-between py-6">
          <div className="flex items-center gap-3">
            <div className="w-20 h-16 md:w-24 md:h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
              <FaUser className="text-gray-500 dark:text-gray-400" size={32} />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-extrabold text-dark-blue dark:text-blue">
                {user?.name || "Usuario"}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {user?.email}
                </span>
              </div>
            </div>
          </div>
          <h4 className="text-base text-end text-dark-blue dark:text-white font-semibold"></h4>
        </div>
      </div>
      {children}
    </div>
  );
}
