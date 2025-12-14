"use client";

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FaArrowLeft, FaUser, FaPills, FaCalendarAlt, FaClock, FaCertificate } from 'react-icons/fa';

// Datos simulados - en una app real vendrían de una API
const PRESCRIPCIONES = [
  {
    id: 1,
    fecha: "2024-01-15",
    hora: "09:30",
    descripcion: "Consulta general",
    items: [
      {
        id: 1,
        nombre: "Ibuprofeno",
        dosis: "400mg",
        cantidad: "20 tabletas",
        instrucciones: "Tomar 1 tableta cada 8 horas después de las comidas por 5 días"
      },
      {
        id: 2,
        nombre: "Paracetamol",
        dosis: "500mg",
        cantidad: "15 tabletas",
        instrucciones: "Tomar 1 tableta cada 6 horas en caso de fiebre"
      }
    ],
    estado: "Completado",
    paciente: {
      nombre: "Juan Pérez",
      cedula: "12345678",
      edad: 45,
      telefono: "555-0123"
    }
  },
  {
    id: 2,
    fecha: "2024-01-15",
    hora: "10:15",
    descripcion: "Control de presión",
    items: [
      {
        id: 1,
        nombre: "Losartán",
        dosis: "50mg",
        cantidad: "30 tabletas",
        instrucciones: "Tomar 1 tableta diaria en ayunas por 30 días"
      }
    ],
    estado: "Pendiente",
    paciente: {
      nombre: "María García",
      cedula: "87654321",
      edad: 52,
      telefono: "555-0456"
    }
  },
  {
    id: 3,
    fecha: "2024-01-16",
    hora: "11:00",
    descripcion: "Revisión médica",
    items: [
      {
        id: 1,
        nombre: "Amoxicilina",
        dosis: "500mg",
        cantidad: "21 cápsulas",
        instrucciones: "Tomar 1 cápsula cada 8 horas por 7 días"
      }
    ],
    estado: "Cancelado",
    paciente: {
      nombre: "Carlos López",
      cedula: "11223344",
      edad: 38,
      telefono: "555-0789"
    }
  }
];

export default function DetallePrescripcion() {
  const params = useParams();
  const router = useRouter();
  const prescripcionId = parseInt(params.id as string);
  const [itemSeleccionado, setItemSeleccionado] = useState(0);
  
  const prescripcion = PRESCRIPCIONES.find(p => p.id === prescripcionId);
  
  if (!prescripcion) {
    return (
      <div className="card-container p-6 max-w-2xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Prescripción no encontrada</h1>
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
      case 'Completado': return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'Pendiente': return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
      case 'Cancelado': return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
      default: return 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200';
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
            Detalle de Prescripción #{prescripcion.id}
          </h1>
          <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getEstadoColor(prescripcion.estado)}`}>
            {prescripcion.estado}
          </span>
        </div>

        <div className="space-y-6">
            {/* Card de Items */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <FaPills className="text-blue-600 dark:text-blue-400" size={24} />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Items de la Prescripción</h2>
              </div>
              
              {/* Chips de Items */}
              <div className="flex flex-wrap gap-2 mb-6">
                {prescripcion.items.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => setItemSeleccionado(index)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                      itemSeleccionado === index
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {item.nombre}
                  </button>
                ))}
              </div>
              
              {/* Información del Item Seleccionado */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Item</label>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{prescripcion.items[itemSeleccionado].nombre}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Dosis</label>
                  <p className="text-lg text-gray-900 dark:text-white">{prescripcion.items[itemSeleccionado].dosis}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cantidad</label>
                  <p className="text-lg text-gray-900 dark:text-white">{prescripcion.items[itemSeleccionado].cantidad}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descripción</label>
                  <p className="text-lg text-gray-900 dark:text-white">{prescripcion.descripcion}</p>
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Instrucciones</label>
                <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                  {prescripcion.items[itemSeleccionado].instrucciones}
                </p>
              </div>
            </div>

            {/* Card del Paciente */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <FaUser className="text-green-600 dark:text-green-400" size={24} />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Información del Paciente</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre Completo</label>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{prescripcion.paciente.nombre}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cédula</label>
                  <p className="text-lg text-gray-900 dark:text-white">{prescripcion.paciente.cedula}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Edad</label>
                  <p className="text-lg text-gray-900 dark:text-white">{prescripcion.paciente.edad} años</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Teléfono</label>
                  <p className="text-lg text-gray-900 dark:text-white">{prescripcion.paciente.telefono}</p>
                </div>
              </div>
            </div>

            {/* Información de la Consulta */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Información de la Consulta</h2>
              
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-blue-600 dark:text-blue-400" size={16} />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Fecha:</span>
                  <span className="text-gray-900 dark:text-white">{prescripcion.fecha}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="text-blue-600 dark:text-blue-400" size={16} />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Hora:</span>
                  <span className="text-gray-900 dark:text-white">{prescripcion.hora}</span>
                </div>
              </div>
            </div>

            {/* Autorización Médica */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
              <FaCertificate className="text-blue-600 dark:text-blue-400 mx-auto mb-3" size={48} />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Prescripción médica autorizada
              </p>
            </div>
        </div>
      </div>
    </div>
  );
}
