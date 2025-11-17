# Plan de Implementación - Play2Learn Frontend

Este documento describe la arquitectura técnica completa, organización del código, flujo de datos, y prácticas de desarrollo para el frontend de Play2Learn (React + TypeScript + Vite).

## 📋 Tabla de Contenidos

1. [Arquitectura Técnica](#arquitectura-técnica)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [Módulos Principales](#módulos-principales)
4. [Sistema de Autenticación y Roles](#sistema-de-autenticación-y-roles)
5. [Routing y Navegación](#routing-y-navegación)
6. [Gestión de Estado](#gestión-de-estado)
7. [Componentes Compartidos](#componentes-compartidos)
8. [Testing Strategy](#testing-strategy)
9. [Deployment](#deployment)
10. [Code Quality](#code-quality)

---

## 🏗️ Arquitectura Técnica

### System Overview

**Play2Learn** es una SPA (Single Page Application) educativa construida con:

- **Framework**: React 19.1.0
- **Build Tool**: Vite 6.3.5
- **Lenguaje**: TypeScript 5.8.3
- **Routing**: React Router DOM 7.6.2
- **Animaciones**: Framer Motion 12.18.1
- **HTTP Client**: Axios 1.10.0
- **Testing**: Vitest 3.2.4

### Arquitectura de Aplicación Multi-Rol

La aplicación se estructura en **tres aplicaciones separadas** según el rol del usuario:

```
App.tsx
  └── AppShell.tsx (Router + Auth Check)
      ├── AdminApp.tsx (ROLE_ADMIN)
      ├── TeacherApp.tsx (ROLE_TEACHER)
      └── StudentApp.tsx (ROLE_STUDENT)
```

Cada aplicación tiene su propio conjunto de:

- **Providers** (Context API)
- **Routes** (React Router)
- **Views** (Páginas/Vistas)
- **Componentes** específicos del rol

### Component Design Pattern

El proyecto sigue un patrón de organización por **dominio/funcionalidad**:

```
src/
├── [module]/
│   ├── components/     # Componentes UI específicos
│   ├── views/          # Vistas/páginas principales
│   ├── hooks/          # Custom hooks
│   ├── contexts/       # Context API providers
│   ├── services/       # Llamadas a API
│   ├── types/          # TypeScript types
│   ├── utils/          # Utilidades del módulo
│   └── constants/      # Constantes
```

---

## 📁 Estructura del Proyecto

### Directorio Raíz `src/`

```
src/
├── activity/           # Módulo de actividades educativas (juegos)
├── admin/             # Módulo de administración
├── apps/              # Aplicaciones por rol (AdminApp, TeacherApp, StudentApp)
├── App.tsx            # Componente raíz con routing global
├── AppShell.tsx       # Shell que decide qué app cargar según rol
├── benefit/           # Módulo de beneficios
├── investments/       # Módulo de inversiones (Plazo Fijo, Acciones)
├── main.tsx           # Entry point de la aplicación
├── shared/            # Código compartido entre módulos
├── student/           # Módulo de estudiante
├── teacher/           # Módulo de profesor
├── user/              # Módulo de autenticación/usuarios
└── test/              # Tests
```

---

## 🎯 Módulos Principales

### 1. **Activity Module** (`src/activity/`)

**Propósito**: Gestión de actividades educativas interactivas (juegos).

**Tipos de Actividades**:

- Ahorcado
- Árbol de Decisión
- Completar Oración
- Desafío de Clasificación
- Memorama
- No Lúdica
- Ordenar Secuencia
- Preguntados

**Estructura**:

```
activity/
├── components/        # Componentes de creación/configuración
├── contexts/         # Context providers por tipo de actividad
├── hooks/            # Hooks de creación y configuración
├── services/         # Servicios API por tipo de actividad
├── types/            # Types específicos de cada actividad
├── utils/            # Utilidades (mapeo de componentes, datos)
└── views/            # Vistas de creación y configuración
```

**Flujo**:

1. Profesor crea/configura actividad → `create*View` o `configurationView`
2. Estudiante juega actividad → Componentes de juego en `shared/components/Games/`
3. Sistema registra resultados → Context API + Services

### 2. **Admin Module** (`src/admin/`)

**Propósito**: Panel de administración para gestión de entidades del sistema.

**Entidades Gestionadas**:

- Cursos (Courses)
- Estudiantes (Students)
- Materias (Subjects)
- Profesores (Teachers)
- Años (Years)
- Estadísticas (Statistics)

**Estructura**:

```
admin/
├── components/        # Componentes UI (Sidebar, Overview)
├── contexts/         # Context providers por entidad
├── hooks/            # Custom hooks (useCourse, useStudent, etc.)
├── pages/            # Dashboard principal
├── routes/           # Definición de rutas
├── services/         # Servicios API
├── types/            # Types de estadísticas
└── views/            # Vistas CRUD (List, Create)
```

**Patrón CRUD**:

- `List*View`: Lista paginada con filtros
- `Create*View`: Formulario de creación/edición (reutilizable)

### 3. **Student Module** (`src/student/`)

**Propósito**: Experiencia del estudiante (actividades, wallet, beneficios, tienda, inversiones).

**Funcionalidades**:

- Dashboard/Overview
- Actividades (listar, jugar, revisar completadas)
- Perfil y Avatar
- Wallet (balance, transacciones)
- Beneficios
- Tienda (Store)
- Ranking
- Educación Financiera
- Inversiones (Acciones, Plazo Fijo)

**Estructura**:

```
student/
├── adapters/         # Adaptadores de datos
├── components/       # Componentes UI específicos
├── constants/        # Constantes
├── context/          # Context providers (CurrentStudent, Wallet, Activity, etc.)
├── hooks/            # Custom hooks
├── pages/            # Dashboard
├── routes/           # Rutas del estudiante
├── services/         # Servicios API
├── types/            # Types
├── utils/            # Utilidades
└── views/            # Vistas principales
```

### 4. **Teacher Module** (`src/teacher/`)

**Propósito**: Panel del profesor para crear actividades y gestionar beneficios.

**Funcionalidades**:

- Dashboard/Overview
- Crear/Configurar Actividades
- Gestionar Beneficios (listar, crear)
- Estadísticas

**Estructura**:

```
teacher/
├── components/       # Componentes UI
├── constants/        # Constantes
├── contexts/         # Context providers (Benefits, Statistics)
├── hooks/            # Custom hooks
├── pages/            # Dashboard
├── routes/           # Rutas
├── services/         # Servicios API
├── types/            # Types
├── utils/            # Utilidades
└── views/            # Vistas (Activities, Benefits, Overview)
```

### 5. **Investments Module** (`src/investments/`)

**Propósito**: Sistema de inversiones (Plazo Fijo y Acciones).

**Funcionalidades**:

- Vista de inversiones (overview)
- Plazo Fijo (crear, listar, filtrar por estado)
- Acciones (listar, ver detalles)

**Estructura**:

```
investments/
├── components/       # Componentes (PlazoFijoView, ActionsView, etc.)
├── contexts/         # Context providers (PlazoFijo, Actions)
├── hooks/            # Custom hooks (usePlazoFijo, useActions)
├── services/         # Servicios API
├── types/            # Types (plazoFijo, actions)
├── utils/            # Utilidades
└── views/            # Vistas principales
```

**Flujo Plazo Fijo**:

1. Estudiante ve lista → `PlazoFijoView`
2. Filtra por estado → `PlazoFijoFilter` → actualiza `paginationParams`
3. Crea nuevo plazo fijo → `CreatePlazoFijoForm` → `registerPlazoFijo`
4. Sistema refresca lista manteniendo filtros

### 6. **User Module** (`src/user/`)

**Propósito**: Autenticación y gestión de usuarios.

**Estructura**:

```
user/
├── contexts/         # UserContext (auth state)
├── hooks/            # useAuth
├── pages/            # LoginPage
└── services/         # Servicios de autenticación
```

### 7. **Shared Module** (`src/shared/`)

**Propósito**: Código reutilizable entre módulos.

**Componentes**:

- UI básicos: `Button`, `Input`, `Card`, `DataTable`, `Pagination`
- Juegos: `AhorcadoGame`, `CompletarOracionGame`, `PreguntadosGame`, etc.
- Utilidades: `LoadingSpinner`, `Toaster`, `ConfirmationModal`, `Tooltip`

**Hooks**:

- `usePaginateParams`: Gestión de paginación, filtros, búsqueda, ordenamiento
- `useHandleApiError`: Manejo centralizado de errores API
- `useToaster`: Notificaciones toast
- `useConfirmation`: Modales de confirmación
- Hooks de juegos: `useAhorcadoGame`, `usePreguntadosGame`, etc.

**Contexts**:

- `ToasterProvider`: Notificaciones globales
- `ConfirmationProvider`: Modales de confirmación
- `GamesContext`: Estados de juegos (por tipo)

**Utils**:

- `api.ts`, `apiAuth.ts`, `apiFormData.ts`: Clientes HTTP
- `ProtectedRoute.tsx`: Protección de rutas por rol
- `createFilterHandler.ts`: Utilidad para filtros

**Registry/Strategies**:

- Sistema de registro de juegos y renderers configurables
- Patrón Strategy para renderizado de configuraciones de juegos

---

## 🔐 Sistema de Autenticación y Roles

### Roles Disponibles

```typescript
type Role = "ROLE_ADMIN" | "ROLE_TEACHER" | "ROLE_STUDENT";
```

### Flujo de Autenticación

1. **Login** (`/login`) → `LoginPage`
2. **Verificación** → `UserProvider` valida token/credenciales
3. **Routing** → `AppShell` redirige según rol:
   - `ROLE_ADMIN` → `/dashboard/*` → `AdminApp`
   - `ROLE_TEACHER` → `/dashboard/teacher/*` → `TeacherApp`
   - `ROLE_STUDENT` → `/dashboard/student/*` → `StudentApp`

### Protección de Rutas

`ProtectedRoute` verifica:

- Autenticación (`isAuthenticated`)
- Rol permitido (`allowedRoles`)
- Muestra loading durante verificación

---

## 🗺️ Routing y Navegación

### Estructura de Rutas

#### Admin Routes (`/dashboard/*`)

```
/dashboard/overview
/dashboard/courses/list
/dashboard/courses/create
/dashboard/courses/edit/:id
/dashboard/students/list
/dashboard/students/create
/dashboard/students/edit/:id
/dashboard/subjects/list
/dashboard/subjects/create
/dashboard/subjects/edit/:id
/dashboard/teachers/list
/dashboard/teachers/create
/dashboard/teachers/edit/:id
/dashboard/years/list
/dashboard/years/create
/dashboard/years/edit/:id
```

#### Teacher Routes (`/dashboard/teacher/*`)

```
/dashboard/teacher/overview
/dashboard/teacher/actividades/list
/dashboard/teacher/actividades/configuration/:code_game
/dashboard/teacher/actividad/configuration/:code_game
/dashboard/teacher/beneficio/list
/dashboard/teacher/beneficio/create
```

#### Student Routes (`/dashboard/student/*`)

```
/dashboard/student/overview
/dashboard/student/profile
/dashboard/student/profile/avatar
/dashboard/student/wallet
/dashboard/student/actividades/list
/dashboard/student/actividades/:id/view
/dashboard/student/actividades/:id/play
/dashboard/student/actividades/:id/review
/dashboard/student/beneficios/list
/dashboard/student/store
/dashboard/student/ranking/list
/dashboard/student/wallet/financial-education
/dashboard/student/investmests/list
/dashboard/student/actions/list
/dashboard/student/actions/details/:id
/dashboard/student/plazo-fijo/list
```

### Navegación con Animaciones

Todas las apps usan `framer-motion` para transiciones:

- `AnimatePresence` para transiciones entre rutas
- `motion.div` con `initial`, `animate`, `exit` para efectos

---

## 🗄️ Gestión de Estado

### Context API Pattern

Cada módulo usa **Context API** para estado compartido:

**Estructura típica**:

```
contexts/
├── [Entity]Context.ts          # Definición del contexto
├── [Entity]Context.type.ts      # Types del contexto
└── [Entity]Provider.tsx        # Provider component
```

**Ejemplo: PlazoFijoContext**

```typescript
// Estado
- loading: boolean
- plazoFijos: PaginatedData<PlazoFijoResponse> | null
- statistics: StatisticsPlazoFijoResponse | null

// Acciones
- getPaginatedPlazoFijo(params)
- registerPlazoFijo(data)
- getStatisticsPlazoFijo()
```

### Custom Hooks Pattern

Los hooks exponen la lógica de negocio y estado:

**Ejemplo: `usePlazoFijoView`**

```typescript
const {
  // Paginación
  paginationParams,
  paginationInfo,
  handlePageChange,
  handlePageSizeChange,
  handleFilter,

  // Datos
  plazoFijos,
  statistics,
  userBalance,

  // Acciones
  handleCreatePlazoFijo,
  filterStatus,
  setFilterStatus,
} = usePlazoFijoView();
```

### Paginación Unificada

`usePaginateParams` gestiona:

- `page`, `page_size`
- `order_by`, `order_type`
- `search`
- `filters`, `filtersValues`

**Handlers**:

- `handlePageChange(page)`
- `handlePageSizeChange(size)`
- `handleSort(column)`
- `handleSearch(value)`
- `handleFilter(filters, values)`

---

## 🧩 Componentes Compartidos

### UI Components (`shared/components/`)

**Formularios**:

- `Input`, `TextArea`, `BooleanInput`, `Label`

**Layout**:

- `Card`, `FlexBox`, `Badge`

**Navegación**:

- `Pagination`, `PaginateComponent`

**Feedback**:

- `LoadingSpinner`, `Toaster`, `ConfirmationModal`, `Tooltip`

**Tablas**:

- `DataTable` (con paginación, ordenamiento, filtros)

**Juegos** (`shared/components/Games/`):

- `AhorcadoGame`, `CompletarOracionGame`, `PreguntadosGame`, etc.

### Patrón de Componentes

**Estructura típica**:

```
ComponentName/
├── ComponentName.tsx
├── ComponentName.module.css
└── index.ts (opcional)
```

**Props tipadas con TypeScript**:

```typescript
type Props = {
  // Props aquí
};

const ComponentName = ({ ...props }: Props) => {
  // Implementación
};
```

---

## 🧪 Testing Strategy

### Configuración

- **Framework**: Vitest 3.2.4
- **UI Testing**: @testing-library/react 16.3.0
- **DOM Testing**: @testing-library/jest-dom 6.7.0

### Estructura de Tests

```
test/
├── admin/            # Tests de módulo admin
├── student/          # Tests de módulo student
└── setupTests.ts     # Configuración global
```

### Tipos de Tests

1. **Unit Tests**: Hooks, utils, funciones puras
2. **Component Tests**: Componentes UI aislados
3. **Integration Tests**: Flujos completos (ej: crear plazo fijo → refrescar lista)

### Ejecución

```bash
npm test              # Ejecutar tests
npm test --ui         # UI de Vitest
```

---

## 🚀 Deployment

### Build Process

```bash
npm run build        # TypeScript check + Vite build
```

**Output**: `dist/` (archivos estáticos)

### Docker

**Dockerfile** multi-stage:

1. **Build**: Node 18 → Instalar dependencias → `npm run build`
2. **Serve**: Node 16 → Instalar `serve` → Servir `dist/` en puerto 3000

### Environment Variables

Variables esperadas (`.env`):

```
VITE_API_BASE_URL=https://api.example.com
```

### Hosting

Artefactos estáticos pueden desplegarse en:

- **Netlify**
- **Vercel**
- **AWS S3 + CloudFront**
- **Docker container** (con `serve`)

---

## 📝 Code Quality

### TypeScript

- **Strict Mode**: Habilitado
- **Tipos explícitos**: En props, funciones públicas, contextos
- **Evitar `any`**: Usar `unknown` o tipos específicos

### Linting

- **ESLint 9.25.0** con plugins:
  - `eslint-plugin-react-hooks`
  - `eslint-plugin-react-refresh`
  - `typescript-eslint`

**Ejecución**:

```bash
npm run lint
```

### Estilo de Código

**Naming Conventions**:

- Componentes: `PascalCase` (ej: `PlazoFijoView`)
- Hooks: `camelCase` con prefijo `use` (ej: `usePlazoFijoView`)
- Types: `PascalCase` con sufijo `.type.ts` (ej: `plazoFijo.type.ts`)
- Utils: `camelCase` (ej: `createFilterHandler`)

**Organización de Imports**:

1. React/React DOM
2. Librerías externas
3. Imports internos (shared primero, luego módulos)
4. Types
5. Estilos

**Ejemplo**:

```typescript
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { usePlazoFijoView } from "../../hooks/usePlazoFijo/usePlazoFijoView";
import type { FIXED_TERM_STATES } from "../../types/plazoFijo.type";
import styles from "./PlazoFijoView.module.css";
```

### Best Practices

1. **Memoización**:

   - `useMemo` para cálculos costosos
   - `useCallback` para handlers pasados como props

2. **Dependencias de Efectos**:

   - Incluir todas las dependencias en arrays de `useEffect`
   - Evitar dependencias faltantes (causa bugs)

3. **Accesibilidad**:

   - `aria-label`, `aria-pressed` en botones
   - `role` en contenedores semánticos
   - `type="button"` en botones no-submit

4. **Manejo de Errores**:

   - Usar `useHandleApiError` para errores API
   - Mostrar feedback con `useToaster`

5. **Loading States**:
   - Mostrar `LoadingSpinner` durante operaciones async
   - Deshabilitar botones durante submit

---

## 🔄 Flujos Principales

### Flujo: Jugar Actividad

1. Estudiante selecciona actividad → `StudentActivitiesView`
2. Click "Jugar" → Navega a `StudentPlayActivityView`
3. Carga juego → Componente de juego (`AhorcadoGame`, etc.)
4. Usuario completa → Submit resultados
5. Sistema registra → Actualiza wallet/balance
6. Redirige a review → `StudentCompletedActivityView`

### Flujo: Crear Actividad (Profesor)

1. Profesor navega a actividades → `ActivitiesView`
2. Selecciona tipo → Navega a `ConfigureActivityView`
3. Completa configuración → Submit
4. Sistema crea actividad → Disponible para estudiantes

---

## 🎯 Próximos Pasos / Mejoras Sugeridas

1. **Testing**: Aumentar cobertura de tests (especialmente hooks y flujos críticos)
2. **Performance**: Implementar React.memo en componentes pesados
3. **Error Boundaries**: Añadir error boundaries para capturar errores de render
4. **Documentación**: Añadir JSDoc a funciones/hooks públicos
5. **Type Safety**: Revisar y fortalecer tipos en servicios API

---

**Última actualización**: 2025-11-06
