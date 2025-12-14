"use client";

import { useState } from 'react';
import { FaChevronDown, FaUser } from 'react-icons/fa';
import Link from 'next/link';

const ESPECIALIDADES = [
  'Medicina General',
  'Cardiología',
  'Dermatología',
  'Medicina Interna',
  'Oftalmología',
  'Pediatría',
  'Ginecología',
  'Neurología'
];

export default function Navbar() {
  const [mostrarEspecialidades, setMostrarEspecialidades] = useState(false);

  return (
    <nav className="navbar-container fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            
            <span className="text-xl font-bold text-blue dark:text-blue">
              Medi-Prescriptions
            </span>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center gap-6">
            {/* Especialidades Dropdown */}
            <div className="hidden md:block md:relative">
              <button
                onClick={() => setMostrarEspecialidades(!mostrarEspecialidades)}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
              >
                Especialidades
                <FaChevronDown className={`text-sm transition-transform ${
                  mostrarEspecialidades ? 'rotate-180' : ''
                }`} />
              </button>
              
              {mostrarEspecialidades && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 z-50">
                  <div className="py-2">
                    {ESPECIALIDADES.map((especialidad, index) => (
                      <Link
                        key={index}
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        onClick={() => setMostrarEspecialidades(false)}
                      >
                        {especialidad}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Login Button */}
            <Link
              href="/login"
              className="btn-primary flex items-center gap-2 px-4 py-2 text-sm! md:text-base"
            >
              <FaUser size={14} />
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay para cerrar dropdown */}
      {mostrarEspecialidades && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setMostrarEspecialidades(false)}
        />
      )}
    </nav>
  );
}