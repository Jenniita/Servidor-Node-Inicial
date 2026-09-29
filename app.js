import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("Hola, mundo con Node");
});

app.get("/productos", (req, res) => {
  res.send("hola mundo desde Productos");
});

app.listen(3000);
