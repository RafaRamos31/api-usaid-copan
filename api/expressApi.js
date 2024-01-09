import { eliminarArchivo, getArchivos, getCountArchivos, publicarArchivo, sumarDescarga, crearArchivoChunk, subirChunks, queryArchivos, modificarArchivo, getOficios } from "../src/controllers/archivos-controller.js";
import { getContactosConfig, getFooterConfig, getGeneralConfig, getValoresConfig, updateContactosConfig, updateFooterConfig, updateGeneralConfig, updateValoresConfig } from "../src/controllers/config-controller.js";
import { crearDepartamento, eliminarDepartamento, getAllDepartamentos, modificarDepartamento, populateUnidadesSalud } from "../src/controllers/departamentos-controller.js";
import { sendMail } from "../src/controllers/mail-controller.js";
import { addNoticia, eliminarNoticia, getCountNoticias, getNoticias, modificarNoticia, queryNoticias } from "../src/controllers/noticias-controller.js";
import { createAdmin, deleteUser, getUserById, getUsers, login, register, updatePassword } from "../src/controllers/usuarios-controller.js";
import multer from "multer";

/**
 * Separa la logica de definicion de rutas y su respuesta a peticiones REST
 * @param {express} app Un servidor inicializado de express
 * @returns El mismo objeto de servidor pero con las rutas REST definidas
 */
