// No es necesario ya que el vite-express ya tiene un middleware de errores para rutas que no sean del cliente

const errorsMiddleware = (err, req, res, next) => {
  switch (err.status) {
    case 404:
      res.status(404).json({ error: -2, descripcion: `ruta ${req.path} método ${req.method} no implementada` });
      break;
    case 500:
      res.status(500).json({ error: -4, descripcion: `error interno del servidor` });
      break;
  }
  next();
};

export default errorsMiddleware;