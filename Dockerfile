# Etapa 1: Construir la aplicación React con Vite
FROM node:18-alpine AS build

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install --force

# Copiar el resto del código
COPY . .

# Construir la aplicación (Vite genera la carpeta "dist")
RUN npm run build

# Verificar que la carpeta "dist" existe (opcional para depuración)
RUN ls -la /app/dist

# Etapa 2: Servir la aplicación
FROM node:16-alpine

# Instalar "serve" globalmente
RUN npm install -g serve

# Copiar la carpeta "dist" generada en la etapa anterior
COPY --from=build /app/dist /app/dist

# Exponer el puerto 3000
EXPOSE 3000

# Iniciar el servidor con "serve" apuntando a "dist"
CMD ["serve", "-s", "/app/dist", "-l", "3000"]
