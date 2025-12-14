'use client';
import { useDateTime } from '../../hooks/useDateTime';
import { FaUser, FaBirthdayCake } from 'react-icons/fa';

// Datos simulados del paciente
const PACIENTE_INFO = {
  nombre: "María García",
  fechaNacimiento: "15 de marzo, 1985"
};

export default function PatientLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className='min-h-screen flex flex-col justify-center'>
      <div className="bg-white dark:bg-background-secondary mx-auto my-4 lg:my-4 lg:px-4 rounded-xl w-11/12 max-w-6xl px-3">
        <div className="flex items-center justify-between py-6">
          <div className='flex items-center gap-3'>
            <div className="w-20 h-16 md:w-24 md:h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
              <FaUser className="text-gray-500 dark:text-gray-400" size={32} />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-extrabold text-dark-blue dark:text-blue">
                {PACIENTE_INFO.nombre}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <FaBirthdayCake className="text-pink-500" size={14} />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {PACIENTE_INFO.fechaNacimiento}
                </span>
              </div>
            </div>
          </div>
          <h4 className="text-base text-end text-dark-blue dark:text-white font-semibold">
            {useDateTime()}
          </h4>
        </div>
      </div>
      {children}
    </div>
  );
}
