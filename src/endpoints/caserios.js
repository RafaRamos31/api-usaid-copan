import { createCaserio, deleteCaserio, editCaserio, getCaserioById, getCaseriosByAldea } from "../controllers/caserios-controller.js";

export const getCaseriosEndpoints = (app, upload) => {

  //GET caserios
  app.get("/api/caserios", upload.any(), async (request, response) => {
    try {
      const caserios = await getCaseriosByAldea(request.body.idAldea);
      response.json(caserios);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al obtener los caserios: ' + error });
    }
  })

  //GET caserio by Id
  app.get("/api/caserio", upload.any(), async (request, response) => {
    try {
      const caserio = await getCaserioById(request.body.idCaserio);
      if(!caserio) return response.status(404).send('Caserio no encontrado');

      response.json(caserio);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al obtener el caserio: ' + error });
    }
  })

  //POST caserio
  app.post("/api/caserios", upload.any(), async (request, response) => {
    try {
      const caserio = await createCaserio(
        request.body.nombre,
        request.body.geocode,
        request.body.idAldea,
      );
      response.json(caserio);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al registrar el caserio: ' + error });
    }
  })

  //PUT modificar caserio
  app.put("/api/caserios", upload.any(), async (request, response) => {
    try {
      const caserio = await editCaserio(
        request.body.idCaserio,
        request.body.nombre,
        request.body.geocode,
        request.body.idAldea,
      );
  
      if(!caserio) return response.status(404).send('Caserio no encontrado');

      response.status(200).json({caserio});
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al modificar el Caserio: ' + error });
    }
  })


  //DELETE eliminar caserio
  app.delete("/api/caserios", upload.any(), async (request, response) => {
    try {
      const caserio = await deleteCaserio(
        request.body.idCaserio
      );

      if(!caserio) return response.status(404).send('Caserio no encontrado');

      response.status(200).json({caserio});
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al eliminar el Caserio: ' + error });
    }
  })

  return app;
}