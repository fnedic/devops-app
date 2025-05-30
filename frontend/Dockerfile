FROM node:20-alpine AS builder

# directorio de trabajo en el contenedor
WORKDIR /app

ARG VITE_API_URL
ARG VITE_APP_VERSION

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_APP_VERSION=$VITE_APP_VERSION

# Copia los archivos package.json y package-lock.jso
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia
COPY . .

# Realiza el build
RUN npm run build

# Utiliza una imagen de servidor
FROM nginx:stable-alpine

#directorio de trabajo
WORKDIR /usr/share/nginx/html

# Elimina los archivos estáticos por defecto de Nginx
RUN rm -rf ./*

# Copia los archivos construidos desde la etapa de builder
COPY --from=builder /app/dist .

# Expone el puerto en el que Nginx servirá la aplicación
EXPOSE 80

# Comando para iniciar el servidor Nginx
CMD ["nginx", "-g", "daemon off;"]