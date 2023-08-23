import { createCargo, deleteCargo, editCargo, getCargoById, getCargosByOrg } from "../controllers/cargos-controller.js";

export const getCargosEndpoints = (app, upload) => {

  //GET cargos
  app.get("/api/cargos", upload.any(), async (request, response) => {
    try {
      const cargos = await getCargosByOrg(request.body.idOrganizacion);
      response.json(cargos);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al obtener los cargos: ' + error });
    }
  })

  //GET cargo by Id
  app.get("/api/cargo", upload.any(), async (request, response) => {
    try {
      const cargo = await getCargoById(request.body.idCargo);
      if(!cargo) return response.status(404).send('Cargo no encontrado');

      response.json(cargo);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al obtener el cargo: ' + error });
    }
  })

  //POST cargo
  app.post("/api/cargos", upload.any(), async (request, response) => {
    try {
      const cargo = await createCargo(
        request.body.nombre,
        request.body.idOrganizacion,
      );
      response.json(cargo);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al registrar el cargo: ' + error });
    }
  })

  //PUT modificar cargo
  app.put("/api/cargos", upload.any(), async (request, response) => {
    try {
      const cargo = await editCargo(
        request.body.idCargo,
        request.body.nombre,
        request.body.idOrganizacion,
      );
  
      if(!cargo) return response.status(404).send('Cargo no encontrado');

      response.status(200).json({cargo});
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al modificar el Cargo: ' + error });
    }
  })


  //DELETE eliminar cargo
  app.delete("/api/cargos", upload.any(), async (request, response) => {
    try {
      const cargo = await deleteCargo(
        request.body.idCargo
      );

      if(!cargo) return response.status(404).send('Cargo no encontrado');

      response.status(200).json({cargo});
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al eliminar el Cargo: ' + error });
    }
  })

  return app;
}