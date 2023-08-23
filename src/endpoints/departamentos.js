import { createDepartamento, deleteDepartamento, editDepartamento, getAllDepartamentos, getDepartamentoById } from "../controllers/departamentos-controller.js";

export const getDepartamentosEndpoints = (app, upload) => {

  //GET departamentos
  app.get("/api/departamentos", async (request, response) => {
    try {
      const departamentos = await getAllDepartamentos();
      response.json(departamentos);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al obtener los departamentos: ' + error });
    }
  })

  //GET departamento by Id
  app.get("/api/departamento", upload.any(), async (request, response) => {
    try {
      const departamento = await getDepartamentoById(request.body.idDepartamento);
      if(!departamento) return response.status(404).send('Departamento no encontrado');

      response.json(departamento);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al obtener el departamento: ' + error });
    }
  })

  //POST departamento
  app.post("/api/departamentos", upload.any(), async (request, response) => {
    try {
      const departamento = await createDepartamento(
        request.body.nombre,
        request.body.geocode
      );
      response.json(departamento);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al registrar el departamento: ' + error });
    }
  })

  //PUT modificar departamento
  app.put("/api/departamentos", upload.any(), async (request, response) => {
    try {
      const departamento = await editDepartamento(
        request.body.idDepartamento,
        request.body.nombre,
        request.body.geocode,
      );
  
      if(!departamento) return response.status(404).send('Departamento no encontrado');

      response.status(200).json({departamento});
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al modificar el Departamento: ' + error });
    }
  })


  //DELETE eliminar departamento
  app.delete("/api/departamentos", upload.any(), async (request, response) => {
    try {
      const departamento = await deleteDepartamento(
        request.body.idDepartamento
      );

      if(!departamento) return response.status(404).send('Departamento no encontrado');

      response.status(200).json({departamento});
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al eliminar el Departamento: ' + error });
    }
  })

  return app;
}