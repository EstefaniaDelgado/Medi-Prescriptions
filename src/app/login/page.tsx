'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useLoginMutation } from '@/src/redux/services/authApi';
import { LoginUserDto } from '@/src/types/user/user.dto';
import { useAuthContext } from '@/src/contexts/AuthContext';

import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface LoginError {
  data?: {
    message?: string;
  };
}

export default function Login() {
  const [credentials, setCredentials] = useState<LoginUserDto>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>('');
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();

  const { user } = useAuthContext();

  const redirectByRole = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        router.push('/admin');
        break;
      case 'doctor':
        router.push('/doctor/prescriptions');
        break;
      case 'patient':
        router.push('/patient/prescriptions');
        break;
      default:
        router.push('/login');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!credentials.email || !credentials.password) {
      setError('Por favor completa todos los campos');
      return;
    }

    const toastId = toast.loading('Iniciando sesión...');
    try {
      await login(credentials).unwrap();
      toast.success('Sesión iniciada', { id: toastId });

      // Esperar un momento para que el contexto se actualice
      setTimeout(() => {
        if (user?.role) {
          redirectByRole(user.role);
        } else {
          router.push('/');
        }
      }, 100);
    } catch (err) {
      toast.error('Error al iniciar sesión', { id: toastId });
      setError((err as LoginError)?.data?.message || 'Error al iniciar sesión');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
    if (error) setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <section className="card-container-inner p-3 flex flex-col md:flex-row gap-5 xl:gap-10 items-center justify-around">
        <div className="md:flex-1">
          <Image
            src="/login_image.svg"
            alt="Login"
            width={300}
            height={300}
            className="md:w-full md:h-full"
          />
        </div>
        <article className="dark:text-white text-center md:w-5/12 md:px-4">
          <Link href={'/'}>
                      <h2 className="text-4xl lg:text-5xl font-extrabold text-dark-blue dark:text-blue">
              Medi-Prescription
            </h2>
          </Link>
          <p className="text-lg">Tu salud, tus medicinas!</p>

          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={credentials.email}
              onChange={handleChange}
              disabled={isLoading}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-white rounded-lg focus:outline-none focus:border-[#546FEA] placeholder-gray-400 dark:placeholder-white dark:bg-transparent disabled:opacity-50"
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={credentials.password}
              onChange={handleChange}
              disabled={isLoading}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-white rounded-lg focus:outline-none focus:border-[#546FEA] placeholder-gray-400 dark:placeholder-white dark:bg-transparent disabled:opacity-50"
            />
            <div className="flex justify-center items-center p-3 transition-transform duration-200 ease-in-out hover:translate-x-1">
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-1/2 md:w-52 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Ingresando...' : 'Ingresar'}
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
