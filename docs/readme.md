# Servidor Node.js con Docker

Este proyecto contiene un servidor web sencillo creado con Node.js, Express y Docker.
La aplicación responde en la ruta `/` con el texto `Hola, mundo con Node` y escucha en el puerto `3000`.

## Inicio del servidor paso a paso

### Requisitos

1. Tener Docker Desktop instalado y ejecutándose.
2. Abrir PowerShell en la carpeta raíz del proyecto, donde están `Dockerfile`, `package.json` y `app.js`:

```powershell
cd "C:\Users\AlumnoM\Desktop\ASIGNATURAS\EntornoServidor\Servidor-Node-Inicial"
```

### Primer inicio

La primera vez hay que construir la imagen Docker y crear el contenedor. El nombre de la imagen y del contenedor será `servidor-node`:

```powershell
docker build -t servidor-node .
docker run -d --name servidor-node -p 3000:3000 servidor-node
```

Después, abrir esta dirección en el navegador:

```text
http://localhost:3000
```

La respuesta esperada es `Hola, mundo con Node`.

### Inicios posteriores

Cada vez que se quiera encender el servidor, hay que abrir Docker Desktop y ejecutar PowerShell en la carpeta del proyecto. Si el contenedor ya existe pero está detenido, no es necesario volver a construir la imagen:

```powershell
docker start servidor-node
```

Se puede comprobar que está funcionando con:

```powershell
docker ps
```

Después, abrir `http://localhost:3000` en el navegador.

Para apagarlo al terminar:

```powershell
docker stop servidor-node
```

Si el contenedor ya está funcionando, no hay que ejecutar `docker run` otra vez. Basta con abrir el navegador.

### Después de modificar el código

Como el código se copia dentro de la imagen durante la construcción, hay que reconstruir la imagen y recrear el contenedor:

```powershell
docker build -t servidor-node .
docker rm -f servidor-node
docker run -d --name servidor-node -p 3000:3000 servidor-node
```

Esto es necesario después de cambiar `app.js`, `package.json` o el `Dockerfile`.

## 1. Estructura del proyecto

```text
Servidor-Node-Inicial/
├── app.js
├── Dockerfile
├── package.json
└── docs/
		└── readme.md
```

## 2. Crear la aplicación Node.js

Se creó el proyecto Node.js y se configuró el archivo `package.json` con módulos ES y Express como dependencia:

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

## 3. Crear el Dockerfile

El archivo `Dockerfile` describe cómo construir la imagen:

```dockerfile
FROM node
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node", "app.js"]
```

El proceso de construcción es el siguiente:

1. Se utiliza la imagen oficial de Node.js.
2. Se establece `/app` como directorio de trabajo dentro del contenedor.
3. Se copian `package.json` y `package-lock.json`, si existe.
4. Se instalan las dependencias con `npm install`.
5. Se copia el resto del proyecto al contenedor.
6. Se inicia el servidor ejecutando `node app.js`.

## 4. Construir la imagen Docker

Desde la carpeta raíz del proyecto se ejecuta:

```powershell
docker build -t servidor-node .
```

El parámetro `-t servidor-node` asigna el nombre `servidor-node` a la imagen. El punto final indica que Docker debe utilizar como contexto la carpeta actual.

## 5. Crear y ejecutar el contenedor

Para iniciar el servidor y publicar su puerto se ejecuta:

```powershell
docker run -d --name servidor-node -p 3000:3000 servidor-node
```

## 6. Diferencias entre levantar un servidor PHP y uno Node.js

Aunque los dos servidores pueden ejecutarse dentro de contenedores Docker y verse desde un navegador, el proceso de arranque y la forma de atender las peticiones son diferentes.

### Servidor Node.js

En este proyecto, el propio programa Node.js actúa como servidor web:

1. La imagen parte de Node.js y añade Express mediante `npm install`.
2. Docker ejecuta `node app.js` cuando se inicia el contenedor.
3. Express abre el puerto `3000` y queda esperando peticiones.
4. Cuando llega una petición a `/`, Express ejecuta la función definida en `app.get()`.
5. La aplicación devuelve directamente el texto con `res.send()`.

El puerto se publica con:

```powershell
docker run -d --name servidor-node -p 3000:3000 servidor-node
```

En este caso, el formato es `puerto-del-ordenador:puerto-del-contenedor`, es decir, `3000:3000`.

### Servidor PHP

PHP normalmente no permanece escuchando por sí solo como un servidor web de aplicación. Lo habitual es utilizar Apache o Nginx delante de PHP:

