"use client";

import { FaUserMd, FaUsers, FaPrescriptionBottleAlt, FaChartLine } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const DATOS_TOTALES = {
  doctores: 15,
  pacientes: 342,
  prescripciones: 1248
};

const DATOS_POR_ESTADO = [
  { estado: 'Consumida', cantidad: 756, color: '#10B981' },
  { estado: 'Pendiente', cantidad: 384, color: '#F59E0B' },
  { estado: 'Cancelado', cantidad: 108, color: '#EF4444' }
];

const DATOS_SERIE_DIARIA = [
  { fecha: '01/01', prescripciones: 12 },
  { fecha: '02/01', prescripciones: 19 },
  { fecha: '03/01', prescripciones: 15 },
  { fecha: '04/01', prescripciones: 22 },
  { fecha: '05/01', prescripciones: 18 },
  { fecha: '06/01', prescripciones: 25 },
  { fecha: '07/01', prescripciones: 20 },
  { fecha: '08/01', prescripciones: 28 },
  { fecha: '09/01', prescripciones: 24 },
  { fecha: '10/01', prescripciones: 31 },
  { fecha: '11/01', prescripciones: 27 },
  { fecha: '12/01', prescripciones: 35 },
  { fecha: '13/01', prescripciones: 29 },
  { fecha: '14/01', prescripciones: 33 },
  { fecha: '15/01', prescripciones: 38 }
];

const TOP_MEDICOS = [
  { medico: 'Dr. Juan Rodríguez', prescripciones: 156 },
  { medico: 'Dra. María González', prescripciones: 142 },
  { medico: 'Dr. Carlos Martínez', prescripciones: 128 },
  { medico: 'Dra. Ana López', prescripciones: 115 },
  { medico: 'Dr. Pedro Sánchez', prescripciones: 98 }
];

export default function AdminDashboard() {
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
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Doctores</p>
                <p className="text-3xl font-bold text-dark-blue dark:text-blue">{DATOS_TOTALES.doctores}</p>
              </div>
              <FaUserMd className="text-4xl text-blue-600 dark:text-blue-400" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Pacientes</p>
                <p className="text-3xl font-bold text-dark-blue dark:text-blue">{DATOS_TOTALES.pacientes}</p>
              </div>
              <FaUsers className="text-4xl text-green-600 dark:text-green-400" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Prescripciones</p>
                <p className="text-3xl font-bold text-dark-blue dark:text-blue">{DATOS_TOTALES.prescripciones}</p>
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
                  data={DATOS_POR_ESTADO}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="cantidad"
                  label={({ estado, cantidad }) => `${estado}: ${cantidad}`}
                >
                  {DATOS_POR_ESTADO.map((entry, index) => (
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
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={TOP_MEDICOS} margin={{ bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="medico" 
                  angle={-45} 
                  textAnchor="end" 
                  height={100}
                  interval={0}
                  fontSize={12}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="prescripciones" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Serie Temporal */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-dark-blue dark:text-blue mb-4 flex items-center gap-2">
            <FaChartLine className="text-blue-600 dark:text-blue-400" />
            Prescripciones Diarias (Últimos 15 días)
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={DATOS_SERIE_DIARIA}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fecha" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="prescripciones" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
