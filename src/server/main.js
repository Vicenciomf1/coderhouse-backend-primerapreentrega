import express from "express";
import ViteExpress from "vite-express";
import dotenv from "dotenv";
import productosRuta from "./router/productosRuta.js";
import carritoRuta from "./router/carritoRuta.js";

// Configuraciones
dotenv.config();
const PORT = 3000;
const app = express();
ViteExpress.config({ mode: "development" });

// Para usar JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Endpoints no tomados por el enrutador del cliente

app.get("/hello", (req, res) => {
  res.send("Hello Vite + React!");
});

app.use("/api/productos", productosRuta);
app.use("/api/carrito", carritoRuta);


// Servimos la app del cliente usando el server de vite-express
ViteExpress.listen(app, PORT, () => {
  console.log(`Server escuchando en el puerto de Vite para sólo frontend, y en el puerto ${PORT} para fullstack`);
  console.log(`Abre http://localhost:${PORT} en el navegador para ver la app del cliente junto con el server de Express`);
  console.log(`La clave para ser administrador es 'authorization':'${process.env.TOKEN}' en el header de tu request`);
});
