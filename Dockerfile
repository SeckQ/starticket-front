# Etapa 1: build con Node
FROM node:18 AS builder

WORKDIR /app

# Copiar dependencias
COPY package.json package-lock.json ./
RUN npm install

# Copiar el resto de los archivos (incluye .env)
COPY . .

# Compilar la aplicación
RUN npm run build

# Etapa 2: servidor Nginx para servir el build
FROM nginx:stable-alpine

# Limpiar HTML default
RUN rm -rf /usr/share/nginx/html/*

# Copiar el build desde la etapa anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]