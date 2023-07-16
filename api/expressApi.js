import { crearArchivos, eliminarArchivo, getArchivos, getCountArchivos, publicarArchivo, sumarDescarga } from "./src/controllers/archivos-controller.js";
import { crearDepartamento, eliminarDepartamento, getAllDepartamentos, modificarDepartamento } from "./src/controllers/departamentos-controller.js";
import { addNoticia, addNoticiaPC, eliminarNoticia, getCountNoticias, getNoticias, modificarNoticia } from "./src/controllers/noticias-controller.js";
import { getUserById, login, register } from "./src/controllers/usuarios-controller.js";
import multer from "multer";

/**
 * Separa la logica de definicion de rutas y su respuesta a peticiones REST
 * @param {express} app Un servidor inicializado de express
 * @returns El mismo objeto de servidor pero con las rutas REST definidas
 */
export function addRestDirections(app) {
  //Middleware para la recepcion de archivos desde un formulario del Frontend
  const upload = new multer();

  // * * *  NOTICIAS  * * *

  //GET noticias
  app.get("/api/noticias/:index?", upload.any(), async (request, response) => {
    try {
      const index = request.params.index;
      const idDepartamento = request.body.idDepartamento;
      const noticias = await getNoticias(index, idDepartamento);
      response.json(noticias);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al obtener las noticias: ' + error });
    }
  });

  //POST noticias
  app.post("/api/noticias", upload.any(), async (request, response) => {
    try {
      //Se crea un nuevo objeto de noticia y se envia a MongoDB
      const noticia = await addNoticia({
        deptoId: request.body.departamento, 
        contenido: request.body.contenido,
        archivos: request.body.archivos
      });

      //La API devuelve como respuesta la noticia completa
      response.status(200).json({noticia});
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al publicar noticia: ' + error });
    }
  });


  //POST noticias
  app.post("/api/noticiasFile", upload.any(), async (request, response) => {
    try {
      //Se crea un nuevo objeto de noticia y se envia a MongoDB
      const noticia = await addNoticiaPC({
        deptoId: request.body.departamento, 
        contenido: request.body.contenido,
        files: request.files
      });

      //La API devuelve como respuesta la noticia completa
      response.status(200).json({noticia});
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al publicar noticia: ' + error });
    }
  });


  // * * *  ARCHIVOS  * * *

  //GET archivos
  app.get("/api/archivos", upload.any(), async (request, response) => {
    try {
      const archivos = await getArchivos(
        request.body.index,
        request.body.type
      );
      response.json(archivos);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al obtener los archivos: ' + error });
    }
  })

  //POST publicar archivo ya existente
  app.post("/api/archivos", upload.any(), async (request, response) => {
    const data = {
      nombre: request.body.nombre,
      weight: request.body.weight,
      id: request.body.id,
    }
    try {
      const archivos = await publicarArchivo(data)
      response.status(200).json(archivos);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al publicar los archivos: ' + error });
    }
  });

  //POST publicar archivos nuevos
  app.post("/api/files", upload.any(), async (request, response) => {
    try {
      const archivos = await crearArchivos(request.files);
      response.status(200).json(archivos);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al crear los archivos: ' + error });
    }
    
  });
  return app;
}