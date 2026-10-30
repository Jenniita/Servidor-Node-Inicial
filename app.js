import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
const app = express();

app.set("view engine", "ejs");
app.use(cookieParser());
app.use(session({
  secret: "ejercicio-ra4-sesion",
  resave: false,
  saveUninitialized: false
}));
app.use(express.urlencoded({ extended: false }));

const usuarios = [
  { nombre: "usuario", password: "1234", rol: "usuario" },
  { nombre: "admin", password: "admin123", rol: "admin" }
];

function comprobarSesion(req, res, next) {
  if (!req.session.usuario) return res.redirect("/ejercicio16");
  next();
}

function comprobarAdmin(req, res, next) {
  if (!req.session.usuario || req.session.usuario.rol !== "admin") {
    return res.redirect("/ejercicio16");
  }
  next();
}

const catalogoRA3 = [
  { titulo: "El principito", precio: 18.50, disponible: true, oferta: false },
  { titulo: "Un monstruo viene a verme", precio: 24.99, disponible: true, oferta: true },
  { titulo: "Invisible", precio: 21.50, disponible: false, oferta: false },
  { titulo: "Don Quijote", precio: 15, disponible: true, oferta: false },
  { titulo: "La casa de Bernarda Alba", precio: 12, disponible: false, oferta: false }
];

function puedePrestarse(usuario, libro) {
  if (!usuario) return false;
  if (!usuario.activo) return false;
  if (!libro.disponible) return false;
  return true;
}

// Calcula el precio del libro con IVA.
function precioConIva(libro) {
  return libro.precio * 1.21;
}

// Devuelve el estado del libro según su oferta y disponibilidad.
function estadoLibro(libro) {
  if (libro.oferta) return "¡En oferta!";
  else if (libro.disponible) return "Disponible";
  else return "Agotado";
}

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

//EJERCICIOS RA2 - BLOQUE 3

//Ejercicio 10 - 
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

//EJERCICIOS RA3 - BLOQUE 1

//Ejercicio 1
app.get("/ra3/ejercicio1", (req, res) => {
  res.render("ra3/bloque1/ej1", { libro: catalogoRA3[1] });
});

//Ejercicio 2
app.get("/ra3/ejercicio2", (req, res) => {
  const usuario = { activo: true };
  const libro = catalogoRA3[0];
  res.render("ra3/bloque1/ej2", {
    sePuedePrestar: puedePrestarse(usuario, libro)
  });
});

//Ejercicio 3
app.get("/ra3/ejercicio3", (req, res) => {
  res.render("ra3/bloque1/ej3", { libros: catalogoRA3 });
});

//Ejercicio 4
app.get("/ra3/ejercicio4", (req, res) => {
  const disponibles = catalogoRA3.filter(libro => libro.disponible).length;
  res.render("ra3/bloque1/ej4", { disponibles, total: catalogoRA3.length });
});

//Ejercicio 5
app.get("/ra3/ejercicio5", (req, res) => {
  res.render("ra3/bloque1/ej5", { libros: catalogoRA3, precioConIva, estadoLibro });
});

//EJERCICIOS RA3 - BLOQUE 2

//Ejercicio 6
app.get("/ra3/ejercicio6", (req, res) => {
  res.render("ra3/bloque2/ej6");
});

//Ejercicio 7
app.get("/ra3/ejercicio7", (req, res) => {
  res.render("ra3/bloque2/ej7", { busqueda: req.query.busqueda || "" });
});

//Ejercicio 8
app.get("/ra3/ejercicio8", (req, res) => {
  const busqueda = (req.query.busqueda || "").toLowerCase();
  const libros = catalogoRA3.filter(libro =>
    libro.titulo.toLowerCase().includes(busqueda)
  );
  res.render("ra3/bloque2/ej8", { libros, busqueda: req.query.busqueda || "" });
});

//Ejercicio 9
app.get("/ra3/ejercicio9", (req, res) => {
  const busqueda = (req.query.busqueda || "").toLowerCase();
  const disponibles = req.query.disponibles || "todos";
  const libros = catalogoRA3.filter(libro =>
    libro.titulo.toLowerCase().includes(busqueda) &&
    (disponibles === "todos" || libro.disponible)
  );
  res.render("ra3/bloque2/ej9", {
    libros,
    busqueda: req.query.busqueda || "",
    disponibles
  });
});

//Ejercicio 10
app.get("/ra3/ejercicio10", (req, res) => {
  const busqueda = (req.query.busqueda || "").toLowerCase();
  const disponibles = req.query.disponibles || "todos";
  const libros = catalogoRA3.filter(libro =>
    libro.titulo.toLowerCase().includes(busqueda) &&
    (disponibles === "todos" || libro.disponible)
  );
  res.render("ra3/bloque2/ej10", {
    libros,
    busqueda: req.query.busqueda || "",
    disponibles
  });
});

