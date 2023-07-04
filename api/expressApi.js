import { getDepartamentos } from "./src/controllers/departamentos-controller.js";
import { addNoticia, getCountNoticias, getNoticias } from "./src/controllers/noticias-controller.js";
import multer from "multer";

/**
 * Separa la logica de definicion de rutas y su respuesta a peticiones REST
 * @param {express} app Un servidor inicializado de express
 * @returns El mismo objeto de servidor pero con las rutas REST definidas
 */
export function addRestDirections(app) {
  //Middleware para la recepcion de archivos desde un formulario del Frontend
  const upload = new multer();

  //GET noticias
  app.get("/api/noticias/:index?", async (request, response) => {
    const index = request.params.index;
    try {
      const noticias = await getNoticias(index);
      response.json(noticias);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al obtener las noticias: ' + error });
    }
  });

  //GET countNoticias
  app.get("/api/countnoticias", async (request, response) => {
    try {
      const count = await getCountNoticias();
      response.json({"filecount": count});
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al obtener el conteo de noticias: ' + error });
    }
  });

  //POST noticias
  app.post("/api/noticias", upload.any(), async (request, response) => {
    //Se crea un nuevo objeto de noticia y se envia a MongoDB
    const noticia = await addNoticia({
      deptoId: request.body.departamento, 
      contenido: request.body.contenido,
      archivos: request.body.archivos
    });

    //La API devuelve como respuesta la noticia completa
    response.status(200).json({noticia});
  });

  //GET departamentos
  app.get("/api/departamentos", async (request, response) => {
    try {
      const departamentos = await getDepartamentos();
      response.json(departamentos);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al obtener las noticias: ' + error });
    }
  })

  return app;
}