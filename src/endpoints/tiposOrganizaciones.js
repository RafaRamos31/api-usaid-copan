import { createOrgType, deleteOrgType, editOrgType, getAllOrgTypes, getOrgTypeById } from "../controllers/tiposOrganizaciones-controller.js";

export const getOrgTypesEndpoints = (app, upload) => {

  //GET tipos de organizaciones
  app.get("/api/orgtypes", async (request, response) => {
    try {
      const orgtypes = await getAllOrgTypes();
      response.json(orgtypes);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al obtener los Tipos de Organizaciones: ' + error });
    }
  })

  //GET tipo de organizacion by Id
  app.get("/api/orgtype", upload.any(), async (request, response) => {
    try {
      const orgtype = await getOrgTypeById(request.body.idOrgtype);
      if(!orgtype) return response.status(404).send('Tipo de Organizacion no encontrado');

      response.json(orgtype);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al obtener el Tipo de Organizacion: ' + error });
    }
  })

  //POST tipo de organizacion
  app.post("/api/orgtypes", upload.any(), async (request, response) => {
    try {
      const orgtype = await createOrgType(request.body.nombre);
      response.json(orgtype);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al registrar el tipo de organizacion: ' + error });
    }
  })

  //PUT modificar tipo de organizacion
  app.put("/api/orgtypes", upload.any(), async (request, response) => {
    try {
      const orgtype = await editOrgType(
        request.body.idOrgtype,
        request.body.nombre,
      );
  
      if(!orgtype) return response.status(404).send('Tipo de Organizacion no encontrado');

      response.status(200).json({orgtype});
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al modificar el Tipo de Organizacion: ' + error });
    }
  })


  //DELETE eliminar tipo de organizacion
  app.delete("/api/orgtypes", upload.any(), async (request, response) => {
    try {
      const orgtype = await deleteOrgType(
        request.body.idOrgtype
      );

      if(!orgtype) return response.status(404).send('Tipo de Organizacion no encontrado');

      response.status(200).json({orgtype});
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al eliminar el Tipo de Organizacion: ' + error });
    }
  })

  return app;
}