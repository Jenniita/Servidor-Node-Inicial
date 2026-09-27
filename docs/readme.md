# Servidor Node.js con Docker

Este proyecto contiene un servidor web sencillo creado con Node.js, Express y Docker. La aplicación responde en la ruta `/` con el texto `Hola, mundo con Node` y escucha en el puerto `3000`.

## 1. Requisitos y estructura

Es necesario tener Docker Desktop instalado y ejecutándose. Los comandos se ejecutan desde la carpeta raíz del proyecto, donde están `app.js`, `Dockerfile` y `package.json`.

```text
prueba_node_jenna/
├── app.js
├── Dockerfile
├── package.json
└── docs/
    └── readme.md
```

Si PowerShell no está situado en la carpeta del proyecto:

```powershell
cd "D:\Documentos UWU\Estudios\DAW\SEGUNDO\EntornoServidor\prueba_node_jenna"
```

## 2. Qué se necesita para programar en servidor en general

Independientemente del lenguaje elegido, un proyecto de servidor suele necesitar estos elementos:

| Elemento | Para qué sirve | Cuándo se utiliza |
| --- | --- | --- |
| **Ordenador y sistema operativo** | Proporcionan el entorno donde se instalan las herramientas y se ejecuta el proyecto. | Desde la instalación hasta el desarrollo y el despliegue. |
| **Editor de código** | Permite escribir, modificar y organizar el código y los archivos de configuración. | Durante toda la programación, corrección y ampliación del proyecto. |
| **Lenguaje de programación** | Define la sintaxis y las instrucciones con las que se implementa la aplicación. | Al crear la lógica, las rutas, las validaciones y las respuestas del servidor. |
| **Runtime o intérprete** | Ejecuta el código del lenguaje en el servidor. | Cuando se inicia la aplicación y cada vez que llega una petición que debe procesarse. |
| **Servidor web o framework HTTP** | Recibe peticiones, gestiona rutas y devuelve respuestas al cliente. | Al levantar el servidor y durante cada comunicación con el navegador u otro cliente. |
| **Gestor de dependencias** | Instala y mantiene librerías externas que el proyecto necesita. | Al preparar el proyecto y cuando se añaden, actualizan o eliminan dependencias. |
| **Archivos de configuración** | Guardan puertos, rutas, variables y opciones de ejecución. | Al preparar el entorno y al cambiar la configuración del servidor. |
| **Base de datos** (si es necesaria) | Almacena información de forma persistente. | Cuando la aplicación necesita guardar usuarios, productos, pedidos u otros datos. |
| **Herramientas de pruebas** | Comprueban que las rutas y funcionalidades responden correctamente. | Durante el desarrollo y antes de publicar cambios. |
| **Control de versiones** | Registra cambios y permite recuperar versiones anteriores del código. | Después de completar cambios y antes de compartirlos o desplegarlos. |
| **Repositorio remoto** | Guarda una copia accesible del proyecto y facilita la colaboración. | Al sincronizar el código con un servicio como GitHub o GitLab. |
| **Contenedores y herramientas de despliegue** | Empaquetan la aplicación y sus dependencias para ejecutarla de forma reproducible. | Al preparar entornos de desarrollo, pruebas o producción. |
| **Cliente para probar el servidor** | Envía peticiones y permite observar las respuestas. Puede ser un navegador, `curl` o Postman. | Después de levantar el servidor y al comprobar cada funcionalidad. |
| **Documentación** | Explica la instalación, los comandos, la configuración y el uso del proyecto. | Durante el desarrollo y para que otras personas puedan instalarlo o mantenerlo. |

### Orden general de trabajo

1. Instalar el lenguaje, el runtime, el editor y las herramientas del proyecto.
2. Crear la estructura de carpetas y los archivos de configuración.
3. Implementar la aplicación y definir cómo responderá a las peticiones.
4. Instalar las dependencias y preparar servicios adicionales, como una base de datos.
5. Iniciar el servidor en un entorno local.
6. Probar las rutas y corregir los errores.
7. Registrar los cambios con el control de versiones.
8. Empaquetar y desplegar la aplicación cuando esté preparada.
9. Mantener actualizados el código, las dependencias y la documentación.

