import { getDepartamentos } from "./src/controllers/departamentos-controller.js";
import { sendFiles } from "./src/controllers/google-controller.js";
import { addNoticia, getNoticias } from "./src/controllers/noticias-controller.js";
import multer from "multer";

export function addRestDirections(app) {
  const upload = new multer();
  //GET noticias
  app.get("/api/noticias", async (request, response) => {
    try {
      const datos = await getNoticias();
      response.json(datos);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      response.status(500).json({ error: 'Error al obtener los datos' });
    }
  });

  //POST noticias
  app.post("/api/noticias", upload.any(), async (request, response) => {
    const enlacesArchivos = await sendFiles(request.files);

    const noticia = await addNoticia({
      deptoId: request.body.departamento, 
      contenido: request.body.contenido,
      nombreArchivo: request.files[0]?.originalname,
      enlace: enlacesArchivos[0]
    });

    response.status(200).json({noticia});
  });

  //GET departamentos
  app.get("/api/departamentos", async (request, response) => {
    try {
      const datos = await getDepartamentos();
      response.json(datos);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      response.status(500).json({ error: 'Error al obtener los datos' });
    }
  })

   //GET drive
  app.post("/api/drive", upload.any(), async (request, response) => {
    response.status(200).send(await sendFiles(request.files));
  })

  return app;
}