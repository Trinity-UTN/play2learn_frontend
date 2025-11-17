# Etapa única: Servir con NGINX
FROM nginx:1.27-alpine

# Eliminamos archivos por defecto de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiamos los archivos del build (que vos subís desde tu PC)
COPY ./dist /usr/share/nginx/html

# Configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]