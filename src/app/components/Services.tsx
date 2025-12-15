import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';

const services = [
  {
    title: 'Video Consulta',
    description: 'Conectate con nuestros medicos desde tu hogar.',
    image: '/video-consultation.png',
    color: 'yellow-card',
  },
  {
    title: 'Encuentra medicos',
    description: 'Confirma tus citas rapidamente.',
    image: '/doctor.PNG',
    color: 'purple-card',
  },
  {
    title: 'Medicinas 24/7',
    description: 'Recibe tus medicinas en la puerta de tu casa.',
    image: '/pills.png',
    color: 'green-card',
  },
  {
    title: 'Examenes de laboratorio',
    description: 'Realiza tus examenes de laboratorio sin salir de casa.',
    image: '/dosis.PNG',
    color: 'blue-card',
  },
];

export default function Services() {
  return (
    <div className="mx-auto w-11/12 max-w-6xl py-10">
      <h2 className="text-center md:text-start text-2xl md:text-4xl dark:text-white text-light-blue font-semibold">
        Nuestros Servicios
      </h2>
      <section className="grid grid-cols-[repeat(auto-fit,minmax(189px,1fr))] gap-3 my-8">
        {services.map((service, index) => (
          <div
            key={index}
            className={`flex flex-col rounded-2xl text-dark-blue text-start bg-${service.color} bg-yellow-card p-2 space-y-3 $ `}
          >
            <h3 className="text-xl font-semibold ">{service.title}</h3>
            <p className="font-normal">{service.description}</p>
            <div className={`flex-1 flex justify-end items-center ${service.color === 'blue-card' ? 'mb-7' : ''}`}>
              <div className='text-white bg-dark-blue rounded-full w-fit p-2'>
                <FaArrowRight />
              </div>
              <Image
                src={service.image}
                alt={service.title}
                width={100}
                height={100}
                className="ml-auto justify-self-end"
              />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
