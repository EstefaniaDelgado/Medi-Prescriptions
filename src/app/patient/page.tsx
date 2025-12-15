"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";

export default function PatientRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/patient/prescriptions");
  }, [router]);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <FaSpinner className="animate-spin text-blue-600" size={32} />
    </div>
  );
}