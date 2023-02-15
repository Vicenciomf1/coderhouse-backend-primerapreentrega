import { Router } from "express";
import Contenedor from "../model/Contenedor.js";
import authMiddleware from "../lib/utils/authMiddleware.js";

const productosRuta = Router();
export const contenedorProductos = new Contenedor("productos.txt");

productosRuta.get("/", async (req, res) => {
  const productos = await contenedorProductos.getAll();
  res.json(productos);
});

productosRuta.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (!id) res.status(404).json({"error": -3, "descripcion": "producto no encontrado, o usaste un ID que no es un número"});

  const producto = await contenedorProductos.getById(id);
  res.json(producto);
});

productosRuta.post("/", authMiddleware, async (req, res) => {
  const producto = { "timestamp": new Date(), ...req.body };
  const id = await contenedorProductos.save(producto);
  res.json({ id, ...producto });
});

productosRuta.put("/:id", authMiddleware, async (req, res) => {
  const id = parseInt(req.params.id);
  if (!id) res.status(404).json({"error": -3, "descripcion": "producto no encontrado, o usaste un ID que no es un número"});

  const producto = { "timestamp": new Date(), ...req.body };
  const nuevoProducto = await contenedorProductos.updateById(id, producto);
  res.json(nuevoProducto);
});

productosRuta.delete("/:id", authMiddleware, async (req, res) => {
  const id = parseInt(req.params.id);
  if (!id) res.status(404).json({"error": -3, "descripcion": "producto no encontrado, o usaste un ID que no es un número"});

  const producto = await contenedorProductos.deleteById(id);
  res.json(producto);
});


productosRuta.use((req, res) => res.status(404).json({ "error": -2, "descripcion": `ruta api/productos${req.path} método ${req.method} no implementada` }));

export default productosRuta;