FROM node:20-alpine AS builder

# directorio de trabajo en el contenedor
WORKDIR /app

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