"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";

export default function DoctorRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/doctor/prescriptions");
  }, [router]);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <FaSpinner className="animate-spin text-blue-600" size={32} />
    </div>
  );
}