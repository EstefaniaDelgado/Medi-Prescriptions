"use client";

import { useState } from "react";
import {
  FaChevronDown,
  FaUser,
  FaSignOutAlt,
  FaTachometerAlt,
  FaPrescriptionBottleAlt,
  FaPlus,
  FaEye,
  FaSpinner,
} from "react-icons/fa";
import Link from "next/link";
import { useAuth } from "@/src/hooks/useAuth";
import { useAuthContext } from "@/src/contexts/AuthContext";

const ESPECIALIDADES = [
  "Medicina General",
  "Cardiología",
  "Dermatología",
  "Medicina Interna",
  "Oftalmología",
  "Pediatría",
  "Ginecología",
  "Neurología",
];

export default function Navbar() {
  const [mostrarEspecialidades, setMostrarEspecialidades] = useState(false);
  const [mostrarMenuUsuario, setMostrarMenuUsuario] = useState(false);
  const { logout } = useAuth();
  const { user, isLoading, error } = useAuthContext();

  const userRole = user?.role;

  const handleLogout = async () => {
    await logout();
    setMostrarMenuUsuario(false);
  };

  const getMenuOptions = () => {
    switch (userRole?.toLowerCase()) {
      case "admin":
        return [
          {
            label: "Dashboard",
            href: "/admin",
            icon: <FaTachometerAlt size={14} />,
          },
        ];
      case "doctor":
        return [
          {
            label: "Ver Prescripciones",
            href: "/doctor/prescriptions",
            icon: <FaEye size={14} />,
          },
          {
            label: "Crear Prescripción",
            href: "/doctor/prescriptions/new",
            icon: <FaPlus size={14} />,
          },
        ];
      case "patient":
        return [
          {
            label: "Mis Prescripciones",
            href: "/patient/prescriptions",
            icon: <FaPrescriptionBottleAlt size={14} />,
          },
        ];
      default:
        return [];
    }
  };

  return (
    <nav className="navbar-container fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href={'/'} className="text-xl font-bold text-blue dark:text-blue">
              Medi-Prescriptions
            </Link>
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
                <FaChevronDown
                  className={`text-sm transition-transform ${
                    mostrarEspecialidades ? "rotate-180" : ""
                  }`}
                />
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

            {/* User Menu */}
            {isLoading ? (
              <div className="flex items-center gap-2 p-1">
                <FaSpinner className="animate-spin text-blue-600" size={16} />
              </div>
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setMostrarMenuUsuario(!mostrarMenuUsuario)}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md border-2 border-white dark:border-gray-600">
                    <FaUser className="text-white" size={16} />
                  </div>
                  <FaChevronDown
                    className={`text-sm text-gray-600 dark:text-gray-300 transition-transform ${
                      mostrarMenuUsuario ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {mostrarMenuUsuario && (
                  <div className="absolute top-full right-0 mt-3 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-600 z-50 overflow-hidden">
                    {/* Header del dropdown */}
                    <div className="px-4 py-3 bg-linear-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-b border-gray-200 dark:border-gray-600">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                          <FaUser className="text-white" size={12} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white capitalize">
                            {userRole}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="py-2">
                      {/* Opciones según el rol */}
                      {getMenuOptions().map((option, index) => (
                        <Link
                          key={index}
                          href={option.href}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          onClick={() => setMostrarMenuUsuario(false)}
                        >
                          <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                            {option.icon}
                          </div>
                          {option.label}
                        </Link>
                      ))}

                      {/* Separador */}
                      {getMenuOptions().length > 0 && (
                        <div className="border-t border-gray-200 dark:border-gray-600 my-2"></div>
                      )}

                      {/* Logout */}
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400">
                          <FaSignOutAlt size={14} />
                        </div>
                        Cerrar Sesión
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Login Button para usuarios no autenticados */
              <Link
                href="/login"
                className="btn-primary flex items-center gap-2 px-4 py-2 text-sm! md:text-base"
              >
                <FaUser size={14} />
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Overlay para cerrar dropdowns */}
      {(mostrarEspecialidades || mostrarMenuUsuario) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setMostrarEspecialidades(false);
            setMostrarMenuUsuario(false);
          }}
        />
      )}
    </nav>
  );
}
