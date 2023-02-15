import { Router } from "express";
import Contenedor from "../model/Contenedor.js";
import { contenedorProductos } from "./productosRuta.js";

const carritoRuta = Router();
const contenedorCarrito = new Contenedor("carritos.txt");

// Crear carro
carritoRuta.post("/", async (req, res) => {
  const carrito = {
    timestamp: Date.now(),
    productos: [],
  };
  const id = await contenedorCarrito.save(carrito);
  res.json({ "ID del carro nuevo": id });
});

// Eliminar carro
carritoRuta.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const carrito = await contenedorCarrito.deleteById(id);
  res.json({ "Carrito eliminado": carrito });
});

// Consultar por productos de un carro
carritoRuta.get("/:id/productos", async (req, res) => {
  const id = parseInt(req.params.id);
  const carrito = await contenedorCarrito.getById(id);  // ¿Sería peor o mejor que el carrito tenga un array de IDs de productos?
  res.json(carrito.productos);
});

// Agregar producto a un carro
carritoRuta.post("/:id/productos/:id_prod", async (req, res) => {
  try{
    const id = parseInt(req.params.id);
    const carrito = await contenedorCarrito.getById(id);
    if(!carrito) res.status(404).json({"error": -3, "descripcion": `carrito ${id} no encontrado`});

    const id_prod = parseInt(req.params.id_prod);
    const producto = await contenedorProductos.getById(id_prod);
    if (!producto) res.status(404).json({"error": -3, "descripcion": `producto ${id_prod} no encontrado`});

    carrito.productos.push(producto);
    const nuevoCarrito = await contenedorCarrito.updateById(id, carrito);

    res.json({ nuevoCarrito });
  } catch(e) {
    // Hay una manera con thorw new Error() para que el catch reciba el error y lo muestre acá, ojo que es más limpio, lo buscaré después
    console.log(`Ha ocurrido un error: ${e}, probablemente dado por elegir un ID de producto o de carro que no existe`);
  }
});

// Eliminar producto de un carro
carritoRuta.delete("/:id/productos/:id_prod", async (req, res) => {
  const id = parseInt(req.params.id);
  const id_prod = parseInt(req.params.id_prod);
  if (!id || !id_prod) res.status(404).json({"error": -3, "descripcion": `carrito (${id}) o producto (${id_prod}) con un ID que no es un número en alguno de los dos`});

  const carrito = await contenedorCarrito.getById(id);
  if (!carrito) res.status(404).json({"error": -3, "descripcion": `carrito (${id}) no encontrado`});

  const indice = carrito.productos.findIndex(prod=>prod.id==id_prod);  // Viene como string, por eso el ==
  if (indice === -1) res.status(404).json({"error": -3, "descripcion": `producto (${id_prod}) no encontrado en el carrito (${id})`});

  carrito.productos.splice(indice, 1);
  const nuevoCarrito = await contenedorCarrito.updateById(id, carrito);

  res.json({ nuevoCarrito });
  // Duda: ¿Cómo anido los if para que no se pasen a lo siguiente? O es mejor usar un return? Porque el response.algo() no corta el callback handler de la petición
});

carritoRuta.use((req, res) => res.status(404).json({ error: -2, descripcion: `ruta api/carrito/${req.path} método ${req.method} no implementada` }));

export default carritoRuta;