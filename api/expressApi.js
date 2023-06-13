import { getDepartamentos } from "./src/controllers/departamentos-controller.js";
import { getNoticias } from "./src/controllers/noticias-controller.js";

export function addRestDirections(app) {

  //GET noticias
  app.get("/api/noticias", async (request, response) => {
    try {
      const datos = await getNoticias();
      response.json(datos);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      response.status(500).json({ error: 'Error al obtener los datos' });
    }
  });

  //POST noticias
  app.post("/api/noticias", (request, response) => {
    response.json(request);
  });

  //GET departamentos
  app.get("/api/departamentos", async (request, response) => {
    try {
      const datos = await getDepartamentos();
      response.json(datos);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      response.status(500).json({ error: 'Error al obtener los datos' });
    }
  })

  return app;
}