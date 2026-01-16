## Swagger API Documentation

After installing dependencies and running the app, Swagger UI is available at:

- http://localhost:3000/docs

Start the app (dev):

```bash
$ npm run start:dev
```

The documentation will reflect controllers and DTOs annotated with `@nestjs/swagger` decorators.

**API Endpoints**

- **GET /health**: Health check endpoint.
  - **Response (200)**: JSON object with `service`, `status` and `timestamp`.
  - Example:

```json
{
  "service": "Auth Service",
  "status": "UP",
  "timestamp": "2026-01-16T00:00:00.000Z"
}
```

- **POST /login**: Authenticate a user.
  - **Request body**: `CreateLoginDto` with `email` (string) and `password` (string).
  - **Responses**:
    - **200**: `ApiResponse` with `code`, `description` and `data` containing `{ token }` on success.
    - **401**: `ApiResponse` with `code` 401 and `description` 'Invalid credentials'.

Example request body:

```json
{
  "email": "user@example.com",
  "password": "strongPassword"
}
```

**Models**

- **CreateLoginDto** (`src/login/dto/create-login.dto.ts`):
  - `email`: string — ejemplo `user@example.com`.
  - `password`: string — ejemplo `strongPassword`.

- **ApiResponse** (`src/commons/api-response.ts`): Estructura estándar de respuesta utilizada por los endpoints:
  - `code`: number — código HTTP lógico (ej. 200, 401, 500).
  - `description`: string | null — mensaje descriptivo.
  - `data`: object | null — payload con datos adicionales (p. ej. `{ token }`).

- **HealthResponseDto** (`src/health/dto/health-response.dto.ts`): respuesta del health check con `service`, `status` y `timestamp`.

**Personalizar la UI de Swagger**

- Puedes cambiar la ruta de la UI editando `src/main.ts` donde se llama a `SwaggerModule.setup('docs', app, document)`.

**Ejecutar**

```bash
npm install
npm run start:dev
# Abrir http://localhost:3000/docs
```
