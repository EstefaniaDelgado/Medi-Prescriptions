"use client";

import {
  FaUserMd,
  FaUsers,
  FaPrescriptionBottleAlt,
  FaChartLine,
  FaSpinner,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { useGetMetricsQuery } from "@/src/redux/services/prescriptionsApi";

export default function AdminDashboard() {
  const { data: metrics, isLoading, error } = useGetMetricsQuery();

  if (isLoading) {
    return (
      <div className="card-container-inner p-6 flex justify-center items-center min-h-[400px]">
        <FaSpinner className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  if (error || !metrics) {
    return (
      <div className="card-container-inner p-6">
        <div className="text-center text-red-600">
          Error al cargar las métricas
        </div>
      </div>
    );
  }

  const datosPorEstado = [
    { name: "Consumida", value: metrics.byStatus.consumed || 0, color: "#10B981" },
    { name: "Pendiente", value: metrics.byStatus.pending || 0, color: "#F59E0B" },
  ];

  const datosSerieDiaria = metrics.byDay.map((item: any) => ({
    fecha: new Date(item.date).toLocaleDateString('es-ES', { month: '2-digit', day: '2-digit' }),
    prescripciones: item.count,
  }));

  return (
    <div className="card-container-inner p-6">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-dark-blue dark:text-blue">
          Dashboard Administrativo
        </h1>

        {/* Tarjetas de Totales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total Doctores
                </p>
                <p className="text-3xl font-bold text-dark-blue dark:text-blue">
                  {metrics.totals.doctors}
                </p>
              </div>
              <FaUserMd className="text-4xl text-blue-600 dark:text-blue-400" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total Pacientes
                </p>
                <p className="text-3xl font-bold text-dark-blue dark:text-blue">
                  {metrics.totals.patients}
                </p>
              </div>
              <FaUsers className="text-4xl text-green-600 dark:text-green-400" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total Prescripciones
                </p>
                <p className="text-3xl font-bold text-dark-blue dark:text-blue">
                  {metrics.totals.prescriptions}
                </p>
              </div>
              <FaPrescriptionBottleAlt className="text-4xl text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico por Estado */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-dark-blue dark:text-blue mb-4">
              Prescripciones por Estado
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={datosPorEstado}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ value, name }) => `${name}: ${value}`}
                >
                  {datosPorEstado.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Top Médicos por Volumen */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg px-6 pt-6">
            <h2 className="text-xl font-semibold text-dark-blue dark:text-blue mb-4 flex items-center gap-2">
              <FaUserMd className="text-blue-600 dark:text-blue-400" />
              Top Médicos por Volumen
            </h2>
            <div className="space-y-3">
              {metrics.topDoctors.map((doctor: any, index: number) => (
                <div key={doctor.doctorId} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400">#{index + 1}</span>
                    <span className="text-gray-900 dark:text-white">Doctor ID: {doctor.doctorId}</span>
                  </div>
                  <span className="text-lg font-semibold text-green-600 dark:text-green-400">
                    {doctor.count} prescripciones
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Serie Temporal */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-dark-blue dark:text-blue mb-4 flex items-center gap-2">
            <FaChartLine className="text-blue-600 dark:text-blue-400" />
            Prescripciones Diarias (Últimos 15 días)
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={datosSerieDiaria}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fecha" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="prescripciones"
                stroke="#3B82F6"
                strokeWidth={3}
                dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
