"use client";

import Image from "next/image";
import { useAuthContext } from "@/src/contexts/AuthContext";
import { FaSpinner } from "react-icons/fa";
import { useDateTime } from "@/src/hooks/useDateTime";

export default function DoctorLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { user, isLoading } = useAuthContext();
  const dateTime = useDateTime();

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <FaSpinner className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  return (
    <div className="mt-24 lx:mt-0 flex flex-col">
      <div className="bg-light-blue dark:bg-background-secondary mx-auto my-4 lg:my-4 lg:px-4 rounded-xl w-11/12 max-w-6xl  px-3">
        <div className="flex items-center justify-between py-6">
          <div className="flex items-center gap-3 ">
            <div className="w-20 h-16 md:w-24 md:h-24 rounded-full overflow-hidden bg-gray-200">
              <Image
                src="/doctor1.svg"
                alt="Doctor"
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl md:text-3xl font-extrabold text-dark-blue dark:text-blue">
                Hola, Dr. {user?.name || "Doctor"}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {user?.email}
              </p>
            </div>
          </div>
          <h4 className="text-base text-end text-dark-blue dark:text-white font-semibold">
            {dateTime}
          </h4>
        </div>
      </div>
      {children}
    </div>
  );
}
