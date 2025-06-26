# 🧠 Sistema de Gestión de Proyectos - Fullstack App

Plataforma web completa para la gestión de proyectos de desarrollo de software. Permite crear y administrar proyectos, asignar desarrolladores, hacer seguimiento de tareas, recibir notificaciones en tiempo real y generar reportes.

## 🛠️ Stack Tecnológico

| Parte       | Tecnología                  |
| ----------- |-----------------------------|
| Frontend    | React + Vite + TypeScript   |
| Backend     | NestJS + MongoDB + Mongoose |
| Auth        | JWT + Refresh Token         |
| Tiempo Real | Socket.IO                   |
| Estilos     | Bootstrap                     |
| CI/CD       | GitHub Actions              |
| BD          | MongoDB Atlas               |
| Deploy FE   | Vercel                      |
| Deploy BE   | Render                      |

---

## ✨ Deploy

* 🌐 **Frontend (Vercel)**: [https://pms-frontend-casv.vercel.app](https://pms-frontend-casv.vercel.app)
* 🔗 **Backend (Render)**: [https://pms-backend-casv.onrender.com](https://pms-backend-casv.onrender.com)
* 📡 **API Docs Swagger**: [https://pms-backend-casv.onrender.com/api](https://pms-backend-casv.onrender.com/api)

---

## 🔐 Credenciales de prueba

| Rol       | Email                                       | Contraseña |
| --------- | ------------------------------------------- | ---------- |
| Admin     | [admin@test.com](mailto:admin@test.com)     | admin123   |
| Manager   | [manager@test.com](mailto:manager@test.com) | manager123 |
| Developer | [dev@test.com](mailto:dev@test.com)         | dev123     |

---

## 📁 Estructura del Proyecto

```
.
├── frontend/          # React + Vite (TS)
│   ├── src/
│   └── Dockerfile
├── backend/           # NestJS + MongoDB
│   ├── src/
│   └── Dockerfile
├── docker-compose.yml
├── .github/workflows/
│   ├── deploy.yml
└── README.md
```

---

## ✨ Funcionalidades Principales

### ✅ Autenticación y Roles

* Registro/Login con JWT + Refresh Tokens
* Control de acceso por rol: Admin, Manager, Developer
* Middleware de autorización

### 📦 Gestión de Proyectos

* Crear, ver, actualizar, eliminar proyectos
* Asignación de desarrolladores
* Filtros por estado, prioridad, fecha
* Soft delete

### 📋 Gestión de Tareas

* Board estilo Kanban (TODO, IN PROGRESS, REVIEW, DONE)
* Estimaciones y seguimiento de horas
* Calendario de tareas
* Filtros por prioridad, asignado, estado

### 👥 Gestión de Usuarios

* Crear/editar usuarios
* Asignación a proyectos (solo Admin/Manager)

### 📡 Tiempo Real

* Notificaciones de asignación y cambios
* Actualización en vivo del board Kanban
* Chat de proyecto (opcional)

---

## ⚙️ Instalación local

### 1. Clonar repositorio

```bash
git clone https://github.com/CamiloSoto/project-management-system
cd gestor-proyectos
```

### 2. Variables de Entorno

#### 📄 Backend `.env`

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/mt_dev
JWT_SECRET=secret_token
JWT_EXPIRATION=8h
JWT_REFRESH_SECRET=secret_refresh_token
JWT_REFRESH_EXPIRATION=7d
```

#### 🌐 Frontend `.env`

```env
VITE_API_URL=http://127.0.0.1:3000
```

### 3. Levantar en desarrollo

```bash
# Desde raíz del proyecto
docker-compose up --build
```

---

## 🧪 Testing

### 📦 Backend (NestJS)

```bash
cd backend
npm install
npm run test
```

### 💻 Frontend (React)

```bash
cd frontend
npm install
npm run test
```

---

## ⚙️ CI/CD - GitHub Actions

### 🔁 FullStack (`.github/workflows/deploy.yml`)

* Instalación, build y tests Backend
* Deploy automático a Render Backend
* Instalación, build y tests Frontend

---

## 🐳 Docker y Docker Compose

### 📄 `docker-compose.yml`

```yaml
version: '3'
services:
  backend:
    build: ./backend
    ports:
      - "3000:3000"
    environment:
      - MONGO_URI=...
  frontend:
    build: ./frontend
    ports:
      - "5173:80"
```

---

## 📊 Extras implementados (Plus)

* [ ] Dashboard con gráficas de métricas
* [ ] Tema claro/oscuro
* [ ] Sistema de comentarios en tareas
* [ ] Exportación de reportes a PDF
* [ ] Notificaciones en tiempo real
* [x] Rutas protegidas por roles

---

## 📄 Documentación Técnica

### 📌 Decisiones importantes

* NestJS para escalabilidad y estructura clara
* MongoDB por su flexibilidad en relaciones y rendimiento
* Vercel + Render por su facilidad de integración CI/CD

### 📖 Manual de Usuario

1. Registrar o loguearse
2. Crear un proyecto (Admin/Manager)
3. Asignar desarrolladores
4. Crear tareas y moverlas en el board

---

## ✅ Cobertura de Pruebas

* Backend: pruebas unitarias
* Frontend: pruebas unitarias

---

## 💬 Contacto

Desarrollado por [Camilo Soto](https://github.com/CamiloSoto) – Fullstack Developer

---

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.
