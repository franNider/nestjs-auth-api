# NestJS Auth API

Backend API desarrollada con NestJS que implementa autenticación con JWT, manejo de usuarios y persistencia con PostgreSQL.

---

## Descripción

Este proyecto simula una API real de backend, aplicando buenas prácticas como:

- Arquitectura modular con NestJS
- Autenticación con JWT
- Hash de contraseñas con bcrypt
- Uso de variables de entorno (.env)
- Persistencia con PostgreSQL y TypeORM

---

## Tecnologías

- NestJS
- TypeScript
- TypeORM
- PostgreSQL
- JWT (JSON Web Tokens)
- bcrypt

---

## Features

- Registro de usuarios
- Login con JWT
- Protección de rutas con Guards
- CRUD completo de usuarios
- Hash seguro de contraseñas
- Configuración mediante variables de entorno

---

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/TU_USUARIO/nestjs-auth-api.git
cd nestjs-auth-api
```

2. Instalar dependencias:

```bash
npm install
```

3. Crear archivo .env:

```bash
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=nestdb

JWT_SECRET=supersecret
JWT_EXPIRES_IN=1h
```

4. Ejecutar el proyecto:

```bash
npm run start:dev
```

---

## Endpoints principales

Auth
  POST /auth/login

Users
  POST /users
  GET /users (protegido)
  GET /users/:id
  PATCH /users/:id
  DELETE /users/:id

---

## Autenticación

Las rutas protegidas requieren un token JWT en el header:
Authorization: Bearer <token>

---

## Mejoras futuras

Refresh tokens
Roles y permisos
Documentación con Swagger
Deploy en la nube

---

## Autor

Franco Niderhaus