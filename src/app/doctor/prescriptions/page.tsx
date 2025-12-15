"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaPrescriptionBottleAlt, FaTimes, FaSpinner } from "react-icons/fa";
import Link from "next/link";
import { useGetDoctorPrescriptionsQuery } from "@/src/redux/services/prescriptionsApi";
import { PrescriptionStatus } from "@/src/types/prescription/prescription.dto";

export default function Doctor() {
  const router = useRouter();
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState<PrescriptionStatus | "">("");
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 10;

  const {
    data: prescriptionsData,
    isLoading,
    error,
  } = useGetDoctorPrescriptionsQuery({
    mine: true,
    page: paginaActual,
    limit: itemsPorPagina,
    status: estadoFiltro || undefined,
    from: fechaDesde || undefined,
    to: fechaHasta || undefined,
  });

  const prescripciones = prescriptionsData?.data || [];
  const totalPaginas = prescriptionsData?.pagination?.totalPages || 1;
  const datosPaginados = prescripciones;

  if (isLoading) {
    return (
      <div className="card-container-inner p-6 flex justify-center items-center min-h-[400px]">
        <FaSpinner className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="card-container-inner p-6">
        <div className="text-center text-red-600">
          Error al cargar las prescripciones
        </div>
      </div>
    );
  }

  return (
    <div className="card-container-inner p-6">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="date"
              value={fechaDesde}
              onChange={(e) => setFechaDesde(e.target.value)}
              placeholder="Fecha desde"
              className="w-full sm:max-w-xs px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <input
              type="date"
              value={fechaHasta}
              onChange={(e) => setFechaHasta(e.target.value)}
              placeholder="Fecha hasta"
              className="w-full sm:max-w-xs px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <select
              value={estadoFiltro}
              onChange={(e) =>
                setEstadoFiltro(e.target.value as PrescriptionStatus | "")
              }
              className="w-full sm:max-w-xs px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">Filtrar por estado</option>
              <option value={PrescriptionStatus.CONSUMED}>Consumida</option>
              <option value={PrescriptionStatus.PENDING}>Pendiente</option>
            </select>
            {(fechaDesde || fechaHasta || estadoFiltro) && (
              <button
                onClick={() => {
                  setFechaDesde("");
                  setFechaHasta("");
                  setEstadoFiltro("");
                  setPaginaActual(1);
                }}
                className="px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 flex items-center gap-2"
                title="Limpiar filtros"
              >
                <FaTimes size={14} />
                Limpiar
              </button>
            )}
          </div>
          <button
            onClick={() => router.push("/doctor/prescriptions/new")}
            className="btn-primary flex items-center gap-2 px-4 py-2 text-sm whitespace-nowrap"
          >
            <FaPrescriptionBottleAlt size={16} />
            Nueva Prescripción
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-x-auto">
          <table className="w-full table-auto min-w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Código
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Paciente
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider hidden sm:table-cell">
                  Medicamentos
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {datosPaginados.length > 0 ? (
                datosPaginados.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-3 sm:px-6 py-4 text-xs sm:text-sm text-gray-900 dark:text-gray-100 font-mono">
                      {item.code}
                    </td>
                    <td className="px-3 sm:px-6 py-4 text-xs sm:text-sm text-gray-900 dark:text-gray-100">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-3 sm:px-6 py-4 text-xs sm:text-sm text-gray-900 dark:text-gray-100">
                      {item.patient.user.name}
                    </td>
                    <td className="px-3 sm:px-6 py-4 text-xs sm:text-sm text-gray-900 dark:text-gray-100 hidden sm:table-cell">
                      {item.items.length} medicamento(s)
                    </td>
                    <td className="px-3 sm:px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          item.status === PrescriptionStatus.CONSUMED
                            ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                            : "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                        }`}
                      >
                        {item.status === PrescriptionStatus.CONSUMED
                          ? "Consumida"
                          : "Pendiente"}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-4">
                      <Link
                        href={`/doctor/prescriptions/${item.id}`}
                        className="btn-primary px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm"
                      >
                        Ver
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="text-gray-500 dark:text-gray-400">
                      <p className="text-lg font-medium mb-2">
                        No se encontraron prescripciones
                      </p>
                      <p className="text-sm">
                        Intenta ajustar los filtros o crear una nueva
                        prescripción
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left">
            Mostrando {(paginaActual - 1) * itemsPorPagina + 1}-
            {Math.min(
              paginaActual * itemsPorPagina,
              prescriptionsData?.pagination?.total || 0
            )}{" "}
            de {prescriptionsData?.pagination?.total || 0} resultados
          </p>
          <div className="flex justify-center sm:justify-end gap-2">
            <button
              onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))}
              disabled={paginaActual === 1}
              className="px-2 sm:px-3 py-1 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              Anterior
            </button>
            <span className="px-2 sm:px-3 py-1 text-xs sm:text-sm text-gray-900 dark:text-white">
              Página {paginaActual} de {totalPaginas}
            </span>
            <button
              onClick={() =>
                setPaginaActual((prev) => Math.min(prev + 1, totalPaginas))
              }
              disabled={paginaActual === totalPaginas}
              className="px-2 sm:px-3 py-1 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
