"use client"

import Image from 'next/image';
import { AiOutlineArrowRight } from 'react-icons/ai';

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <section className="card-container p-3 flex flex-col md:flex-row gap-5 xl:gap-10 items-center justify-around">
      <div className='md:flex-1'>
        <Image src="/login_image.svg" alt="Login" width={300} height={300} className='md:w-full md:h-full'/>
      </div>
      <article className="dark:text-white text-center md:w-5/12 md:px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-dark-blue dark:text-blue">
          Medi-Prescription
        </h2>
        <p className='text-lg'>Tu salud, tus medicinas!</p>
        <form className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full px-4 py-2 border border-gray-300 dark:border-white rounded-lg focus:outline-none focus:border-[#546FEA] placeholder-gray-400 dark:placeholder-white dark:bg-transparent"
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full px-4 py-2 border border-gray-300 dark:border-white rounded-lg focus:outline-none focus:border-[#546FEA] placeholder-gray-400 dark:placeholder-white dark:bg-transparent"
          />
         <div className="flex justify-center items-center p-3 transition-transform duration-200 ease-in-out hover:translate-x-1">
              {' '}
              <button  className="btn-primary w-1/2 md:w-52 ">
               Ingresar
              </button>
              <AiOutlineArrowRight
                className="bg-background-btn text-dark-blue p-2 rounded-full font-semibold cursor-pointer"
                size={40}
              />
            </div>
        </form>
      </article>
      </section>
    </div>
  );
}
