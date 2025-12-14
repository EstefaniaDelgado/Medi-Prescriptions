'use client';

import Image from 'next/image';
import { useDateTime } from '../../hooks/useDateTime';

export default function DoctorLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className='min-h-screen flex flex-col justify-center'>
      <div className="bg-light-blue dark:bg-background-secondary mx-auto my-4 lg:my-4 lg:px-4 rounded-xl w-11/12 max-w-6xl  px-3">
        <div className="flex items-center justify-between py-6">
          <div className='flex items-center gap-3 '>
            <div className="w-20 h-16 md:w-24 md:h-24 rounded-full overflow-hidden bg-gray-200">
              <Image
                src="/doctor1.svg"
                alt="Doctor"
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl  md:text-3xl font-extrabold text-dark-blue dark:text-blue">
              Hola, Doctor
            </h2>
          </div>
          <h4 className="text-base text-end text-dark-blue dark:text-white font-semibold">
            {useDateTime()}
          </h4>
        </div>
      </div>
      <h4></h4>
      {children}
    </div>
  );
}
