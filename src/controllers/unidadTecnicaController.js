/**
 * Archivo para definir metodos de acceso a la base de datos de MongoDB
 * Para manipular los registros de la coleccion de Departamentos
 *
 * Autor: USAID - Proyecto Avanzando por la Salud de Honduras
 * Fecha: Junio 2023
 * Versión: 1.0.0
 */
import UnidadTecnica from "../models/unidadTecnica.js";
import { getInitialUnidadesTecnicas } from "../utilities/initialData.js";


//Private Get By Id
export const privateGetUnidadTecnicaById = async (id) => {
  try {
    let unidadTecnica = await UnidadTecnica.findById(id)
    return unidadTecnica
  } catch (error) {
    throw error
  }
}


//Get List
export const getUnidadesTecnicasList = async (req, res) => {
  try {
    let unidades = await UnidadTecnica.find({ref: process.env.WEB_SECTOR})
    if(unidades.length === 0){
      await UnidadTecnica.insertMany(getInitialUnidadesTecnicas())
      unidades = await UnidadTecnica.find({ref: process.env.WEB_SECTOR})
    }
    res.json(unidades);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener lista de Unidades Técnicas: ' + error });
  }
}

//Create
export const createUnidadTecnica = async (req, res) => {
  const { nombre } = req.body;
  try {
    const unidadTecnica = new UnidadTecnica({
      nombre,
      ref: process.env.WEB_SECTOR
    });
  
    unidadTecnica.save();

    res.status(201).json(unidadTecnica);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear Unidad Técnica: ' + error });
  }
}


//Edit
export const editUnidadTecnica = async (req, res) => {
  const { id, nombre } = req.body;
  try {
    const unidadTecnica = await UnidadTecnica.findById(id)
    if(!unidadTecnica) return res.status(404).json({ error: 'Error al editar la Unidad Técnica. Unidad Técnica no encontrada.' });

    unidadTecnica.nombre = nombre

    unidadTecnica.save();

    res.status(201).json(unidadTecnica);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear Unidad Técnica: ' + error });
  }
}

//Delete
export const deleteUnidadTecnica = async (req, res) => {
  const { id } = req.body;
  try {
    const unidadTecnica = await UnidadTecnica.findById(id)
    if(!unidadTecnica) return res.status(404).json({ error: 'Error al eliminar la Unidad Técnica. Unidad Técnica no encontrada.' });

    unidadTecnica.delete();

    res.status(201).json(unidadTecnica);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear Unidad Técnica: ' + error });
  }
}

