import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);  // Para que funcione con los ES6 Modules

class Contenedor {
  constructor(nombreArchivo) {
    this.ruta = path.resolve(__dirname, '..', 'db', nombreArchivo);
  }

  async getAll() {
    try {
      const productos = await fs.promises.readFile(this.ruta, 'utf-8');
      return JSON.parse(productos);  //Ojo con el error si es que parto con un archivo vacío
    } catch (error) {
      console.log("No se pudo leer el archivo desde el filesystem, tu error es el siguiente: " + error);
    }
  }

  async getById(id) {
    try {
      const productos = await this.getAll();
      const producto = productos.find(prod => prod.id === id);

      if (!producto) return null;
      return producto;
    } catch (error) {
      console.log("No se pudo leer el archivo desde el filesystem, tu error es el siguiente: " + error);
    }
  }

  async save(producto) {
    const productos = await this.getAll();
    const ultimoId = productos.length === 0 ? 0 : productos[productos.length - 1].id;
    const nuevoId = ultimoId + 1;

    producto.id = nuevoId;
    productos.push(producto);
    await fs.promises.writeFile(this.ruta, JSON.stringify(productos, null, 2));

    return nuevoId;
  }

  async updateById(id, nuevoProducto) {
    const nuevosProductos = await this.getAll();
    const index = nuevosProductos.findIndex(prod => prod.id === id);
    if (index === -1) return null;

    nuevosProductos[index] = { id, ...nuevoProducto };
    
    await fs.promises.writeFile(this.ruta, JSON.stringify(nuevosProductos, null, 2));
    return nuevoProducto;
  }



  async deleteById(id) {
    try{
      const productos = await this.getAll();
      const indice = productos.findIndex(prod => prod.id === id);
      if (indice === -1) {
        return null;
      } else {
        const productoEliminado = productos[indice];

        productos.splice(indice, 1);
        await fs.promises.writeFile(this.ruta, JSON.stringify(productos, null, 2));

        return productoEliminado;
      }
    } catch (error) {
      console.log("Por alguna extraña razón no se pudo escribir el archivo desde el filesystem, tu error es el siguiente: " + error);
    }
  }

  async deleteAll() {
    try{
      await fs.promises.writeFile(this.ruta, JSON.stringify([]));
    } catch (error) {
      console.log("Por alguna extraña razón no se pudo escribir el archivo desde el filesystem, tu error es el siguiente: " + error);
    }
  }
}

export default Contenedor;
