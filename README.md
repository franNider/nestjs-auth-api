# NestJS Auth API

Backend API desarrollada con NestJS que implementa autenticación con JWT, manejo de usuarios y persistencia con PostgreSQL.

---

## Descripción

Este proyecto simula una API real de backend, aplicando buenas prácticas como:

- Arquitectura modular con NestJS
- Autenticación con JWT (Access + Refresh Tokens)
- Autorización basada en roles (RBAC)
- Manejo de sesiones con refresh tokens persistidos
- Hash de contraseñas con bcrypt
- Validación de datos con class-validator
- Documentación automática con Swagger
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
- class-validator
- Swagger

---

## Features

- Registro de usuarios
- Login con Access Token + Refresh Token
- Renovación de sesión con refresh token
- Logout con invalidación de sesión
- Protección de rutas con Guards
- Autorización por roles (ADMIN / USER)
- CRUD completo de usuarios
- Hash seguro de contraseñas
- Validación de datos en DTOs
- Documentación interactiva con Swagger

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
JWT_REFRESH_SECRET=refreshsecret 
JWT_REFRESH_EXPIRES_IN=7d
```

4. Ejecutar el proyecto:

```bash
npm run start:dev
```

---

## Endpoints principales

Auth
  - POST /auth/login
<<<<<<< HEAD
  - POST /auth/refresh
  - POST /auth/logout
=======
>>>>>>> 5dde8c450fe04586e82c5509a951bab944724e36

Users
  - POST /users → registro
  - GET /users → solo ADMIN
  - GET /users/:id
  - PATCH /users/:id
  - DELETE /users/:id → solo ADMIN

---

## Autenticación

<<<<<<< HEAD
El sistema utiliza:
- Access Token (JWT) → corto plazo
- Refresh Token → largo plazo, almacenado en base de datos (hasheado)

---

## Flujo de autenticación
Login → devuelve:
  - access_token
  - refresh_token

Acceso a rutas protegidas con:
Authorization: Bearer <access_token>

Renovación de sesión:
POST /auth/refresh

Logout:
  - elimina el refresh token de la base de datos
  - evita generar nuevos access tokens
=======
Las rutas protegidas requieren un token JWT en el header:
- Authorization: Bearer <token>
>>>>>>> 5dde8c450fe04586e82c5509a951bab944724e36

---

## Autorización

Se implementa control de acceso basado en roles:
  - USER → acceso limitado
  - ADMIN → acceso completo

Ejemplo:
  - GET /users → solo ADMIN
  - DELETE /users → solo ADMIN

---

## Documentación API

La API cuenta con documentación interactiva usando Swagger:
  - http://localhost:3000/api

Permite:
  - Probar endpoints
  - Ver estructura de requests
  - Autenticarse con JWT

---

## Testing

Se recomienda utilizar Postman o Swagger UI para probar los endpoints.

---

## Seguridad

<<<<<<< HEAD
  - Contraseñas hasheadas con bcrypt
  - Refresh tokens almacenados de forma segura (hasheados)
  - Validación de credenciales sin revelar información sensible
  - Separación entre access y refresh tokens
=======
- Refresh tokens
- Roles más avanzados (permissions)
- Rate limiting
- Logging
- Deploy en la nube (Railway / AWS / Render)
>>>>>>> 5dde8c450fe04586e82c5509a951bab944724e36

---

## Autor

Franco Niderhaus