## 3. Herramientas necesarias para programar en servidor

Estas herramientas se utilizan tanto en el ejemplo de Node.js como en el de PHP. Lo que cambia principalmente es el runtime y el servidor web que atiende las peticiones.

| Herramienta | Para qué sirve | Cuándo se utiliza en Node.js | Cuándo se utiliza en PHP |
| --- | --- | --- | --- |
| **Editor de código** (por ejemplo, Visual Studio Code) | Permite crear y modificar `app.js`, archivos `.php`, `package.json`, `Dockerfile` y la documentación. | Durante toda la programación y al corregir o ampliar el servidor Express. | Durante toda la programación y al modificar los archivos PHP, Apache o la configuración del proyecto. |
| **Runtime de Node.js** | Ejecuta JavaScript fuera del navegador. En este proyecto ejecuta `node app.js`. | Al iniciar la aplicación Express, directamente o dentro del contenedor Docker. | No se utiliza, porque PHP necesita su propio runtime. |
| **Runtime de PHP** | Interpreta y ejecuta los archivos `.php` en el servidor. | No se utiliza. | Cada vez que Apache recibe una petición a un archivo PHP. |
| **Express** | Framework que define rutas HTTP y facilita la creación del servidor Node.js. | Al instalar la dependencia con `npm install` y responder mediante `app.get()` y `res.send()`. | No se utiliza. |
| **Apache o Nginx** | Servidor web que recibe las peticiones y las entrega al runtime de PHP. | No es necesario para este ejemplo, porque Express atiende directamente las peticiones. | Al arrancar el contenedor y cada vez que el navegador solicita un archivo PHP. |
| **npm** | Gestor de paquetes de Node.js; instala Express y otras dependencias. | Al instalar las dependencias durante `docker build` mediante `RUN npm install`. | No se utiliza, salvo que el proyecto PHP incluya herramientas JavaScript adicionales. |
| **Composer** | Gestor de dependencias de PHP, equivalente aproximado a npm en ese ecosistema. | No se utiliza. | Al instalar librerías PHP, normalmente durante la construcción de la imagen o la preparación del proyecto. |
| **Git** | Registra versiones del código y permite consultar, recuperar y compartir cambios. | Después de modificar `app.js`, `Dockerfile` o la configuración Node.js. | Después de modificar archivos PHP, el `Dockerfile` o la configuración de Apache/Nginx. |
| **GitHub** | Aloja el repositorio remoto y permite sincronizar el proyecto con otras máquinas o personas. | Para subir y descargar las versiones del servidor Node.js. | Para subir y descargar las versiones del servidor PHP. |
| **Docker** | Empaqueta el runtime, las dependencias y el código en imágenes y contenedores reproducibles. | Construye la imagen `node-jenna`, ejecuta el contenedor y publica el puerto `3000`. | Construye una imagen con PHP y Apache/Nginx, ejecuta el contenedor y publica normalmente el puerto `80`. |
| **Dockerfile** | Describe paso a paso cómo se construye una imagen. | Instala Node.js, copia `package.json`, ejecuta `npm install` y copia la aplicación. | Selecciona una imagen PHP, instala extensiones o dependencias y copia los archivos al directorio web. |
| **Docker Compose** | Permite definir y arrancar varios servicios relacionados desde un único archivo `docker-compose.yml`. | Es opcional para este proyecto porque solo se usa un contenedor. | Es habitual si se combina PHP con Apache/Nginx, una base de datos, phpMyAdmin u otros servicios. |
| **Navegador web** | Envía peticiones HTTP y permite comprobar la respuesta del servidor. | Abre `http://localhost:3000`. | Abre `http://localhost:8080` cuando el puerto `80` del contenedor se publica en el `8080` del ordenador. |

### Orden de uso durante el trabajo

#### Node.js

1. Se escribe el código en el editor y se configura `package.json`.
2. npm instala Express y sus dependencias.
3. El `Dockerfile` prepara una imagen con Node.js, Express y el código.
4. Docker crea y ejecuta el contenedor con `node app.js`.
5. Express atiende las peticiones y el navegador muestra la respuesta.
6. Git registra los cambios y GitHub los almacena de forma remota.

