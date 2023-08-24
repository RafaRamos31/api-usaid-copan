import multer from "multer";
import { getRolesEndpoints } from "../src/endpoints/roles.js";
import { getComponentesEndpoints } from "../src/endpoints/componentes.js";
import { getOrgTypesEndpoints } from "../src/endpoints/tiposOrganizaciones.js";
import { getDepartamentosEndpoints } from "../src/endpoints/departamentos.js";
import { getMunicipiosEndpoints } from "../src/endpoints/municipios.js";
import { getAldeasEndpoints } from "../src/endpoints/aldeas.js";
import { getCaseriosEndpoints } from "../src/endpoints/caserios.js";
import { getOrganizacionesEndpoints } from "../src/endpoints/organizaciones.js";
import { getCargosEndpoints } from "../src/endpoints/cargos.js";
import { getUsuariosEndpoints } from "../src/endpoints/usuarios.js";

/**
 * Separa la logica de definicion de rutas y su respuesta a peticiones REST
 * @param {express} app Un servidor inicializado de express
 * @returns El mismo objeto de servidor pero con las rutas REST definidas
 */
export function addRestDirections(app) {

  //Middleware para la recepcion de archivos desde un formulario del Frontend
  const upload = new multer();

  app = getRolesEndpoints(app, upload);
  app = getComponentesEndpoints(app, upload);
  app = getOrgTypesEndpoints(app, upload);
  app = getDepartamentosEndpoints(app, upload);
  app = getMunicipiosEndpoints(app, upload);
  app = getAldeasEndpoints(app, upload);
  app = getCaseriosEndpoints(app, upload);
  app = getOrganizacionesEndpoints(app, upload);
  app = getCargosEndpoints(app, upload);
  app = getUsuariosEndpoints(app, upload);

  return app;
}