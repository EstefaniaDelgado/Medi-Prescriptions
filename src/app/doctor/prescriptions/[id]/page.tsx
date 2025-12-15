"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  FaArrowLeft,
  FaUser,
  FaPills,
  FaCalendarAlt,
  FaClock,
  FaCertificate,
} from "react-icons/fa";
import { useGetPrescriptionByIdQuery } from "@/src/redux/services/prescriptionsApi";
import { useDateFormat } from "@/src/hooks/useDateFormat";

export default function DetallePrescripcion() {
  const params = useParams();
  const router = useRouter();
  const prescripcionId = params.id as string;
  const [itemSeleccionado, setItemSeleccionado] = useState(0);
  const { formatDate, formatTime, isClient } = useDateFormat();

  const {
    data: prescripcion,
    isLoading,
    error,
  } = useGetPrescriptionByIdQuery(prescripcionId);

  if (isLoading) {
    return (
      <div className="card-container p-6 max-w-2xl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Cargando prescripción...
          </p>
        </div>
      </div>
    );
  }

  if (error || !prescripcion) {
    return (
      <div className="card-container p-6 max-w-2xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Prescripción no encontrada
          </h1>
          <button
            onClick={() => router.back()}
            className="btn-primary px-4 py-2"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "consumed":
        return "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200";
      case "pending":
        return "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200";
      case "cancelled":
        return "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200";
      default:
        return "bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200";
    }
  };

  const getEstadoText = (estado: string) => {
    switch (estado) {
      case "consumed":
        return "Consumido";
      case "pending":
        return "Pendiente";
      case "cancelled":
        return "Cancelado";
      default:
        return estado;
    }
  };

  return (
    <div className="card-container-inner p-6 max-w-4xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <FaArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-dark-blue dark:text-blue">
            Prescripción {prescripcion.code}
          </h1>
          <span
            className={`px-3 py-1 text-sm font-semibold rounded-full ${getEstadoColor(
              prescripcion.status
            )}`}
          >
            {getEstadoText(prescripcion.status)}
          </span>
        </div>

        <div className="space-y-6">
          {/* Card de Items */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <FaPills className="text-blue-600 dark:text-blue-400" size={24} />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Items de la Prescripción
              </h2>
            </div>

            {/* Chips de Items */}
            <div className="flex flex-wrap gap-2 mb-6">
              {prescripcion.items.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setItemSeleccionado(index)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                    itemSeleccionado === index
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Información del Item Seleccionado */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Item
                </label>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {prescripcion.items[itemSeleccionado].name}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Dosis
                </label>
                <p className="text-lg text-gray-900 dark:text-white">
                  {prescripcion.items[itemSeleccionado].dosage}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Cantidad
                </label>
                <p className="text-lg text-gray-900 dark:text-white">
                  {prescripcion.items[itemSeleccionado].quantity}
                </p>
              </div>
              {prescripcion.notes && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Notas
                  </label>
                  <p className="text-lg text-gray-900 dark:text-white">
                    {prescripcion.notes}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Instrucciones
              </label>
              <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                {prescripcion.items[itemSeleccionado].instructions}
              </p>
            </div>
          </div>

          {/* Card del Paciente */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <FaUser
                className="text-green-600 dark:text-green-400"
                size={24}
              />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Información del Paciente
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nombre Completo
                </label>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {prescripcion.patient.user.name}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <p className="text-lg text-gray-900 dark:text-white">
                  {prescripcion.patient.user.email}
                </p>
              </div>
              {prescripcion.patient.birthDate && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Fecha de Nacimiento
                  </label>
                  <p className="text-lg text-gray-900 dark:text-white">
                    {formatDate(prescripcion.patient.birthDate)}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Información de la Consulta */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Información de la Prescripción
            </h2>

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <FaCalendarAlt
                  className="text-blue-600 dark:text-blue-400"
                  size={20}
                />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Fecha de Creación
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {formatDate(prescripcion.createdAt)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FaClock
                  className="text-green-600 dark:text-green-400"
                  size={20}
                />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Hora
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {formatTime(prescripcion.createdAt)}
                  </p>
                </div>
              </div>
              {prescripcion.consumedAt && (
                <div className="flex items-center gap-2">
                  <FaCertificate
                    className="text-green-600 dark:text-green-400"
                    size={20}
                  />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Fecha de Consumo
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {formatDate(prescripcion.consumedAt)}
                    </p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2">
                <FaUser
                  className="text-purple-600 dark:text-purple-400"
                  size={20}
                />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Doctor
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {prescripcion.author.user.name}
                  </p>
                  {prescripcion.author.specialty && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {prescripcion.author.specialty}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
