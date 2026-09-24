import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("Hola, mundo con Node");
});

app.listen(3000);