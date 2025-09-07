#!/bin/bash

# Obtener la ruta absoluta del directorio donde se encuentra el script
SCRIPT_DIR=$(dirname "$0")

# Cambiar al directorio donde está el script
cd "$SCRIPT_DIR" || exit


echo "Ejecutando git pull..."
git pull https://github.com/Trinity-UTN/play2learn_frontend.git development

echo "Deteniendo contenedor existente..."
docker stop play2learn_desarrollo_frontend 2>/dev/null || echo "No había contenedor en ejecución"

echo "Eliminando contenedor existente..."
docker rm play2learn_desarrollo_frontend 2>/dev/null || echo "No había contenedor para eliminar"

echo "Limpiando imágenes antiguas..."
docker image prune -f

echo "Construyendo la imagen de Docker..."
docker build --no-cache -t play2learn_desarrollo_frontend . || { echo "Error en docker build"; exit 1; }

echo "Verificando la imagen creada..."
docker images | grep play2learn_desarrollo_frontend || { echo "Error: la imagen no fue creada correctamente"; exit 1; }

echo "Ejecutando el contenedor de Docker..."
docker run -d -p 3010:3000 --name play2learn_desarrollo_frontend play2learn_desarrollo_frontend || { echo "Error al ejecutar el contenedor"; exit 1; }

