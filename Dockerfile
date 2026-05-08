# ETAPA 1: Construcción de la aplicación Angular
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# El comando "npm run build" ejecutará "ng build" que genera la carpeta "dist/fenixtech-admin"
RUN npm run build

# ETAPA 2: Servidor web con Nginx
FROM nginx:alpine
# Copiamos el archivo de configuración de Nginx que crearemos a continuación.
COPY nginx.conf /etc/nginx/conf.d/default.conf 

# Copiamos los archivos compilados de Angular desde la etapa de build.
# En las versiones recientes de Angular (17+), los archivos compilados se guardan dentro de la subcarpeta "browser".
COPY --from=build /app/dist/fenixtech-admin/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]