1. La imagen contiene PHP y un servidor web, por ejemplo Apache.
2. Apache queda iniciado al arrancar el contenedor y escucha normalmente en el puerto `80`.
3. Cuando el navegador solicita un archivo `.php`, Apache entrega esa petición al intérprete de PHP.
4. PHP ejecuta el código del archivo y genera una respuesta, normalmente HTML.
5. Apache devuelve esa respuesta al navegador.

Un contenedor PHP con Apache se suele publicar, por ejemplo, con:

```powershell
docker run -d --name servidor-php -p 8080:80 imagen-php
```

En este caso, `8080:80` significa que se accede desde el puerto `8080` del ordenador, aunque Apache esté escuchando en el puerto `80` dentro del contenedor. La dirección sería `http://localhost:8080`.

### Diferencias principales

| Aspecto                               | Node.js con Express                                               | PHP con Apache o Nginx                                                                                  |
| ------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Programa que atiende las peticiones   | La propia aplicación Node.js mediante Express                     | Apache o Nginx, que entrega la petición a PHP                                                           |
| Comando de inicio                     | `node app.js`                                                     | Se inicia el servidor web y este ejecuta los archivos PHP                                               |
| Puerto habitual dentro del contenedor | `3000` en este proyecto                                           | `80` con Apache o, en algunos casos, `9000` para PHP-FPM                                                |
| Archivo principal                     | `app.js`                                                          | Uno o varios archivos `.php`, por ejemplo `index.php`                                                   |
| Dependencias                          | Se instalan con `npm install`                                     | Se incluyen en la imagen PHP mediante paquetes o extensiones                                            |
| Respuesta                             | Express la genera con `res.send()`                                | PHP genera el contenido y Apache o Nginx lo entrega                                                     |
| Actualización del código              | Normalmente hay que reconstruir la imagen y recrear el contenedor | También hay que reconstruirlo si el código se copió durante `docker build`, salvo que se use un volumen |

### Resumen de la diferencia

En Node.js, `app.js` es a la vez el código de la aplicación y el proceso que escucha las peticiones HTTP gracias a Express. Por eso el `Dockerfile` termina ejecutando `node app.js`.

En PHP, el código PHP necesita normalmente un servidor web como Apache o Nginx que permanezca activo. Ese servidor recibe la petición del navegador, ejecuta PHP y devuelve el resultado. Por eso una imagen PHP suele arrancar Apache y se accede normalmente mediante el puerto `80` del contenedor.

La parte común es Docker: en ambos casos se construye una imagen, se crea un contenedor y se publica un puerto con `-p` para que el navegador pueda comunicarse con el servidor.

Significado de los parámetros:

- `-d`: ejecuta el contenedor en segundo plano.
- `--name servidor-node`: asigna un nombre al contenedor.
- `-p 3000:3000`: conecta el puerto `3000` del ordenador con el puerto `3000` del contenedor.
- `servidor-node`: indica la imagen que se va a utilizar.

La aplicación queda disponible en:

```text
http://localhost:3000
```

## 7. Comprobar el contenedor

Para comprobar que el contenedor está activo:

```powershell
docker ps
```

También se puede comprobar la respuesta del servidor desde PowerShell:

```powershell
(Invoke-WebRequest -Uri http://localhost:3000/ -UseBasicParsing).Content
```

La respuesta esperada es:

```text
Hola, mundo con Node
```

## 8. Actualizar la aplicación después de cambiar el código

Docker copia los archivos dentro de la imagen durante `docker build`. Por eso, modificar `app.js` no cambia automáticamente un contenedor que ya estaba creado.

Después de modificar el código, se debe reconstruir la imagen y recrear el contenedor:

```powershell
docker build -t servidor-node .
docker rm -f servidor-node
docker run -d --name servidor-node -p 3000:3000 servidor-node
```

## 9. Subir el proyecto a Git y GitHub

Los siguientes comandos se ejecutan desde la carpeta raíz del proyecto, donde se encuentran `app.js`, `Dockerfile` y `package.json`.

### Crear el repositorio local y preparar el primer commit

```powershell
git init
git add .
git commit -m "Primer commit"
git branch -M main
```

### Conectar el repositorio local con GitHub

Se creó el repositorio `Servidor-Node-Inicial` en GitHub y se añadió como remoto:

```powershell
git remote add origin https://github.com/Jenniita/Servidor-Node-Inicial.git
```

Para comprobar que el remoto está configurado correctamente:

```powershell
git remote -v
```

### Subir la rama principal

```powershell
git push -u origin main
```

La opción `-u` establece `origin/main` como rama remota predeterminada para los siguientes envíos.

### Unir historiales independientes

Como el repositorio local y el repositorio de GitHub ya tenían commits diferentes, fue necesario permitir la unión de historiales independientes:

```powershell
git pull origin main --allow-unrelated-histories
```

Después se guardó el commit de merge y se subió el resultado a GitHub:

