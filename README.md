# Servidor-Node-Inicial

## Desarrollo con Docker

Los pasos para construir y arrancar la aplicación están explicados al final, en «Arranque con Docker».

## Ejercicios RA2

Fecha: 09/10/2026

Las rutas se definen en `app.js` con `app.get(direccion, funcion)`. La dirección (`/ejercicio2`, por ejemplo) es la URL que se abre en el navegador. Dentro de la función, `res.render()` le pide a Express que procese una plantilla EJS de la carpeta `views` y envíe el HTML generado. Al indicar la plantilla se escribe su ruta relativa a `views`, sin la extensión `.ejs`.

Las vistas de estos ejercicios están en `views/ra2/bloque1/`. Por tanto, `res.render("ra2/bloque1/ej2")` busca `views/ra2/bloque1/ej2.ejs`. Para ver el resultado se visita la ruta del servidor, por ejemplo `http://localhost:3000/ejercicio2`; no se abre el archivo `.ejs` directamente.

### Ejercicio 2: expresiones EJS

La plantilla `ej2.ejs` mezcla HTML normal con expresiones EJS. El HTML organiza el contenido y `<%= expresión %>` evalúa una expresión e inserta su resultado en la página. En el ejercicio se usa para mostrar `5 + 5` y la hora actual.

La hora se obtiene con `new Date().toLocaleTimeString(...)`. Las opciones `es-ES` y `Europe/Madrid` indican el formato español y la zona horaria peninsular. La ruta `/ejercicio2` renderiza esta plantilla sin tener que pasarle datos adicionales.

EJS también permite usar `<% código %>` para ejecutar JavaScript sin imprimir directamente su resultado, por ejemplo para declarar variables o controlar partes de una plantilla.

### Ejercicio 3: pasar variables a la plantilla

La ruta `/ejercicio3` declara los datos del libro en `app.js`: `tituloLibro`, `precioLibro` y `disponible`. Se envían a la plantilla como segundo argumento de `res.render()`:

```js
res.render("ra2/bloque1/ej3", {
  tituloLibro,
  precioLibro,
  disponible
});
```

El objeto es el puente entre Express y EJS: cada propiedad queda disponible en la plantilla como una variable con el mismo nombre. Por eso `ej3.ejs` puede imprimir el título con `<%= tituloLibro %>` y el precio con `<%= precioLibro %>`. La expresión `<%= disponible ? "Disponible" : "No disponible" %>` elige el texto según el valor booleano. Si se cambia un dato en la ruta, la plantilla muestra el nuevo valor al volver a cargar `/ejercicio3`.

### Ejercicio 4: calcular el precio con IVA

La ruta `/ejercicio4` reutiliza los datos del libro, calcula `precioConIva` multiplicando `precioLibro` por `1.21` y pasa también el resultado en el objeto de `res.render()`. La plantilla `ej4.ejs` muestra título, precio antes de IVA, precio con IVA y disponibilidad. Así, el cálculo se hace en la ruta y la plantilla se ocupa de presentar los datos.

Para repetir el patrón con otros datos o cálculos:

1. Define los valores o calcula el resultado en la ruta de Express.
2. Pasa a `res.render()` un objeto con las propiedades que necesita la plantilla.
3. Escribe esas variables en la plantilla con `<%= nombreVariable %>`; para una decisión sencilla puedes usar una expresión condicional.
4. Asegúrate de que la ruta de la plantilla coincide con su ubicación dentro de `views` y abre la URL de la ruta.

### Rutas disponibles

- `/` renderiza `views/saludo.ejs`.
- `/productos` responde con un mensaje de texto de prueba.
- `/ejercicio2` renderiza el ejercicio de expresiones EJS.
- `/ejercicio3` muestra las variables del libro.
- `/ejercicio4` muestra los datos del libro y el cálculo del precio con IVA.

### Arranque con Docker

`compose.yaml` publica el puerto `3000`, monta el proyecto en `/app` y ejecuta `node --watch app.js`. La primera vez, o si hay que reconstruir la imagen, desde la carpeta del proyecto ejecuta:

```powershell
docker compose up --build
```

En los siguientes arranques basta con `docker compose up`. Detén el servicio con `Ctrl+C` y visita `http://localhost:3000/ejercicio2`, `/ejercicio3` o `/ejercicio4` para probar los ejercicios. El montaje de volumen hace que los cambios en los archivos estén disponibles dentro del contenedor; las plantillas EJS se vuelven a procesar al solicitar la página.
