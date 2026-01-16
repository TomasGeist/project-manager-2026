# Project Manager Microservices (2026)

Conjunto de microservicios de ejemplo (auth, projects, health) y un front-end.

Resumen rápido

- Servicios incluidos: `auth-service`, `projects-service`, `health-service` y `front-end`.
- Orquestación por Docker Compose

Requisitos

- Docker (con Docker Compose v2 — el comando es `docker compose`).

Levantar el proyecto

1. Clonar el repositorio y entrar en la carpeta:

```powershell
git clone https://github.com/TomasGeist/project-manager-2026.git
cd project-manager-microservices-2026
```

2. Construir y levantar (elige la variante según tu instalación de Docker Compose):

- Con Docker Compose v2 (comando `docker compose`):

```powershell
docker compose up --build -d
```

- Con la versión clásica (`docker-compose`):

```powershell
docker-compose build
docker-compose up -d
```

3. Ver logs de un servicio (ejemplo `auth-prod`):

```powershell
docker compose logs -f auth-prod
# o: docker-compose logs -f auth-prod
```

4. Parar y eliminar contenedores:

```powershell
docker compose down
# o: docker-compose down
```


Acceso, credenciales y capturas

- Front-end (página de login): http://localhost:5173
- API de auth (si accedes directamente): http://localhost:3000/login

Credenciales de prueba (usuario por defecto para login):

```json
{
	"email": "test_user@example.com",
	"password": "test_password"
}
```

Capturas:

- Insertaré aquí la foto del login.
- Después añadiré capturas del dashboard mostrando proyectos y environments.

Comportamiento del dashboard

- El dashboard muestra la lista de proyectos y el estado de sus `environments`.
- Por defecto, los endpoints de health son:
	- http://localhost:3000/health (auth)
	- http://localhost:4000/health (projects)
- En la interfaz verás los servicios que están "ON" y los que están "OFF". Si quieres que aparezcan como "ON", descomenta las instancias correspondientes en `docker-compose.yml` y levanta más servicios.

Si quieres, puedo añadir las capturas directamente al repo (`docs/screenshots`) y referenciarlas desde el `README.md`.