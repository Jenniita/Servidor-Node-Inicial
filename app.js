import express from "express";
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("saludo");
});

app.get("/productos", (req, res) => {
  res.send("hola mundo desde Productos");
});

app.get("/ejercicio2", (req, res) => {
  res.render("ra2/bloque1/ej2");
});

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

app.listen(3000);
