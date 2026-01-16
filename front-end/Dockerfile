# ======= STAGE 1: Build =======
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ======= STAGE 2: Servir producción =======
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiamos build de Vite al folder que Nginx sirve
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponemos el puerto 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
