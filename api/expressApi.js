import { eliminarArchivo, getArchivos, getCountArchivos, publicarArchivo, sumarDescarga, crearArchivoChunk, subirChunks } from "../src/controllers/archivos-controller.js";
import { crearDepartamento, eliminarDepartamento, getAllDepartamentos, modificarDepartamento } from "../src/controllers/departamentos-controller.js";
import { addNoticia, eliminarNoticia, getCountNoticias, getNoticias, modificarNoticia } from "../src/controllers/noticias-controller.js";
import { getUserById, login, register } from "../src/controllers/usuarios-controller.js";
import multer from "multer";

/**
 * Separa la logica de definicion de rutas y su respuesta a peticiones REST
 * @param {express} app Un servidor inicializado de express
 * @returns El mismo objeto de servidor pero con las rutas REST definidas
 */
export function addRestDirections(app) {
  //Middleware para la recepcion de archivos desde un formulario del Frontend
  const upload = new multer();


  // * * *  DEPARTAMENTOS  * * *

  //GET departamentos
  app.get("/api/departamentos", async (request, response) => {
    try {
      const departamentos = await getAllDepartamentos();
      response.json(departamentos);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al obtener los departamentos: ' + error });
    }
  })

  //POST departamentos
  app.post("/api/departamentos", upload.any(), async (request, response) => {
    try {
      const departamento = await crearDepartamento({
        nombre: request.body.nombre,
        urlLogo: request.body.urlLogo
      });
  
      //La API devuelve como respuesta la noticia completa
      response.status(200).json({departamento});
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al ingresar Departamento: ' + error });
    }
  })


  //PUT modificar departamento
  app.put("/api/departamentos", upload.any(), async (request, response) => {
    try {
      const departamento = await modificarDepartamento({
        idDepartamento: request.body.idDepartamento,
        nombre: request.body.nombre,
        urlLogo: request.body.urlLogo
      });
  
      //La API devuelve como respuesta la noticia completa
      response.status(200).json({departamento});
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al modificar Departamento: ' + error });
    }
  })


  //DELETE eliminar departamento
  app.delete("/api/departamentos", upload.any(), async (request, response) => {
    try {
      const departamento = await eliminarDepartamento({
        idDepartamento: request.body.idDepartamento,
      });
  
      //La API devuelve como respuesta la noticia completa
      response.status(200).json({departamento});
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al eliminar Departamento: ' + error });
    }
  })


  // * * *  NOTICIAS  * * *

  //GET noticias
  app.get("/api/noticias/:index?/:idDepartamento?", upload.any(), async (request, response) => {
    try {
      const index = request.params.index;
      const idDepartamento = request.params.idDepartamento;
      const noticias = await getNoticias(index, idDepartamento);
      response.json(noticias);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al obtener las noticias: ' + error });
    }
  });

  //GET countNoticias
  app.get("/api/countnoticias/:idDepartamento?", async (request, response) => {
    try {
      const idDepartamento = request.params.idDepartamento;
      const count = await getCountNoticias(idDepartamento);
      response.json({"filecount": count});
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al obtener el conteo de noticias: ' + error });
    }
  });

  //POST noticias
  app.post("/api/noticias", upload.any(), async (request, response) => {
    try {
      //Se crea un nuevo objeto de noticia y se envia a MongoDB
      const noticia = await addNoticia({
        deptoId: request.body.departamento, 
        contenido: request.body.contenido,
        stringArchivos: request.body.archivos
      });

      //La API devuelve como respuesta la noticia completa
      response.status(200).json({noticia});
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al publicar noticia: ' + error });
    }
  });


  //PUT modificar noticias
  app.put("/api/noticias", upload.any(), async (request, response) => {
    try {
      const result = await modificarNoticia(request.body.idNoticia)
      response.status(200).json(result);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al modificar noticia: ' + error });
    }
  });


  //DELETE noticias
  app.delete("/api/noticias", upload.any(), async (request, response) => {
    try {
      const result = await eliminarNoticia(request.body.idNoticia)
      response.status(200).json(result);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al eliminar noticia: ' + error });
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

  //GET countArchivos
  app.get("/api/countArchivos", upload.any(), async (request, response) => {
    try {
      const archivos = await getCountArchivos(request.body.type);
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


  //POST envia los archivos por partes mas pequeñas
  app.post("/api/createChunk", upload.any(), async (request, response) => {
    try {
      const fileName = request.body.fileName;
      const type = request.body.type;

      response.status(200).json({id: await crearArchivoChunk(fileName, type)})

    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al crear el archivo de Drive: ' + error });
    } 
  });

  //POST envia los archivos por partes mas pequeñas
  app.post("/api/chunks", upload.any(), async (request, response) => {
    try {
      const id = request.body.id;
      const totalChunks = request.body.totalChunks;
      const actual = request.body.actual;
      const totalSize = request.body.totalSize;
      const start = request.body.start;
      const end = request.body.end;
      const data = request.files[0];

      const result = await subirChunks(id, data, start, end, totalSize, actual, totalChunks);
      response.status(200).json(result)
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al subir el archivo: ' + error });
    } 
  });

  //PUT aumentar descarga
  app.put("/api/archivos", upload.any(), async (request, response) => {
    try {
      const result = await sumarDescarga(request.body.idArchivo)
      response.status(200).json(result);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al registrar la descarga: ' + error });
    }
  });

  
   //DELETE eliminar archivo
  app.delete("/api/archivos", upload.any(), async (request, response) => {
    try {
      const result = await eliminarArchivo(request.body.idArchivo)
      response.status(200).json(result);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al eliminar el archivo: ' + error });
    }
  });


  // * * *  USUARIOS  * * *

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
  
  return app;
}