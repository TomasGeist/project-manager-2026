# Project Manager Microservices (2026)

Arquitectura de **microservicios full‑stack** de ejemplo, pensada para demostrar autenticación, comunicación entre servicios y un front‑end moderno orquestado con Docker.

---

## 📦 Servicios incluidos

* **auth-service** → Autenticación (login y validación de token)
* **projects-service** → Gestión de proyectos
* **health-service** → Agregador de estado (health checks)
* **front-end** → Aplicación web (React + Vite)

Todos los servicios se levantan y conectan automáticamente mediante **Docker Compose**.

---

## ⚙️ Requisitos

* Docker
* Docker Compose v2 (comando `docker compose`)

> No es necesario instalar Node.js ni dependencias en local. Todo corre dentro de contenedores.

---

## 🚀 Levantar el proyecto

### 1. Clonar el repositorio

```powershell
git clone https://github.com/TomasGeist/project-manager-2026.git
cd project-manager-microservices-2026
```

### 2. Construir y levantar los contenedores

**Docker Compose v2 (recomendado):**

```powershell
docker compose up --build -d
```

**Versión clásica:**

```powershell
docker-compose build
docker-compose up -d
```

### 3. Ver logs de un servicio

```powershell
docker compose logs -f auth-prod
# o
docker-compose logs -f auth-prod
```

### 4. Detener el entorno

```powershell
docker compose down
# o
docker-compose down
```

---

## 🌐 Accesos

* **Front‑end (Login):** [http://localhost:5173](http://localhost:5173)
* **Auth API (directo):** [http://localhost:3000/login](http://localhost:3000/login)

### Credenciales de prueba

```json
{
  "email": "test_user@example.com",
  "password": "test_password"
}
```

---

## 🖥️ Capturas

**Login**

<img width="1920" height="950" alt="Login" src="https://github.com/user-attachments/assets/c6840d0b-6232-4547-9288-557adebc5cbc" />

**Dashboard de proyectos**

<img width="1431" height="594" alt="Dashboard" src="https://github.com/user-attachments/assets/757e865e-bf21-4eb7-82a9-614d40af9dc8" />

---

## 📊 Comportamiento del dashboard

* Muestra la lista de proyectos.
* Indica el estado de los servicios y entornos (ON / OFF).
* Los endpoints de health por defecto son:

```
http://localhost:3000/health   # auth-service
http://localhost:4000/health   # projects-service
```

Si querés que más servicios aparezcan como **ON**, descomentá las instancias correspondientes en `docker-compose.yml` y volvé a levantar el entorno.

---

## 🏗️ Infraestructura y arquitectura

El sistema sigue una arquitectura **frontend + microservicios desacoplados**, comunicados por HTTP dentro de la red de Docker.

### Flujo general

1. El usuario accede al **Front‑end**.
2. El login se valida contra **auth-service**.
3. El front‑end guarda el JWT.
4. Las peticiones a **projects-service** incluyen el token.
5. El **health-service** consulta el estado de los demás servicios.

### Esquema de conexión

<img width="930" height="743" alt="image" src="https://github.com/user-attachments/assets/3d674fd2-12b3-4559-8747-2013b783e44d" />


Todos los servicios se comunican usando el **nombre del servicio de Docker** como hostname, sin depender de `localhost` internamente.

---

## 🧠 Notas técnicas

* El front‑end se construye con **multi‑stage Docker builds** para reducir el tamaño de la imagen.
* No se requiere configuración manual de Nginx ni Node en local.
* Pensado como base para escalar a:

  * API Gateway
  * Validación de JWT distribuida
  * Swagger por microservicio

---

## 📌 Objetivo del proyecto

Este repositorio sirve como **proyecto demostrativo** de arquitectura moderna con Docker, microservicios y un front‑end desacoplado, ideal para aprendizaje, entrevistas técnicas o como base para un SaaS real.

