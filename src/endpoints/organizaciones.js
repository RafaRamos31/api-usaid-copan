import { createOrganizacion, deleteOrganizacion, editOrganizacion, getOrganizacionById, getOrganizaciones } from "../controllers/organizaciones-controller.js";

export const getOrganizacionesEndpoints = (app, upload) => {

  //GET organizaciones
  app.get("/api/organizaciones", upload.any(), async (request, response) => {
    try {
      const organizaciones = await getOrganizaciones(
        request.body.tipoOrganizacion,
        request.body.nivelOrganizacion,
        request.body.idDepartamento,
        request.body.idMunicipio,
        request.body.idAldea,
        request.body.idCaserio,
      );
      response.json(organizaciones);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al obtener las organizaciones: ' + error });
    }
  })

  //GET Organizacion by Id
  app.get("/api/organizacion", upload.any(), async (request, response) => {
    try {
      const organizacion = await getOrganizacionById(request.body.idOrganizacion);
      if(!organizacion) return response.status(404).send('Organizacion no encontrada');

      response.json(organizacion);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al obtener la organizacion: ' + error });
    }
  })

  //POST Organizacion
  app.post("/api/organizaciones", upload.any(), async (request, response) => {
    try {
      const organizacion = await createOrganizacion(
        request.body.codigoOrganizacion,
        request.body.idOrgtype,
        request.body.nivelOrganizacion,
        request.body.nombre,
        request.body.idDepartamento,
        request.body.idMunicipio,
        request.body.idAldea,
        request.body.idCaserio,
        request.body.telefonoOrganizacion,
        request.body.nombreContacto,
        request.body.telefonoContacto,
        request.body.correoContacto
      );
      response.json(organizacion);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al registrar la organizacion: ' + error });
    }
  })


  //PUT Editar Organizacion
  app.put("/api/organizaciones", upload.any(), async (request, response) => {
    try {
      const organizacion = await editOrganizacion(
        request.body.idOrganizacion,
        request.body.codigoOrganizacion,
        request.body.idOrgtype,
        request.body.nivelOrganizacion,
        request.body.nombre,
        request.body.idDepartamento,
        request.body.idMunicipio,
        request.body.idAldea,
        request.body.idCaserio,
        request.body.telefonoOrganizacion,
        request.body.nombreContacto,
        request.body.telefonoContacto,
        request.body.correoContacto
      );

      if(!organizacion) return response.status(404).send('Organizacion no encontrada');

      response.json(organizacion);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al modificar la organizacion: ' + error });
    }
  })

  //DELETE Eliminar organizacion
  app.delete("/api/organizaciones", upload.any(), async (request, response) => {
    try {
      const organizacion = await deleteOrganizacion(request.body.idOrganizacion);
      if(!organizacion) return response.status(404).send('Organizacion no encontrada');

      response.json(organizacion);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al eliminar la organizacion: ' + error });
    }
  })

  return app;
}