export function addRestDirections(app) {
  //Middleware para la recepcion de archivos desde un formulario del Frontend
  const upload = new multer();

  //POST Correo
  app.post("/api/mail", upload.any(), async (request, response) => {
    try {
      const result = await sendMail(
        request.body.pagina,
        request.body.nombre,
        request.body.apellido,
        request.body.municipio,
        request.body.comunidad,
        request.body.correo,
        request.body.telefono,
        request.body.asunto
      )
      response.json(result);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al enviar email: ' + error });
    }
  })


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
        nombre: request.body.nombre
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
  app.post("/api/noticias/get", upload.any(), async (request, response) => {
    try {
      const index = request.body.index;
      const idDepartamento = request.body.idDepartamento;
      const municipio = request.body.municipio;
      const noticias = await getNoticias(index, idDepartamento, municipio);
      response.json(noticias);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al obtener las noticias: ' + error });
    }
  });

  //GET noticias Oficios
  app.get("/api/noticias/oficios/:year?", upload.any(), async (request, response) => {
    try {
      const year = request.params.year
      const oficios = await getOficios(year);
      response.json(oficios);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al obtener las noticias: ' + error });
    }
  });


  //GET noticias Query
  app.post("/api/noticiasQuery", upload.any(), async (request, response) => {
    try {
      const noticias = await queryNoticias(request.body.query);
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
        municipio: request.body.municipio, 
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
      const result = await modificarNoticia(request.body.idNoticia, request.body.departamento, request.body.municipio, request.body.contenido)
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
  app.get("/api/archivos/:index?/:type?", upload.any(), async (request, response) => {
    try {
      const archivos = await getArchivos(
        request.params.index,
        request.params.type
      );
      response.json(archivos);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al obtener los archivos: ' + error });
    }
  })

  //GET queryArchivos
  app.post("/api/query", upload.any(), async (request, response) => {
    try {
      const archivos = await queryArchivos(request.body.query)
      response.status(200).json(archivos);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al obtener los archivos: ' + error });
    }
  });


  //GET countArchivos
  app.get("/api/countArchivos/:type", upload.any(), async (request, response) => {
    try {
      const archivos = await getCountArchivos(request.params.type);
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
  app.put("/api/archivos/:id", upload.any(), async (request, response) => {
    try {
      const result = await sumarDescarga(request.params.id)
      response.status(200).json(result);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al registrar la descarga: ' + error });
    }
  });

  //PUT aumentar descarga
  app.put("/api/archivos", upload.any(), async (request, response) => {
    try {
      const result = await modificarArchivo(request.body.idArchivo, request.body.nombre)
      response.status(200).json(result);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al modificar el archivo: ' + error });
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

  //GET allUsers
  app.get("/api/admin/userlist", upload.any(), async (request, response) => {
    try {
      const users = await getUsers()
      response.json(users);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al iniciar sesion: ' + error });
    }
  })

  //POST login
  app.post("/api/login", upload.any(), async (request, response) => {
    try {
      const user = await login(request.body.username, request.body.password);
      response.json(user);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al iniciar sesion: ' + error });
    }
  })

  //POST cambiar contraseña
  app.post("/api/setpassword", upload.any(), async (request, response) => {
    try {
      const user = await updatePassword(request.body.idUsuario, request.body.password);
      response.json(user);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al cambiar clave de usuario: ' + error });
    }
  })

  //POST register
  app.post("/api/register", upload.any(), async (request, response) => {
    try {
      const user = await register(request.body.nombre, request.body.username, request.body.rol, request.body.masterId);
      response.json(user);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al registrar al usuario: ' + error });
    }
  })

   //GET validate
  app.get("/api/validate/:userId", upload.any(), async (request, response) => {
    try {
      const user = await getUserById(request.params.userId);
      response.json(user);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al validar la sesion actual: ' + error });
    }
  })

  //Delete usuario
  app.delete("/api/usuarios", upload.any(), async (request, response) => {
    try {
      const user = await deleteUser(request.body.idUsuario);
      response.json(user);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al eliminar usuario: ' + error });
    }
  })

  //POST crear admin usuario
  app.post("/api/admin", upload.any(), async (request, response) => {
    try {
      const user = await createAdmin(request.body.name, request.body.username, request.body.password);
      response.json(user);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al crear usuario: ' + error });
    }
  })

  // * * *  CONFIGURACION  * * *

  //Get Config General
  app.get("/api/config/general", async (request, response) => {
    try {
      const config = await getGeneralConfig();
      response.json(config);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al recibir la configuracion del sitio: ' + error });
    }
  })


  //Update Config General
  app.put("/api/config/general", upload.any(), async (request, response) => {
    try {

      const config = await updateGeneralConfig({
        nosotros: request.body.nosotros,
        mensaje: request.body.mensaje,
        autor: request.body.autor,
        mision: request.body.mision,
        vision: request.body.vision,
        urlMapa: request.body.urlMapa,
      })
      response.json(config);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al actualizar la configuracion del sitio: ' + error });
    }
  })

  //Get Config Valores
  app.get("/api/config/valores", async (request, response) => {
    try {
      const config = await getValoresConfig();
      response.json(config);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al recibir la configuracion del sitio: ' + error });
    }
  })


  //Update Config Valores
  app.put("/api/config/valores", upload.any(), async (request, response) => {
    try {

      const config = await updateValoresConfig({
        names: request.body.names,
        values: request.body.values
      })
      response.json(config);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al actualizar la configuracion del sitio: ' + error });
    }
  })

  //Get Config Footer
  app.get("/api/config/footer", async (request, response) => {
    try {
      const config = await getFooterConfig();
      response.json(config);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al recibir la configuracion del sitio: ' + error });
    }
  })

  //Update Config Footer
  app.put("/api/config/footer", upload.any(), async (request, response) => {
    try {

      const config = await updateFooterConfig({
        footerCorreo: request.body.footerCorreo,
        footerDireccion: request.body.footerDireccion,
        footerTelefonos: request.body.footerTelefonos,
        footerDesc: request.body.footerDesc,
        footerEnlace: request.body.footerEnlace,
        footerRedes: request.body.footerRedes,
      })
      response.json(config);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al actualizar la configuracion del sitio: ' + error });
    }
  })


  //Get Config Contactos
  app.get("/api/config/contactos", async (request, response) => {
    try {
      const config = await getContactosConfig();
      response.json(config);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al recibir la configuracion del sitio: ' + error });
    }
  })


  //Update Config Contactos
  app.put("/api/config/contactos", upload.any(), async (request, response) => {
    try {

      const config = await updateContactosConfig({
        contactos: request.body.contactos
      })
      response.json(config);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al actualizar la configuracion del sitio: ' + error });
    }
  })

  //Update Crear unidades
  app.post("/api/config/unidades", upload.any(), async (request, response) => {
    try {

      const result = await populateUnidadesSalud();
      response.json(result);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al actualizar la configuracion del sitio: ' + error });
    }
  })
  
  return app;
}


