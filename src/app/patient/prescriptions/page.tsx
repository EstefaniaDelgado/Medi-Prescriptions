"use client";

import { useState } from "react";
import {
  FaDownload,
  FaCheck,
  FaTimes,
  FaClock,
  FaSpinner,
} from "react-icons/fa";
import {
  useGetPatientPrescriptionsQuery,
  useConsumePrescriptionMutation,
  useDownloadPatientPrescriptionPdfMutation,
} from "@/src/redux/services/prescriptionsApi";
import { PrescriptionStatus } from "@/src/types/prescription/prescription.dto";

export default function Patient() {
  const [fechaFiltro, setFechaFiltro] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState<PrescriptionStatus | "">("");
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 10;

  const {
    data: prescriptionsData,
    isLoading,
    error,
  } = useGetPatientPrescriptionsQuery({
    page: paginaActual,
    limit: itemsPorPagina,
    status: estadoFiltro || undefined,
    from: fechaFiltro || undefined,
  });

  const [consumePrescription] = useConsumePrescriptionMutation();
  const [downloadPdf] = useDownloadPatientPrescriptionPdfMutation();

  const prescripciones = prescriptionsData?.data || [];
  const totalPaginas = prescriptionsData?.pagination?.totalPages || 1;

  const datosPaginados = prescripciones;

  const marcarComoConsumida = async (id: string) => {
    try {
      await consumePrescription(id).unwrap();
    } catch (error) {
      console.error("Error consuming prescription:", error);
    }
  };

  const descargarPDF = async (id: string) => {
    try {
      const blob = await downloadPdf(id).unwrap();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `prescription-${id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="card-container-inner p-6 flex justify-center items-center min-h-100">
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
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-dark-blue dark:text-blue">
            Mis Prescripciones
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="date"
            value={fechaFiltro}
            onChange={(e) => {
              setFechaFiltro(e.target.value);
              setPaginaActual(1);
            }}
            className="w-full sm:max-w-xs px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <select
            value={estadoFiltro}
            onChange={(e) => {
              setEstadoFiltro(e.target.value as PrescriptionStatus | "");
              setPaginaActual(1);
            }}
            className="w-full sm:max-w-xs px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">Filtrar por estado</option>
            <option value={PrescriptionStatus.CONSUMED}>Consumida</option>
            <option value={PrescriptionStatus.PENDING}>Pendiente</option>
          </select>
          {(fechaFiltro || estadoFiltro) && (
            <button
              onClick={() => {
                setFechaFiltro("");
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
                  Médico
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
                    <td className="px-3 sm:px-5 py-4 text-xs sm:text-sm text-gray-900 dark:text-gray-100 font-mono">
                      {item.code}
                    </td>
                    <td className="px-3 sm:px-6 py-4 text-xs sm:text-sm text-gray-900 dark:text-gray-100">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-3 sm:px-6 py-4 text-xs sm:text-sm text-gray-900 dark:text-gray-100">
                      {item.author.user.name}
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
                      <div className="flex gap-1">
                        {item.status === PrescriptionStatus.PENDING && (
                          <button
                            onClick={() => marcarComoConsumida(item.id)}
                            className="p-1 text-gray-400 dark:text-gray-600 hover:text-green-600 dark:hover:text-green-400"
                            title="Marcar como consumida"
                          >
                            <FaCheck size={14} />
                          </button>
                        )}
                        <button
                          onClick={() => descargarPDF(item.id)}
                          className="p-1 text-gray-400 dark:text-gray-600 hover:text-blue-600 dark:hover:text-blue-400"
                          title="Descargar PDF"
                        >
                          <FaDownload size={14} />
                        </button>
                      </div>
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
                        Intenta ajustar los filtros para ver más resultados
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
