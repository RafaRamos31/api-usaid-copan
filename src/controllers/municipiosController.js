import Municipio from "../models/municipio.js";
import { getInitialMunicipios } from '../utilities/initialData.js'


//Private Get By Id
export const privateGetMunicipioById = async (id) => {
  try {
    let municipio = await Municipio.findById(id)
    return municipio
  } catch (error) {
    throw error
  }
}


/**
 * Obtiene de la base de datos la lista de todos los municipios
 * @returns Un arreglo con todos los departamento de la BD
 */
export const getMunicipiosList = async (req, res) => {
  try {
    let municipios = await Municipio.find({ref: process.env.WEB_DEPTO})
    if(municipios.length === 0){
      await Municipio.insertMany(getInitialMunicipios())
      municipios = await Municipio.find({ref: process.env.WEB_DEPTO})
    }
    res.json(municipios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener lista de municipios: ' + error });
  }
}
