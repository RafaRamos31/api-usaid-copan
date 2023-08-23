import { createRol, deleteRol, editRol, getAllRoles, getRolById } from "../controllers/roles-controller.js";

export const getRolesEndpoints = (app, upload) => {
  //GET roles
  app.get("/api/roles", async (request, response) => {
    try {
      const roles = await getAllRoles();
      response.json(roles);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al obtener los roles: ' + error });
    }
  })

  //GET rol by Id
  app.get("/api/rol", upload.any(), async (request, response) => {
    try {
      const rol = await getRolById(request.body.idRol);
      if(!rol) return response.status(404).send('Rol no encontrado');
      
      response.json(rol);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al obtener el rol: ' + error });
    }
  })

  //POST roles
  app.post("/api/roles", upload.any(), async (request, response) => {
    try {
      const roles = await createRol(request.body.nombre);
      response.json(roles);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al registrar el rol: ' + error });
    }
  })

  //PUT modificar departamento
  app.put("/api/roles", upload.any(), async (request, response) => {
    try {
      const rol = await editRol(
        request.body.idRol,
        request.body.nombre,
      );
  
      if(!rol) return response.status(404).send('Rol no encontrado');

      response.status(200).json({rol});
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al modificar Rol: ' + error });
    }
  })


  //DELETE eliminar departamento
  app.delete("/api/roles", upload.any(), async (request, response) => {
    try {
      const rol = await deleteRol(
        request.body.idRol
      );

      if(!rol) return response.status(404).send('Rol no encontrado');

      response.status(200).json({rol});
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al eliminar Rol: ' + error });
    }
  })

  return app;
}