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
