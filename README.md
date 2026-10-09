# Servidor-Node-Inicial

## Desarrollo con Docker

La configuración de Compose monta el proyecto dentro del contenedor y reinicia Node al guardar cambios.

La primera vez, desde esta carpeta, sustituye el contenedor anterior y arranca el servicio:

```powershell
docker stop servidor-node
docker rm servidor-node
docker compose up --build
```

Después de esa migración, inicia el servicio con `docker compose up`. Para detenerlo, usa `Ctrl+C`.
Abre <http://localhost:3000/productos> para probar la ruta.

## Ejercicios RA2

Fecha: 09/10/2026

Hoy he dejado preparado el proyecto del servidor Node inicial, documentando la ejecución con Docker y la ruta de prueba `/productos`. También he revisado la configuración de arranque del contenedor y la forma de levantar la aplicación para desarrollo local con `docker compose up`.
