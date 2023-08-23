import { createAldea, deleteAldea, editAldea, getAldeaById, getAldeasByMunicipio } from "../controllers/aldeas-controller.js";

export const getAldeasEndpoints = (app, upload) => {

  //GET aldeas
  app.get("/api/aldeas", upload.any(), async (request, response) => {
    try {
      const aldeas = await getAldeasByMunicipio(request.body.idMunicipio);
      response.json(aldeas);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al obtener las aldeas: ' + error });
    }
  })

  //GET aldea by Id
  app.get("/api/aldea", upload.any(), async (request, response) => {
    try {
      const aldea = await getAldeaById(request.body.idAldea);
      if(!aldea) return response.status(404).send('Aldea no encontrada');

      response.json(aldea);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al obtener la aldea: ' + error });
    }
  })

  //POST aldea
  app.post("/api/aldeas", upload.any(), async (request, response) => {
    try {
      const aldea = await createAldea(
        request.body.nombre,
        request.body.geocode,
        request.body.idMunicipio,
      );
      response.json(aldea);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al registrar la aldea: ' + error });
    }
  })

  //PUT modificar aldea
  app.put("/api/aldeas", upload.any(), async (request, response) => {
    try {
      const aldea = await editAldea(
        request.body.idAldea,
        request.body.nombre,
        request.body.geocode,
        request.body.idMunicipio,
      );
  
      if(!aldea) return response.status(404).send('Aldea no encontrada');

      response.status(200).json({aldea});
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al modificar la Aldea: ' + error });
    }
  })


  //DELETE eliminar aldea
  app.delete("/api/aldeas", upload.any(), async (request, response) => {
    try {
      const aldea = await deleteAldea(
        request.body.idAldea
      );

      if(!aldea) return response.status(404).send('Aldea no encontrada');

      response.status(200).json({aldea});
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al eliminar la Aldea: ' + error });
    }
  })

  return app;
}