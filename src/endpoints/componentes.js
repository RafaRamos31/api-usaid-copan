import { createComponente, deleteComponente, editComponente, getAllComponentes, getComponentById } from "../controllers/componentes-controller.js";

export const getComponentesEndpoints = (app, upload) => {

  //GET componentes
  app.get("/api/componentes", async (request, response) => {
    try {
      const componentes = await getAllComponentes();
      response.json(componentes);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al obtener los componentes: ' + error });
    }
  })

  //GET componente by Id
  app.get("/api/componente", upload.any(), async (request, response) => {
    try {
      const componente = await getComponentById(request.body.idComponente);
      if(!componente) return response.status(404).send('Componente no encontrado');

      response.json(componente);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al obtener el componente: ' + error });
    }
  })

  //POST componentes
  app.post("/api/componentes", upload.any(), async (request, response) => {
    try {
      const componentes = await createComponente(request.body.nombre);
      response.json(componentes);
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al registrar el componente: ' + error });
    }
  })

  //PUT modificar componente
  app.put("/api/componentes", upload.any(), async (request, response) => {
    try {
      const componente = await editComponente(
        request.body.idComponente,
        request.body.nombre,
      );
  
      if(!componente) return response.status(404).send('Componente no encontrado');

      response.status(200).json({componente});
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al modificar Componente: ' + error });
    }
  })


  //DELETE eliminar componente
  app.delete("/api/componentes", upload.any(), async (request, response) => {
    try {
      const componente = await deleteComponente(
        request.body.idComponente
      );

      if(!componente) return response.status(404).send('Componente no encontrado');

      response.status(200).json({componente});
    } catch (error) {
      response.status(500).json({ error: 'Ocurrió un error al eliminar el Componente: ' + error });
    }
  })

  return app;
}