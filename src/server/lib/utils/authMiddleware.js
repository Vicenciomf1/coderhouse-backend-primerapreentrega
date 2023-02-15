const authMiddleware = ((req, res, next) => {
  req.header('authorization') === process.env.TOKEN
    ? next()
    : res.status(401).json({"error": -1, "descripcion": `ruta ${req.path} método ${req.method} no autorizada`});
});

export default authMiddleware;
