"use client";

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft, FaUser, FaCalendarAlt, FaClock, FaPills, FaFileAlt } from 'react-icons/fa';

const PRESCRIPCIONES_DETALLE = {
  1: {
    id: 1,
    fecha: "2024-01-15",
    hora: "09:30",
    descripcion: "Consulta general",
    items: [
      {
        id: 1,
        nombre: "Ibuprofeno",
        dosis: "400mg",
        cantidad: "30 tabletas",
        instrucciones: "Tomar con alimentos. No exceder la dosis recomendada."
      },
      {
        id: 2,
        nombre: "Paracetamol",
        dosis: "500mg",
        cantidad: "15 tabletas",
        instrucciones: "Tomar en caso de fiebre cada 6 horas"
      }
    ],
    estado: "Consumida",
    medico: {
      nombre: "Dr. Juan Rodríguez",
      especialidad: "Medicina General",
      email: "juan.rodriguez@hospital.com"
    },
    paciente: {
      nombre: "María García",
      cedula: "87654321",
      edad: "32 años"
    }
  },
  2: {
    id: 2,
    fecha: "2024-01-20",
    hora: "14:15",
    descripcion: "Control de presión arterial",
    items: [
      {
        id: 1,
        nombre: "Losartán",
        dosis: "50mg",
        cantidad: "60 tabletas",
        instrucciones: "Tomar en ayunas por la mañana y noche. Controlar presión arterial semanalmente."
      }
    ],
    estado: "Pendiente",
    medico: {
      nombre: "Dra. María González",
      especialidad: "Cardiología",
      email: "maria.gonzalez@cardiocentro.com"
    },
    paciente: {
      nombre: "María García",
      cedula: "87654321",
      edad: "32 años"
    }
  },
  3: {
    id: 3,
    fecha: "2024-01-25",
    hora: "11:00",
    descripcion: "Revisión médica rutinaria",
    items: [
      {
        id: 1,
        nombre: "Vitamina D3",
        dosis: "1000 UI",
        cantidad: "90 cápsulas",
        instrucciones: "Tomar con la comida principal. Exposición solar moderada recomendada."
      }
    ],
    estado: "Pendiente",
    medico: {
      nombre: "Dr. Carlos Martínez",
      especialidad: "Medicina Interna",
      email: "carlos.martinez@clinicainterna.com"
    },
    paciente: {
      nombre: "María García",
      cedula: "87654321",
      edad: "32 años"
    }
  }
};

export default function Prescription() {
  const params = useParams();
  const prescripcionId = parseInt(params.id as string);
  const [itemSeleccionado, setItemSeleccionado] = useState(0);
  const prescripcion = PRESCRIPCIONES_DETALLE[prescripcionId as keyof typeof PRESCRIPCIONES_DETALLE];

  if (!prescripcion) {
    return (
      <div className="card-container-inner p-6">
        <h1 className="text-2xl font-bold text-dark-blue dark:text-blue mb-4">Prescripción no encontrada</h1>
        <Link href="/patient" className="btn-primary">
          Volver a mis prescripciones
        </Link>
      </div>
    );
  }

  return (
    <div className="card-container-inner p-6">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/patient" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200">
            <FaArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-dark-blue dark:text-blue">
            Detalle de Prescripción #{prescripcion.id}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-dark-blue dark:text-blue mb-4 flex items-center gap-2">
              <FaPills className="text-blue-600 dark:text-blue-400" />
              Información de la Prescripción
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaCalendarAlt className="text-gray-500 dark:text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Fecha</p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{prescripcion.fecha}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaClock className="text-gray-500 dark:text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Hora</p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{prescripcion.hora}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Descripción</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{prescripcion.descripcion}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Estado</p>
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                  prescripcion.estado === 'Consumida' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                  prescripcion.estado === 'Pendiente' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
                  'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                }`}>
                  {prescripcion.estado}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-dark-blue dark:text-blue mb-4 flex items-center gap-2">
              <FaUser className="text-blue-600 dark:text-blue-400" />
              Información del Médico
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Nombre</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{prescripcion.medico.nombre}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Especialidad</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{prescripcion.medico.especialidad}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Email</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{prescripcion.medico.email}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-dark-blue dark:text-blue mb-4 flex items-center gap-2">
            <FaFileAlt className="text-blue-600 dark:text-blue-400" />
            Items de la Prescripción
          </h2>
          
          {/* Chips de Items */}
          <div className="flex flex-wrap gap-2 mb-6">
            {prescripcion.items.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setItemSeleccionado(index)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  itemSeleccionado === index
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {item.nombre}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Item</p>
              <p className="font-medium text-gray-900 dark:text-gray-100 text-lg">{prescripcion.items[itemSeleccionado].nombre}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Dosis</p>
              <p className="font-medium text-gray-900 dark:text-gray-100">{prescripcion.items[itemSeleccionado].dosis}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Cantidad</p>
              <p className="font-medium text-gray-900 dark:text-gray-100">{prescripcion.items[itemSeleccionado].cantidad}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Instrucciones</p>
              <p className="font-medium text-gray-900 dark:text-gray-100">{prescripcion.items[itemSeleccionado].instrucciones}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Link href="/patient" className="btn-primary px-6 py-3">
            Volver a mis prescripciones
          </Link>
        </div>
      </div>
    </div>
  );
}
