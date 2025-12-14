"use client";

import { useState, useMemo } from 'react';
import { FaDownload, FaCheck, FaTimes, FaClock } from 'react-icons/fa';
import Link from 'next/link';

const PRESCRIPCIONES_PACIENTE = [
  {
    id: 1,
    fecha: "2024-01-15",
    hora: "09:30",
    descripcion: "Consulta general",
    medico: "Dr. Juan Rodríguez",
    especialidad: "Medicina General",
    estado: "Consumida"
  },
  {
    id: 2,
    fecha: "2024-01-20",
    hora: "14:15",
    descripcion: "Control de presión arterial",
    medico: "Dra. María González",
    especialidad: "Cardiología",
    estado: "Pendiente"
  },
  {
    id: 3,
    fecha: "2024-01-25",
    hora: "11:00",
    descripcion: "Revisión médica rutinaria",
    medico: "Dr. Carlos Martínez",
    especialidad: "Medicina Interna",
    estado: "Pendiente"
  },
  {
    id: 4,
    fecha: "2024-02-01",
    hora: "16:30",
    descripcion: "Consulta dermatológica",
    medico: "Dra. Ana López",
    especialidad: "Dermatología",
    estado: "Consumida"
  },
  {
    id: 5,
    fecha: "2024-02-05",
    hora: "10:00",
    descripcion: "Chequeo oftalmológico",
    medico: "Dr. Pedro Sánchez",
    especialidad: "Oftalmología",
    estado: "Pendiente"
  }
];

export default function Patient() {
  const [prescripciones, setPrescripciones] = useState(PRESCRIPCIONES_PACIENTE);
  const [fechaFiltro, setFechaFiltro] = useState('');
  const [estadoFiltro, setEstadoFiltro] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 10;

  const datosFiltrados = useMemo(() => {
    return prescripciones.filter(item => {
      const coincideFecha = !fechaFiltro || item.fecha.includes(fechaFiltro);
      const coincideEstado = !estadoFiltro || item.estado === estadoFiltro;
      return coincideFecha && coincideEstado;
    });
  }, [prescripciones, fechaFiltro, estadoFiltro]);

  const totalPaginas = Math.ceil(datosFiltrados.length / itemsPorPagina);
  const indiceInicio = (paginaActual - 1) * itemsPorPagina;
  const datosPaginados = datosFiltrados.slice(indiceInicio, indiceInicio + itemsPorPagina);

  const cambiarEstado = (id: number, nuevoEstado: string) => {
    setPrescripciones(prev => 
      prev.map(item => 
        item.id === id ? { ...item, estado: nuevoEstado } : item
      )
    );
  };

  const descargarPDF = (id: number) => {
    console.log(`Descargando PDF de prescripción ${id}`);
    // Aquí iría la lógica para descargar el PDF
  };

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
            onChange={(e) => setFechaFiltro(e.target.value)}
            className="w-full sm:max-w-xs px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <select
            value={estadoFiltro}
            onChange={(e) => setEstadoFiltro(e.target.value)}
            className="w-full sm:max-w-xs px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">Filtrar por estado</option>
            <option value="Consumida">Consumida</option>
            <option value="Pendiente">Pendiente</option>
          </select>
          {(fechaFiltro || estadoFiltro) && (
            <button
              onClick={() => {
                setFechaFiltro('');
                setEstadoFiltro('');
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
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Fecha</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Hora</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider hidden sm:table-cell">Descripción</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Médico</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider hidden md:table-cell">Especialidad</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Estado</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Acciones</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Detalle</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">PDF</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {datosPaginados.length > 0 ? (
                datosPaginados.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-3 sm:px-5 py-4 text-xs sm:text-sm text-gray-900 dark:text-gray-100">{item.fecha}</td>
                    <td className="px-3 sm:px-6 py-4 text-xs sm:text-sm text-gray-900 dark:text-gray-100">{item.hora}</td>
                    <td className="px-3 sm:px-6 py-4 text-xs sm:text-sm text-gray-900 dark:text-gray-100 hidden sm:table-cell">{item.descripcion}</td>
                    <td className="px-3 sm:px-6 py-4 text-xs sm:text-sm text-gray-900 dark:text-gray-100">{item.medico}</td>
                    <td className="px-3 sm:px-6 py-4 text-xs sm:text-sm text-gray-900 dark:text-gray-100 hidden md:table-cell">{item.especialidad}</td>
                    <td className="px-3 sm:px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        item.estado === 'Consumida' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                        'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                      }`}>
                        {item.estado}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-4">
                      <div className="flex gap-1">
                        <button
                          onClick={() => cambiarEstado(item.id, 'Consumida')}
                          className={`p-1 ${
                            item.estado === 'Consumida' 
                              ? 'text-green-600 dark:text-green-400' 
                              : 'text-gray-400 dark:text-gray-600 hover:text-green-600 dark:hover:text-green-400'
                          }`}
                          title="Marcar como consumida"
                        >
                          <FaCheck size={14} />
                        </button>
                        <button
                          onClick={() => cambiarEstado(item.id, 'Pendiente')}
                          className={`p-1 ${
                            item.estado === 'Pendiente' 
                              ? 'text-yellow-600 dark:text-yellow-400' 
                              : 'text-gray-400 dark:text-gray-600 hover:text-yellow-600 dark:hover:text-yellow-400'
                          }`}
                          title="Marcar como pendiente"
                        >
                          <FaClock size={14} />
                        </button>
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-4">
                      <Link href={`/patient/prescriptions/${item.id}`} className="btn-primary px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm">
                        Ver
                      </Link>
                    </td>
                    <td className="px-3 sm:px-6 py-4">
                      <button
                        onClick={() => descargarPDF(item.id)}
                        className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
                        title="Descargar PDF"
                      >
                        <FaDownload size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center">
                    <div className="text-gray-500 dark:text-gray-400">
                      <p className="text-lg font-medium mb-2">No se encontraron prescripciones</p>
                      <p className="text-sm">Intenta ajustar los filtros para ver más resultados</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left">
            Mostrando {indiceInicio + 1}-{Math.min(indiceInicio + itemsPorPagina, datosFiltrados.length)} de {datosFiltrados.length} resultados
          </p>
          <div className="flex justify-center sm:justify-end gap-2">
            <button
              onClick={() => setPaginaActual(prev => Math.max(prev - 1, 1))}
              disabled={paginaActual === 1}
              className="px-2 sm:px-3 py-1 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              Anterior
            </button>
            <span className="px-2 sm:px-3 py-1 text-xs sm:text-sm text-gray-900 dark:text-white">
              Página {paginaActual} de {totalPaginas}
            </span>
            <button
              onClick={() => setPaginaActual(prev => Math.min(prev + 1, totalPaginas))}
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
