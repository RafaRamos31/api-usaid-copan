import { createUsuario, deleteUsuario, editUsuario, getUsuarioById, getUsuarios } from "../controllers/usuarios-controller.js";

export const getUsuariosEndpoints = (app, upload) => {

  //GET usuarios
  app.get("/api/usuarios", upload.any(), async (request, response) => {
    try {
      const usuarios = await getUsuarios(
        request.body.idOrganizacion,
        request.body.idCargo,
        request.body.idComponente,
        request.body.idRol
      );
      response.json(usuarios);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al obtener los Usuarios: ' + error });
    }
  })

  //GET Usuario by Id
  app.get("/api/usuario", upload.any(), async (request, response) => {
    try {
      const usuario = await getUsuarioById(request.body.idUsuario);
      if(!usuario) return response.status(404).send('Usuario no encontrado');

      response.json(usuario);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al obtener el usuario: ' + error });
    }
  })

  //POST Usuario
  app.post("/api/usuarios", upload.any(), async (request, response) => {
    try {
      const usuario = await createUsuario(
        request.body.nombre,
        request.body.sexo,
        request.body.idOrganizacion,
        request.body.idCargo,
        request.body.idComponente,
        request.body.idRol,
        request.body.correo,
        request.body.password
      );
      response.json(usuario);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al registrar el usuario: ' + error });
    }
  })


  //PUT Editar Usuario
  app.put("/api/usuarios", upload.any(), async (request, response) => {
    try {
      const usuario = await editUsuario(
        request.body.idUsuario,
        request.body.nombre,
        request.body.sexo,
        request.body.idOrganizacion,
        request.body.idCargo,
        request.body.idComponente,
        request.body.idRol,
        request.body.correo
      );

      if(!usuario) return response.status(404).send('Usuario no encontrado');

      response.json(usuario);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al modificar el usuario: ' + error });
    }
  })

  //DELETE Eliminar usuario
  app.delete("/api/usuarios", upload.any(), async (request, response) => {
    try {
      const usuario = await deleteUsuario(request.body.idUsuario);
      if(!usuario) return response.status(404).send('Usuario no encontrado');

      response.json(usuario);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al eliminar el usuario: ' + error });
    }
  })

  return app;
}