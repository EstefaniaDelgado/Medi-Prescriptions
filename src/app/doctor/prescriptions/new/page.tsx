"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaSearch, FaPlus, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";
import Modal from "../../../components/Modal";
import { useCreatePrescriptionMutation } from "@/src/redux/services/prescriptionsApi";
import { useGetPatientsQuery } from "@/src/redux/services/patientsApi";
import { CreatePrescriptionDto } from "@/src/types/prescription/prescription.dto";

interface PrescriptionItem {
  id: number;
  name: string;
  dosage: string;
  quantity: number;
  instructions: string;
}

export default function NuevaPrescripcion() {
  const router = useRouter();
  const [createPrescription, { isLoading }] = useCreatePrescriptionMutation();
  const { data: patientsData } = useGetPatientsQuery({ limit: 100 });
  console.log("info", patientsData)
  const [items, setItems] = useState<PrescriptionItem[]>([]);
  const [notes, setNotes] = useState("");
  const [formData, setFormData] = useState({
    nombre: "",
    dosis: "",
    cantidad: "",
    instrucciones: "",
    pacienteId: "",
  });
  const [busquedaPaciente, setBusquedaPaciente] = useState("");
  const [mostrarListaPacientes, setMostrarListaPacientes] = useState(false);
  const [modalEliminar, setModalEliminar] = useState<{
    isOpen: boolean;
    itemId: number | null;
    itemNombre: string;
  }>({
    isOpen: false,
    itemId: null,
    itemNombre: "",
  });

  const pacientes = useMemo(
    () => patientsData?.data || [],
    [patientsData?.data]
  );

  const pacientesFiltrados = useMemo(() => {
    if (!busquedaPaciente) return pacientes;
    return pacientes.filter(
      (paciente) =>
        paciente.user.name
          .toLowerCase()
          .includes(busquedaPaciente.toLowerCase()) ||
        paciente.user.email
          .toLowerCase()
          .includes(busquedaPaciente.toLowerCase())
    );
  }, [busquedaPaciente, pacientes]);

  const pacienteSeleccionado = pacientes.find(
    (p) => p.id === formData.pacienteId
  );

  const agregarItem = () => {
    if (
      formData.nombre &&
      formData.dosis &&
      formData.cantidad &&
      formData.instrucciones
    ) {
      const nuevoItem = {
        id: Date.now(),
        name: formData.nombre,
        dosage: formData.dosis,
        quantity: parseInt(formData.cantidad),
        instructions: formData.instrucciones,
      };
      setItems((prev) => [...prev, nuevoItem]);
      setFormData((prev) => ({
        ...prev,
        nombre: "",
        dosis: "",
        cantidad: "",
        instrucciones: "",
      }));
      setNotes("");
      toast.success("Item agregado");
    } else {
      toast.error("Complete todos los campos del item");
    }
  };

  const confirmarEliminar = (id: number, nombre: string) => {
    setModalEliminar({ isOpen: true, itemId: id, itemNombre: nombre });
  };

  const eliminarItem = () => {
    setItems((prev) => prev.filter((item) => item.id !== modalEliminar.itemId));
    setModalEliminar({ isOpen: false, itemId: null, itemNombre: "" });
    toast.success("Item eliminado");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.error("Debe agregar al menos un item");
      return;
    }
    if (!formData.pacienteId) {
      toast.error("Debe seleccionar un paciente");
      return;
    }

    const prescriptionData: CreatePrescriptionDto = {
      patientId: formData.pacienteId,
      items: items.map((item) => ({
        name: item.name,
        dosage: item.dosage,
        quantity: item.quantity,
        instructions: item.instructions,
      })),
      notes: notes || undefined,
    };

    try {
      await createPrescription(prescriptionData).unwrap();
      toast.success("Prescripción creada exitosamente");
      router.push("/doctor/prescriptions");
    } catch (error) {
      toast.error("Error al crear la prescripción");
      console.error("Error:", error);
    }
  };

  const seleccionarPaciente = (paciente: (typeof pacientes)[0]) => {
    setFormData((prev) => ({ ...prev, pacienteId: paciente.id }));
    setBusquedaPaciente(paciente.user.name);
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
                    setFormData((prev) => ({ ...prev, pacienteId: "" }));
                  }
                }}
                onFocus={() => setMostrarListaPacientes(true)}
                className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-xs md:placeholder:text-sm placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Buscar paciente por nombre o email"
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
                      <div className="font-medium">{paciente.user.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Email: {paciente.user.email}
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
                  <strong>Paciente seleccionado:</strong>{" "}
                  {pacienteSeleccionado.user.name} - Email:{" "}
                  {pacienteSeleccionado.user.email}
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
                    <span className="font-medium">{item.name}</span>
                    <button
                      type="button"
                      onClick={() => confirmarEliminar(item.id, item.name)}
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
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-dark-blue dark:text-blue mb-4">
              Agregar Item
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Medicamento
                </label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, nombre: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nombre del medicamento"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Dosis
                </label>
                <input
                  type="text"
                  value={formData.dosis}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, dosis: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ej: 500mg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Cantidad
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.cantidad}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      cantidad: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Cantidad"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Instrucciones
                </label>
                <input
                  type="text"
                  value={formData.instrucciones}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      instrucciones: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ej: Cada 8 horas"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={agregarItem}
              className="mt-4 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              <FaPlus size={14} />
              Agregar Item
            </button>
          </div>

          {/* Notas */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Notas (Opcional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Notas adicionales sobre la prescripción..."
            />
          </div>

          {/* Botones */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading || items.length === 0}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              {isLoading ? "Creando..." : "Crear Prescripción"}
            </button>
          </div>
        </form>
      </div>

      {/* Modal de confirmación */}
      <Modal
        isOpen={modalEliminar.isOpen}
        onClose={() =>
          setModalEliminar({ isOpen: false, itemId: null, itemNombre: "" })
        }
        onConfirm={eliminarItem}
        title="Eliminar Item"
        message={`¿Está seguro que desea eliminar el item "${modalEliminar.itemNombre}"?`}
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </div>
  );
}
