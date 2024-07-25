import archivosRouter from "../routes/archivosRouter.js";
import contactosRouter from "../routes/contactosRouter.js";
import footerInfoRouter from "../routes/footerInfoRoutes.js";
import homeInfoRouter from "../routes/homeInfoRoutes.js";
import imagesRouter from "../routes/imagesRouter.js";
import mailRouter from "../routes/mailRouter.js";
import municipiosRouter from "../routes/municipiosRoutes.js";
import noticiasRouter from "../routes/noticiasRouter.js";
import unidadesTecnicasRouter from "../routes/unidadesTecnicasRouter.js";
import usuariosRouter from "../routes/usuariosRouter.js";
import valoresRouter from "../routes/valoresRouter.js";

export const setRoutes = (app) => {
  
  app.use('/api/municipios', municipiosRouter);
  app.use('/api/unidadestecnicas', unidadesTecnicasRouter);
  app.use('/api/archivos', archivosRouter);
  app.use('/api/noticias', noticiasRouter);
  app.use('/api/usuarios', usuariosRouter);
  app.use('/api/contactos', contactosRouter);
  app.use('/api/mail', mailRouter);
  app.use('/api/images', imagesRouter);
  app.use('/api/home', homeInfoRouter);
  app.use('/api/footer', footerInfoRouter);
  app.use('/api/valores', valoresRouter);
  
  return app
}