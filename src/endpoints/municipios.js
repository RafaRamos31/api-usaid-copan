import { createMunicipio, deleteMunicipio, editMunicipio, getMunicipioById, getMunicipiosByDepto } from "../controllers/municipios-controller.js";

export const getMunicipiosEndpoints = (app, upload) => {

  //GET municipios
  app.get("/api/municipios", upload.any(), async (request, response) => {
    try {
      const municipios = await getMunicipiosByDepto(request.body.idDepartamento);
      response.json(municipios);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al obtener los municipios: ' + error });
    }
  })

  //GET municipio by Id
  app.get("/api/municipio", upload.any(), async (request, response) => {
    try {
      const municipio = await getMunicipioById(request.body.idMunicipio);
      if(!municipio) return response.status(404).send('Municipio no encontrado');

      response.json(municipio);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al obtener el municipio: ' + error });
    }
  })

  //POST municipio
  app.post("/api/municipios", upload.any(), async (request, response) => {
    try {
      const municipio = await createMunicipio(
        request.body.nombre,
        request.body.geocode,
        request.body.idDepartamento,
      );
      response.json(municipio);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al registrar el municipio: ' + error });
    }
  })

  //PUT modificar municipio
  app.put("/api/municipios", upload.any(), async (request, response) => {
    try {
      const municipio = await editMunicipio(
        request.body.idMunicipio,
        request.body.nombre,
        request.body.geocode,
        request.body.idDepartamento,
      );
  
      if(!municipio) return response.status(404).send('Municipio no encontrado');

      response.status(200).json({municipio});
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al modificar el Municipio: ' + error });
    }
  })


  //DELETE eliminar municipio
  app.delete("/api/municipios", upload.any(), async (request, response) => {
    try {
      const municipio = await deleteMunicipio(
        request.body.idMunicipio
      );

      if(!municipio) return response.status(404).send('Municipio no encontrado');

      response.status(200).json({municipio});
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al eliminar el Municipio: ' + error });
    }
  })

  return app;
}