#### PHP

1. Se escriben los archivos `.php` y la configuración en el editor.
2. Composer instala las dependencias PHP, si el proyecto las necesita.
3. El `Dockerfile` prepara una imagen con PHP y Apache o Nginx.
4. Docker ejecuta el contenedor y arranca el servidor web.
5. Apache o Nginx recibe la petición y la entrega al runtime de PHP.
6. El navegador muestra la respuesta generada por PHP.
7. Git registra los cambios y GitHub los almacena de forma remota.

## 4. Código de la aplicación

El archivo `package.json` configura los módulos ES y declara Express como dependencia:

```json
{
  "type": "module",
  "dependencies": {
    "express": "^5.2.1"
  }
}
```

El archivo `app.js` crea el servidor Express, define la ruta principal y abre el puerto `3000`:

```js
import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("Hola, mundo con Node");
});

app.listen(3000);
```

## 5. Dockerfile

```dockerfile
FROM node
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node", "app.js"]
```

Durante la construcción, Docker utiliza Node.js, establece `/app` como carpeta de trabajo, copia la configuración, instala Express y copia el resto del proyecto. Al iniciar el contenedor, `CMD` ejecuta `node app.js`.

## 6. Levantar y mantener el servidor

### Primera ejecución

```powershell
docker build -t node-jenna .
docker run -d --name node-jenna -p 3000:3000 node-jenna
```

- `docker build -t node-jenna .` construye la imagen usando el `Dockerfile` y le asigna el nombre `node-jenna`.
- `docker run` crea y arranca el contenedor a partir de esa imagen.
- `-d` ejecuta el contenedor en segundo plano.
- `--name node-jenna` asigna el nombre del contenedor.
- `-p 3000:3000` conecta el puerto `3000` del ordenador con el puerto `3000` del contenedor.

Abrir el servidor en `http://localhost:3000`.

### Arranques posteriores

Si el contenedor existe pero está detenido, basta con:

```powershell
docker start node-jenna
```

Para detenerlo:

```powershell
docker stop node-jenna
```

Para comprobar que está activo y consultar la respuesta:

```powershell
docker ps
(Invoke-WebRequest -Uri http://localhost:3000/ -UseBasicParsing).Content
```

La respuesta esperada es `Hola, mundo con Node`.

### Después de modificar el código

Como el `Dockerfile` copia el código dentro de la imagen, los cambios en `app.js`, `package.json`, `package-lock.json` o `Dockerfile` requieren reconstruir la imagen y recrear el contenedor:

```powershell
docker build -t node-jenna .
docker rm -f node-jenna
docker run -d --name node-jenna -p 3000:3000 node-jenna
```

- `docker build` incorpora los cambios a la imagen.
- `docker rm -f` elimina el contenedor anterior.
- `docker run` crea y arranca un contenedor nuevo con la imagen actualizada.

Si solo se había detenido el contenedor y no se ha modificado ningún archivo, basta con `docker start node-jenna`.

## 7. Diferencias entre Node.js y PHP

### Cómo atiende cada servidor

En este proyecto, Node.js y Express son el propio servidor web. `node app.js` inicia el proceso y Express escucha en el puerto `3000`.

PHP normalmente necesita un servidor web como Apache o Nginx. Apache suele escuchar en el puerto `80`, recibe la petición, ejecuta el archivo PHP y devuelve la respuesta.

| Aspecto | Node.js con Express | PHP con Apache o Nginx |
| --- | --- | --- |
| Programa que atiende | La aplicación Node.js mediante Express | Apache o Nginx ejecuta o entrega PHP |
| Archivo principal | `app.js` | Uno o varios archivos `.php` |
| Puerto del contenedor | `3000` | Normalmente `80` |
| Dependencias | `npm install` | Imagen PHP, paquetes y extensiones |
| Respuesta | `res.send()` | PHP genera HTML u otra respuesta |
| Acceso en este ejemplo | `http://localhost:3000` | `http://localhost:8080` |

### PHP con Apache sin volumen

Un `Dockerfile` PHP sencillo podría ser:

