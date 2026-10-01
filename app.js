import express from "express";
const app = express();

app.set("view engine", "ejs")

app.get("/", (req, res) => {
  res.render("saludo");
});

app.get("/productos", (req, res) => {
  res.send("hola mundo desde Productos");
});

app.listen(3000);
