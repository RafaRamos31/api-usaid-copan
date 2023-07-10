import { eliminarArchivo, getArchivos, publicarArchivos } from "./src/controllers/archivos-controller.js";
import { getDepartamentos } from "./src/controllers/departamentos-controller.js";
import { addNoticia, getCountNoticias, getNoticias } from "./src/controllers/noticias-controller.js";
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
      response.status(500).json({ error: 'Ocurrió un error al obtener los departamentos: ' + error });
    }
  })

  //GET archivos
  app.get("/api/archivos", async (request, response) => {
    try {
      const archivos = await getArchivos();
      response.json(archivos);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al obtener los archivos: ' + error });
    }
  })

  //POST login
  app.post("/api/login", upload.any(), async (request, response) => {
    try {
      const user = await login(request.body.nombre, request.body.password);
      response.json(user);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al iniciar sesion: ' + error });
    }
  })

  //POST register
  app.post("/api/register", upload.any(), async (request, response) => {
    try {
      const user = await register(request.body.nombre, request.body.password);
      response.json(user._id);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al registrar al usuario: ' + error });
    }
  })

   //GET validate
  app.get("/api/validate", upload.any(), async (request, response) => {
    try {
      const user = await getUserById(request.body.userId);
      response.json(user);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al validar la sesion actual: ' + error });
    }
  })

   //POST archivos
  app.post("/api/archivos", upload.any(), async (request, response) => {

    const archivos = await publicarArchivos(request.body.archivos)

    response.status(200).json(archivos);
  });


   //DELETE archivos
  app.post("/api/deleteArchivo", upload.any(), async (request, response) => {
    const result = await eliminarArchivo(request.body.idArchivo)
    response.status(200).json(result);
  });

  return app;
}