```dockerfile
FROM php:8.2-apache
COPY . /var/www/html/
```

Primera ejecución:

```powershell
docker build -t servidor-php .
docker run -d --name servidor-php -p 8080:80 servidor-php
```

En `8080:80`, el primer puerto es el del ordenador y el segundo es el puerto de Apache dentro del contenedor. El servidor se abre en `http://localhost:8080`.

Si se modifica un archivo PHP copiado dentro de la imagen:

```powershell
docker build -t servidor-php .
docker rm -f servidor-php
docker run -d --name servidor-php -p 8080:80 servidor-php
```

Para arrancar o detener un contenedor PHP que ya existe:

```powershell
docker start servidor-php
docker stop servidor-php
```

### PHP con volumen durante el desarrollo

Un volumen conecta una carpeta del ordenador con una carpeta del contenedor. Los cambios se reflejan al recargar el navegador sin reconstruir la imagen:

```powershell
docker run -d --name servidor-php -p 8080:80 -v "${PWD}:/var/www/html" servidor-php
```

`${PWD}` representa la carpeta actual de PowerShell y `/var/www/html` es la carpeta que Apache sirve dentro del contenedor. Al cambiar un `.php`, normalmente solo hay que recargar `http://localhost:8080`.

El volumen no evita reconstruir la imagen si cambian el `Dockerfile`, la versión de PHP, las extensiones o la configuración de Apache.

### Resumen de mantenimiento

| Situación | Node.js de este proyecto | PHP con código copiado | PHP con volumen |
| --- | --- | --- | --- |
| Primera instalación | `build` y `run` | `build` y `run` | `build` y `run` |
| Contenedor detenido | `start` | `start` | `start` |
| Detener servidor | `stop` | `stop` | `stop` |
| Cambiar código | `build`, `rm -f` y `run` | `build`, `rm -f` y `run` | Recargar navegador |
| Cambiar imagen o configuración | `build`, `rm -f` y `run` | `build`, `rm -f` y `run` | `build`, `rm -f` y `run` |

## 8. Imagen, contenedor y volumen

- La **imagen** es la plantilla con Node.js, Express y los archivos de la aplicación.
- El **contenedor** es una instancia creada y ejecutada a partir de la imagen.
- El **volumen** conecta archivos del ordenador con una carpeta del contenedor para poder modificarlos sin reconstruir la imagen.

En este proyecto no se usa volumen: el código se copia dentro de la imagen durante `docker build`.

## 9. Comandos útiles

```powershell
docker ps
docker logs node-jenna
docker rm -f node-jenna
```

- `docker ps` muestra los contenedores activos.
- `docker logs node-jenna` muestra los registros del servidor.
- `docker rm -f node-jenna` elimina el contenedor.

## 10. Subir el proyecto a GitHub

Los comandos se ejecutan desde la carpeta raíz del proyecto.

### Crear el repositorio y preparar el primer commit

```powershell
git init
git add .
git commit -m "Primer commit"
git branch -M main
```

### Conectar el repositorio con GitHub

```powershell
git remote add origin https://github.com/Jenniita/Servidor-Node-Inicial.git
git remote -v
```

### Sincronizar historiales y subir la rama principal

Si el repositorio local y el de GitHub tienen historiales diferentes:

```powershell
git pull origin main --allow-unrelated-histories
git push -u origin main
```

En una actualización normal:

```powershell
git status
git add .
git commit -m "Describe los cambios realizados"
git pull origin main
git push origin main
```

Detener Docker no elimina los archivos del proyecto. `git add`, `git commit` y `git push` son los comandos que guardan los cambios en GitHub.

## 11. Cómo llega la respuesta al navegador

1. `docker build` crea la imagen `node-jenna` e instala Express mediante `npm install`.
2. `docker run` crea el contenedor y ejecuta `node app.js` mediante `CMD`.
3. Express escucha en el puerto `3000` dentro del contenedor.
4. `-p 3000:3000` conecta ese puerto con el puerto `3000` del ordenador.
5. Al visitar `http://localhost:3000`, Docker redirige la petición al contenedor.
6. Express ejecuta la ruta `/` y `res.send()` devuelve `Hola, mundo con Node`.
