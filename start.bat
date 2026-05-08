@echo off
chcp 65001 > nul
echo =======================================================
echo 🚀 INICIANDO FENIXTECH FRONTEND ADMIN (Angular + Nginx Proxy)
echo =======================================================
echo.

echo [1/3] 🧹 Deteniendo contenedores anteriores...
docker-compose down

echo.
echo [2/3] 🏗️  Compilando Angular y levantando el proxy Nginx...
:: El --build es VITAL aquí para que Docker recompile tu código de Angular si hiciste cambios
docker-compose up -d --build

echo.
echo [3/3] ✅ ¡Todo listo! 
echo 🌐 Tu aplicacion esta disponible en: http://localhost
echo.
echo Mostrando los logs del servidor (Presiona Ctrl+C para salir de los logs)...
echo -------------------------------------------------------
docker-compose logs -f