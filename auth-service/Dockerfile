# ======= Build =======
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copiamos solo package.json y package-lock.json para aprovechar cache
COPY package*.json ./

# Instalamos todas las dependencias (dev + prod)
RUN npm ci

# Copiamos el código y hacemos build
COPY . .
RUN npm run build

# ======= Producción =======
FROM node:20-alpine

WORKDIR /usr/src/app

# Copiamos solo dist y package.json/package-lock.json
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package*.json ./

# Instalamos solo prod dependencies y limpiamos caches para reducir tamaño
RUN npm ci --only=production && npm cache clean --force

EXPOSE 3000
CMD ["node", "dist/main.js"]