//EJERCICIOS RA3 - BLOQUE 3
//Ejercicio 11
app.get("/ra3/ejercicio11", (req, res) => {
  res.render("ra3/bloque3/ej11", { busqueda: req.query.busqueda || "" });
});

app.post("/ra3/ejercicio11", (req, res) => {
  res.render("ra3/bloque3/ej11", { busqueda: req.body.busqueda || "" });
});

//Ejercicio 12
app.get("/ra3/ejercicio12", (req, res) => {
  const busqueda = (req.query.busqueda || "").toLowerCase();
  const libros = [];

  for (const libro of catalogoRA3) {
    if (libro.titulo.toLowerCase().includes(busqueda)) libros.push(libro);
  }

  res.render("ra3/bloque3/ej12", { libros, busqueda: req.query.busqueda || "" });
});

//EJERCICIOS RA4 - BLOQUE 1

//Ejercicio 12
app.get("/ejercicio12", (req, res) => {
  //Creamos una variable de visitas que inicializamos en 0
  let visitas = 0;
  //Y luego queremos que a esa variable se le sume 1
  visitas = visitas + 1;

  res.render("ra4/bloque1/ej12", {
    visitas
  })
});

//Ejercicio 13
app.get("/ejercicio13", (req, res) => {
  res.render("ra4/bloque1/ej13", {
    ultimaBusqueda: req.cookies.ultimaBusqueda
  });
});


app.get("/ejercicio13/guardar", (req, res) => {
  res.cookie("ultimaBusqueda", req.query.termino, { maxAge: 1000 * 60 * 60 * 24 * 30 });
  res.redirect("/ejercicio13");
});

//Ejercicio 14
app.get("/ejercicio14", (req, res) => {
  req.session.visitas = (req.session.visitas || 0) + 1;
  res.render("ra4/bloque1/ej14",
    { visitas: req.session.visitas });
});

//Ejercicio 15
app.get("/ejercicio15", comprobarSesion, (req, res) => {
  res.render("ra4/bloque1/ej15", { libros: req.session.libros || [] });
});

app.get("/ejercicio15/apartar", comprobarSesion, (req, res) => {
  req.session.libros = req.session.libros || [];
  req.session.libros.push(req.query.libro);
  res.redirect("/ejercicio15");
});

//EJERCICIOS RA4 - BLOQUE 2
//Ejercicio 16
app.get("/ejercicio16", (req, res) => {
  res.render("ra4/bloque2/ej16", {
    usuario: req.session.usuario,
    error: false
  });
});

app.post("/ejercicio16", (req, res) => {
  const usuario = usuarios.find(
    (u) => u.nombre === req.body.usuario && u.password === req.body.password
  );

  if (!usuario) {
    return res.render("ra4/bloque2/ej16", {
      usuario: null,
      error: true
    });
  }

  req.session.usuario = { nombre: usuario.nombre, rol: usuario.rol };
  res.redirect(usuario.rol === "admin" ? "/ejercicio19" : "/ejercicio18");
});

//Ejercicio 17
app.get("/ejercicio17", (req, res, next) => {
  req.session.destroy((error) => {
    if (error) return next(error);
    res.render("ra4/bloque2/ej17");
  });
});

//Ejercicio 18
app.get("/ejercicio18", comprobarSesion, (req, res) => {
  res.render("ra4/bloque2/ej18", { libros: req.session.libros || [] });
});

app.get("/ejercicio18/apartar", comprobarSesion, (req, res) => {
  req.session.libros = req.session.libros || [];
  req.session.libros.push(req.query.libro);
  res.redirect("/ejercicio18");
});

//Ejercicio 19
app.get("/ejercicio19", comprobarAdmin, (req, res) => {
  res.render("ra4/bloque2/ej19");
});

//EJERCICIO RA4 - BLOQUE 3
//Ejercicio 20
app.get("/ejercicio20", (req, res) => {
  res.render("ra4/bloque3/ej20", { termino: req.query.termino });
});

app.post("/ejercicio20", (req, res) => {
  res.render("ra4/bloque3/ej20", { termino: req.body.termino });
});

//Ejercicio 21
app.get("/ejercicio21", (req, res) => {
  const catalogo = ["El Principito", "Un monstruo viene a verme", "Invisible"];
  const busqueda = req.query.busqueda || "";
  const libros = catalogo.filter(libro =>
    libro.toLowerCase().includes(busqueda.toLowerCase())
  );

  res.render("ra4/bloque3/ej21", { libros, busqueda });
});



app.listen(3000);
