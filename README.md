# Frontend – App de Prescripciones Médicas

Aplicación frontend desarrollada como parte de una prueba técnica full-stack.  
Permite a **médicos**, **pacientes** y **administradores** interactuar con el sistema de prescripciones a través de una interfaz moderna, responsiva y protegida por roles.

---

## 🧩 Stack Tecnológico

- Next.js v.16 (App Router)
- React
- TypeScript
- Tailwind CSS
- Redux (manejo de estado)
- Fetch API
- Recharts (dashboard Admin)

---

## 🎯 Descripción General

El frontend consume la API desarrollada en NestJS y presenta flujos diferenciados según el rol del usuario autenticado.

### Roles y Funcionalidades

- **Doctor**
  - Crear prescripciones para pacientes
  - Agregar y eliminar ítems dinámicamente
  - Listar y ver el detalle de sus prescripciones
  - Filtrar por estado y fecha

- **Patient**
  - Visualizar sus prescripciones
  - Marcar prescripciones como consumidas
  - Descargar prescripciones en PDF

- **Admin**
  - Visualizar métricas generales
  - Dashboard con tarjetas y gráficos
  - Acceso completo a la información

---

## 📁 Estructura del Proyecto

src/
├── app/
│ ├── login/
│ ├── doctor/
│ │ └── prescriptions/
│ │ ├── page.tsx
│ │ ├── new/
│ │ └── [id]/
│ ├── patient/
│ │ └── prescriptions/
│ │ ├── page.tsx
│ │ └── [id]/
│ └── admin/
│ └── page.tsx
├── components/
├── lib/
│ ├── fetcher.ts
│ ├── auth.ts
│ └── guards.ts
├── store/
└── styles/


---

## ⚙️ Variables de Entorno

Crear un archivo `.env.local` en la raíz del proyecto:

    NEXT_PUBLIC_API_BASE_URL=http://localhost:3001

---

## 🚀 Instalación y Ejecución Local

### 1. Instalar dependencias

Instalar todas las dependencias del proyecto:

    npm install

---

### 2. Levantar el servidor en desarrollo

Iniciar la aplicación en modo desarrollo:

    npm run dev

La aplicación estará disponible en:

    http://localhost:3000

---

## 🔐 Autenticación y Protección de Rutas

La aplicación implementa autenticación basada en JWT, gestionada mediante cookies seguras desde el backend.

- El login obtiene el perfil y rol del usuario.
- El estado de autenticación se maneja de forma global.
- Las rutas están protegidas según el rol del usuario.
- Si un usuario intenta acceder a una ruta no autorizada, es redirigido automáticamente al login.

Este enfoque garantiza que:
- Un Doctor no pueda acceder a vistas de Admin.
- Un Patient solo vea sus propias prescripciones.
- El Admin tenga acceso completo al sistema.

---

## 📄 Manejo de Prescripciones

- Listados con paginación y filtros.
- Estados visuales para carga, error y datos vacíos.
- Acciones claras mediante botones y feedback visual.
- Descarga directa de PDFs desde la vista del paciente.

---

## 📊 Dashboard de Administración

El panel de administración incluye:

- Total de médicos, pacientes y prescripciones.
- Prescripciones por estado (pending / consumed).
- Serie temporal de prescripciones por día.
- Visualización mediante gráficos simples y claros.

---

## 🎨 UX / UI

- Diseño responsive (desktop y mobile).
- Uso de Tailwind CSS para consistencia visual.
- Estados de carga y error bien definidos.
- Toasts para acciones importantes (crear, consumir, error).
- Persistencia de filtros mediante query params.
- Tema dark/light y preferencia persistida.

---

## 🧪 Testing

El proyecto incluye pruebas básicas de componentes y lógica crítica.

Comando para ejecutar tests:

    npm run test

---

## 📌 Notas Finales

- La aplicación asume usuarios creados mediante seed en el backend.
- No existe catálogo de productos; los ítems se ingresan manualmente.
- El frontend está diseñado como un MVP, priorizando claridad, mantenibilidad y experiencia de usuario.

---

## 📜 Licencia

Proyecto desarrollado como prueba técnica full-stack.
