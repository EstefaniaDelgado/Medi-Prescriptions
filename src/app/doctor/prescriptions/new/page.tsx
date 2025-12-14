'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaSearch, FaPlus, FaTimes } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import Modal from '../../../components/Modal';

const PACIENTES = [
  { id: 1, nombre: 'Juan Pérez', cedula: '12345678' },
  { id: 2, nombre: 'María García', cedula: '87654321' },
  { id: 3, nombre: 'Carlos López', cedula: '11223344' },
  { id: 4, nombre: 'Ana Martínez', cedula: '44332211' },
  { id: 5, nombre: 'Pedro González', cedula: '55667788' },
  { id: 6, nombre: 'Laura Rodríguez', cedula: '99887766' },
];

export default function NuevaPrescripcion() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    dosis: '',
    cantidad: '',
    instrucciones: '',
    pacienteId: '',
  });
  const [busquedaPaciente, setBusquedaPaciente] = useState('');
  const [mostrarListaPacientes, setMostrarListaPacientes] = useState(false);
  const [modalEliminar, setModalEliminar] = useState({ isOpen: false, itemId: null, itemNombre: '' });

  const pacientesFiltrados = useMemo(() => {
    return PACIENTES.filter(
      (paciente) =>
        paciente.nombre
          .toLowerCase()
          .includes(busquedaPaciente.toLowerCase()) ||
        paciente.cedula.includes(busquedaPaciente)
    );
  }, [busquedaPaciente]);

  const pacienteSeleccionado = PACIENTES.find(
    (p) => p.id.toString() === formData.pacienteId
  );

  const agregarItem = () => {
    if (formData.nombre && formData.dosis && formData.cantidad && formData.instrucciones) {
      const nuevoItem = {
        id: Date.now(),
        nombre: formData.nombre,
        dosis: formData.dosis,
        cantidad: formData.cantidad,
        instrucciones: formData.instrucciones
      };
      setItems(prev => [...prev, nuevoItem]);
      setFormData(prev => ({
        ...prev,
        nombre: '',
        dosis: '',
        cantidad: '',
        instrucciones: ''
      }));
      toast.success('Item agregado');
    } else {
      toast.error('Complete todos los campos del item');
    }
  };

  const confirmarEliminar = (id, nombre) => {
    setModalEliminar({ isOpen: true, itemId: id, itemNombre: nombre });
  };

  const eliminarItem = () => {
    setItems(prev => prev.filter(item => item.id !== modalEliminar.itemId));
    setModalEliminar({ isOpen: false, itemId: null, itemNombre: '' });
    toast.success('Item eliminado');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.error('Debe agregar al menos un item');
      return;
    }
    if (!formData.pacienteId) {
      toast.error('Debe seleccionar un paciente');
      return;
    }
    
    console.log('Prescripción creada:', { paciente: formData.pacienteId, items });

    toast.success('Prescripción creada exitosamente', {
      duration: 2000,
      position: 'top-center',
    });

    setTimeout(() => {
      router.push('/doctor');
    }, 2000);
  };

  const seleccionarPaciente = (paciente: (typeof PACIENTES)[0]) => {
    setFormData((prev) => ({ ...prev, pacienteId: paciente.id.toString() }));
    setBusquedaPaciente(paciente.nombre);
    setMostrarListaPacientes(false);
  };

  return (
    <div className="card-container-inner p-6 max-w-2xl">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <FaArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-dark-blue dark:text-blue">
            Nueva Prescripción
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Paciente
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={busquedaPaciente}
                onChange={(e) => {
                  setBusquedaPaciente(e.target.value);
                  setMostrarListaPacientes(true);
                  if (!e.target.value) {
                    setFormData((prev) => ({ ...prev, pacienteId: '' }));
                  }
                }}
                onFocus={() => setMostrarListaPacientes(true)}
                className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-xs md:placeholder:text-sm placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Buscar paciente por nombre o cédula"
              />
              <FaSearch
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
            </div>

            {mostrarListaPacientes && busquedaPaciente && (
              <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-48 overflow-y-auto">
                {pacientesFiltrados.length > 0 ? (
                  pacientesFiltrados.map((paciente) => (
                    <button
                      key={paciente.id}
                      type="button"
                      onClick={() => seleccionarPaciente(paciente)}
                      className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600 last:border-b-0"
                    >
                      <div className="font-medium">{paciente.nombre}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Cédula: {paciente.cedula}
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-3 py-2 text-gray-500 dark:text-gray-400">
                    No se encontraron pacientes
                  </div>
                )}
              </div>
            )}

            {pacienteSeleccionado && (
              <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Paciente seleccionado:</strong>{' '}
                  {pacienteSeleccionado.nombre} - Cédula:{' '}
                  {pacienteSeleccionado.cedula}
                </div>
              </div>
            )}
          </div>

          {/* Items Agregados */}
          {items.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-dark-blue dark:text-blue mb-3">
                Items Agregados ({items.length})
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-3 py-2 rounded-full text-sm flex items-center gap-2"
                  >
                    <span className="font-medium">{item.nombre}</span>
                    
                    <button
                      type="button"
                      onClick={() => confirmarEliminar(item.id, item.nombre)}
                      className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 ml-1"
                      title="Eliminar item"
                    >
                      <FaTimes size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sección de Items */}
          <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-dark-blue dark:text-blue">
                {items.length === 0 ? 'Agregar Item' : 'Agregar Otro Item'}
              </h3>
              <button
                type="button"
                onClick={agregarItem}
                className="btn-primary px-4 py-2 text-sm flex items-center gap-2"
              >
                <FaPlus size={12} />
                Agregar
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nombre del Item
                </label>
                <input
                  type="text"
                  required
                  value={formData.nombre}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, nombre: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-xs md:placeholder:text-sm placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ej: Ibuprofeno"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Dosis
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.dosis}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, dosis: e.target.value }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-xs md:placeholder:text-sm placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ej: 400mg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Cantidad
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.cantidad}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, cantidad: e.target.value }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-xs md:placeholder:text-sm placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ej: 20 tabletas"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Instrucciones
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.instrucciones}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      instrucciones: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-xs md:placeholder:text-sm placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Ej: Tomar 1 tableta cada 8 horas después de las comidas"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 font-medium"
            >
              Cancelar
            </button>
            <button type="submit" className="flex-1 btn-primary px-4 py-2">
              Crear Prescripción
            </button>
          </div>
        </form>
      </div>
      
      <Modal
        isOpen={modalEliminar.isOpen}
        onClose={() => setModalEliminar({ isOpen: false, itemId: null, itemNombre: '' })}
        onConfirm={eliminarItem}
        title="Eliminar Item"
        message={`¿Está seguro de que desea eliminar "${modalEliminar.itemNombre}"?`}
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
      
      <Toaster />
    </div>
  );
}