```powershell
git push origin main
```

La opción `--allow-unrelated-histories` normalmente solo es necesaria en esta primera sincronización.

## 10. Actualizar los cambios en GitHub

Cada vez que se modifique el proyecto, el flujo habitual es:

```powershell
git status
git add .
git commit -m "Describe los cambios realizados"
git pull origin main
git push origin main
```

El comando `git status` permite revisar qué archivos han cambiado. Se recomienda ejecutar `git pull origin main` antes de `git push` para descargar primero los cambios que puedan existir en GitHub.

### Guardar los cambios al terminar de trabajar

Al terminar la sesión, se puede detener el servidor y guardar los cambios en GitHub con estos pasos:

```powershell
docker stop servidor-node
git status
git add .
git commit -m "Describe los cambios realizados"
git pull origin main
git push origin main
```

Detener Docker no borra los archivos del proyecto. Los comandos `git add`, `git commit` y `git push` son los que guardan los cambios en GitHub. Si no se ha modificado ningún archivo, Git indicará que no hay nada nuevo que guardar.

Al volver a iniciar el servidor, si solo se detuvo el contenedor se puede ejecutar `docker start servidor-node`. Si se modificó `app.js`, `package.json` o el `Dockerfile`, primero hay que reconstruir la imagen y recrear el contenedor siguiendo el apartado 8.

Si Git informa de conflictos después del `pull`, hay que editar los archivos marcados, guardar la resolución y ejecutar:

```powershell
git add .
git commit -m "Resolver conflictos de merge"
git push origin main
```

Para consultar el historial de commits:

```powershell
git log --oneline --all
```

Finalmente, se recarga `http://localhost:3000` en el navegador. Si el navegador conserva una respuesta anterior, se puede hacer una recarga forzada con `Ctrl + F5`.

## 11. Comandos útiles

Ver los registros del servidor:

```powershell
docker logs servidor-node
```

Detener el contenedor:

```powershell
docker stop servidor-node
```

Volver a iniciarlo sin reconstruir la imagen:

```powershell
docker start servidor-node
```

Eliminar el contenedor:

```powershell
docker rm -f servidor-node
```

## 12. Cómo se ha levantado el servidor y por qué funciona

El servidor se ha levantado mediante varios pasos que conectan el código de Node.js con el navegador:

1. Docker lee el archivo `Dockerfile` y crea la imagen `servidor-node` a partir de la imagen oficial de Node.js.
2. Durante la construcción, Docker copia `package.json` al contenedor e instala Express con `npm install`.
3. Después copia `app.js` dentro del directorio `/app` del contenedor.
4. Al ejecutar el contenedor, la instrucción `CMD ["node", "app.js"]` inicia el proceso de Node.js.
5. Node.js ejecuta `app.js`. Express crea la aplicación y empieza a escuchar en el puerto `3000` dentro del contenedor.
6. La opción `-p 3000:3000` conecta el puerto `3000` del ordenador con el puerto `3000` del contenedor.

Por esta conexión, cuando se escribe `http://localhost:3000` en el navegador, ocurre lo siguiente:

1. El navegador envía una petición HTTP a `localhost`, que representa el ordenador local, usando el puerto `3000`.
2. Docker recibe la petición en ese puerto y la redirige al puerto `3000` del contenedor `servidor-node`.
3. El servidor Express recibe la petición en la ruta `/`, porque esa es la dirección que se ha escrito después del puerto.
4. Esta parte de `app.js` indica cómo responder:

   ```js
   app.get("/", (req, res) => {
     res.send("Hola, mundo con Node");
   });
   ```

5. `res.send()` envía el texto como respuesta HTTP al navegador.
6. El navegador recibe la respuesta y muestra `Hola, mundo con Node` en la página.

En resumen, el texto se ve porque está escrito en la respuesta de la ruta `/`, el proceso Node.js está ejecutándose dentro del contenedor y Docker ha publicado correctamente el puerto del contenedor en el ordenador. Si el contenedor no estuviera iniciado, si el puerto no estuviera publicado o si la ruta no existiera, el navegador no mostraría esta respuesta.

### Diferencia entre imagen y contenedor

La imagen Docker es la plantilla que contiene Node.js, Express y los archivos de la aplicación. El contenedor es una instancia en ejecución de esa imagen. El comando `docker build` crea o actualiza la imagen, mientras que `docker run` crea y arranca el contenedor.

Por este motivo, cuando se modifica `app.js`, hay que reconstruir la imagen y crear de nuevo el contenedor para que el cambio se copie dentro de Docker:

```powershell
docker build -t servidor-node .
docker rm -f servidor-node
docker run -d --name servidor-node -p 3000:3000 servidor-node
```
