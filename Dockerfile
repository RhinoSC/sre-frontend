# Usa una imagen base de Node.js con Alpine Linux para ser ligera
FROM node:lts-alpine AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias a la imagen
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Ejecuta el build de la aplicación
RUN npm run build

# Usa una imagen base de Node.js con Alpine para servir la aplicación
FROM node:lts-alpine AS production

# Instala http-server globalmente
RUN npm install -g http-server

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos generados en el build anterior
COPY --from=build /app/dist ./dist

# Expone el puerto donde se servirá la aplicación
EXPOSE 3000

# Comando para ejecutar el servidor http-server
CMD ["http-server", "dist", "-p", "3000",  "--proxy", "http://localhost:3000?"]
