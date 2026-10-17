import express from "express";
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("saludo");
});

app.get("/productos", (req, res) => {
  res.send("hola mundo desde Productos");
});

//EJERCICIOS RA2 - BLOQUE 1

//Ejercicio 1 - Se mezcla lógica y html en el html (aqui no hay nada)
app.get("/ejercicio1", (req, res) => {
  res.render("ra2/bloque1/ej1");
});

//Ejercicio 2 - Se mezcla lógica y html en el html (aqui no hay nada)
app.get("/ejercicio2", (req, res) => {
  res.render("ra2/bloque1/ej2");
});

//Ejercicio 3 - Declaramos variables y las llamamos en el html
app.get("/ejercicio3", (req, res) => {
  const tituloLibro = "El Principito"
  const precioLibro = 10.90
  const disponible = true

  res.render("ra2/bloque1/ej3", {
    tituloLibro,
    precioLibro,
    disponible
  })
});

//Ejercicio 4 - Declaramos variables y las llamamos en el html y usamos operadores
app.get("/ejercicio4", (req, res) => {
  const tituloLibro = "El Principito"
  const precioLibro = 10.90
  const disponible = true
  const precioConIva = precioLibro * 1.21

  res.render("ra2/bloque1/ej4", {
    tituloLibro,
    precioLibro,
    disponible,
    precioConIva
  })
});

//Ejercicio 5 - Creamos una frase con los datos de las variables
app.get("/ejercicio5", (req, res) => {
  const tituloLibro = "El Principito"
  const precioLibro = 10.90
  const precioConIva = precioLibro * 1.21

  res.render("ra2/bloque1/ej5", {
    tituloLibro,
    precioLibro,
    precioConIva
  })
});


//EJERCICIOS RA2 - BLOQUE 2

//Ejercicio 6 - Creamos una ficha de un libro con los datos de las variables
app.get("/ejercicio6", (req, res) => {
  const tituloLibro = "El Principito"
  const precioLibro = 10.90
  const precioConIva = precioLibro * 1.21
  const disponible = true

  res.render("ra2/bloque2/ej6", {
    tituloLibro,
    precioLibro,
    precioConIva,
    disponible,
  })
});

//Ejercicio 7 - Creamos un array con los datos del libro y los llamamos asi en el HTML
app.get("/ejercicio7", (req, res) => {
  const libro = {
    titulo: "El principito",
    precioBase: 18.50,
    disponibilidad: true,
    precioIva: 18.50 * 1.21
  };

  res.render("ra2/bloque2/ej7", {
    libro
  });
});

//Ejercicio 8 - Creamos tres arrays diferentes de libros con datos y creamos las tres fichas de los libros de forma manual en el HTML
app.get("/ejercicio8", (req, res) => {
  const libro1 = {
    titulo: "El principito",
    precioBase: 18.50,
    disponibilidad: true,
    precioIva: 18.50 * 1.21
  };
  const libro2 = {
    titulo: "Un monstruo viene a verme",
    precioBase: 24.99,
    disponibilidad: true,
    precioIva: 24.99 * 1.21
  };
  const libro3 = {
    titulo: "Invisible",
    precioBase: 21.50,
    disponibilidad: false,
    precioIva: 21.50 * 1.21
  };

  res.render("ra2/bloque2/ej8", {
    libro1,
    libro2,
    libro3
  });
});

//Ejercicio 9 - Creamos un array con los datos de un libro pero para calcular el IVA hacemos una función
app.get("/ejercicio9", (req, res) => {
  const libro = {
    titulo: "El principito",
    precioBase: 18.50,
    disponibilidad: true,
  };
  const calcularPrecioConIva = (precioBase) => precioBase * 1.21;

  res.render("ra2/bloque2/ej9", {
    libro,
    calcularPrecioConIva
  });
});

//Ejercicio 10 
app.get("/ejercicio10", (req, res) => {
  const libro = {
    titulo: "El principito",
    precioBase: 18.50,
    disponibilidad: true,
  };
  const calcularPrecioConIva = (precioBase) => precioBase * 1.21;
  const nodeEnv = process.env.NODE_ENV;

  res.render("ra2/bloque3/ej10", {
    libro,
    calcularPrecioConIva,
    nodeEnv,
    esProduccion: nodeEnv === "production"
  });
});

//Ejercicio 11 
app.get("/ejercicio11", (req, res) => {
  const tituloLibro = "El Principito"
  const precioLibro = 10.90
  const precioConIva = precioLibro * 1.21
  const disponible = true

  res.render("ra2/bloque3/ej11", {
    tituloLibro,
    precioLibro,
    precioConIva,
    disponible,
  })
});

app.listen(3000);
