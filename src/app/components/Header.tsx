'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { FaPills, FaHeartbeat } from 'react-icons/fa';
import { useAuthContext } from '@/src/contexts/AuthContext';

export const Header = () => {
  const { user } = useAuthContext();
  return (
    <div className="relative flex flex-col card-container">
      <section className=" space-y-4 h-full pt-4 md:pt-5 w-full flex flex-col items-center">
        <h1 className="main-header">MEDI-PRESCRIPTIONS</h1>
        <div className="hidden flex-1 w-full md:flex justify-end items-center md:flex-row-reverse md:items-end md:justify-between">
          {!user && (
            <div className="flex-1 justify-end flex items-center p-3 transition-transform duration-200 ease-in-out hover:translate-x-1">
              {' '}
              <Link href="/login" className="btn-primary w-1/2 md:w-52 ">
                Iniciar Sesión
              </Link>
              <AiOutlineArrowRight
                className="hidden bg-background-btn text-dark-blue p-2 rounded-full font-semibold md:block cursor-pointer"
                size={40}
              />
            </div>
          )}
          <p className="hidden md:block text-center text-lg lg:text-xl text-dark-blue dark:text-white font-semibold m-5 w-2/6">
            Gestiona tus prescripciones médicas de forma segura y organizada
          </p>
        </div>
      </section>
      <div className="flex items-center ">
        <div>
          <div className="hidden md:flex absolute lg:top-32 md:top-52 left-5 lg:left-24 items-center text-dark-blue dark:text-white">
            <FaPills
              size={40}
              className="mr-2 p-2 bg-background-btn rounded-full"
            />
            <p className="text-lg font-semibold">Toma tus medicinas</p>
          </div>
          <div className="md:absolute bottom-0 h-80 md:h-96 md:left-1/2 md:transform md:-translate-x-1/2">
            <Image
              src="/doc.png"
              alt="Doctora"
              width={200}
              height={200}
              className="h-full w-full object-contain"
            />
          </div>
          <div className="hidden md:flex absolute lg:top-32 md:top-52 right-5 lg:right-24 items-center text-dark-blue dark:text-white">
            <FaHeartbeat size={40} className="mr-2 p-2 bg-blue rounded-full" />
            <p className="text-lg font-semibold">Cuida tu salud</p>
          </div>
        </div>
        {!user && (
          <div className="flex-1  w-full md:hidden justify-end items-center md:flex-row-reverse md:items-end md:justify-between">
            <div className="w-full justify-end flex items-center p-3 transition-transform duration-200 ease-in-out hover:translate-x-1">
              {' '}
              <Link href="/login" className="btn-primary w-full md:w-52 ">
                Iniciar Sesión
              </Link>
              <AiOutlineArrowRight
                className="hidden bg-background-btn text-dark-blue p-2 rounded-full font-semibold md:block cursor-pointer"
                size={40}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
