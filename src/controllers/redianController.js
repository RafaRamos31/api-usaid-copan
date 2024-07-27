/**
 * Archivo para definir metodos de acceso a la base de datos de MongoDB
 * Para manipular los registros de la coleccion de Departamentos
 *
 * Autor: USAID - Proyecto Avanzando por la Salud de Honduras
 * Fecha: Junio 2023
 * Versión: 1.0.0
 */
import Redian from "../models/redian.js";
import { getInitialRedianBoards, getInitialUnidadesTecnicas } from "../utilities/initialData.js";


//Get List
export const getRedianList = async (req, res) => {
  try {
    let redian = await Redian.find({ref: process.env.WEB_DEPTO})
    if(redian.length === 0){
      await Redian.insertMany(getInitialRedianBoards())
      redian = await Redian.find({ref: process.env.WEB_DEPTO})
    }
    res.json(redian);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener lista de Tableros de REDI-AN: ' + error });
  }
}

//Create
export const createRedian = async (req, res) => {
  const { nombre, enlace } = req.body;
  try {
    const redian = new Redian({
      nombre,
      enlace,
      ref: process.env.WEB_DEPTO
    });
  
    redian.save();

    res.status(201).json(redian);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear Tablero de REDI-AN: ' + error });
  }
}


//Edit
export const editRedian = async (req, res) => {
  const { id, nombre, enlace } = req.body;
  try {
    const redian = await Redian.findById(id)
    if(!redian) return res.status(404).json({ error: 'Error al editar Tablero de REDI-AN. Tablero no encontrado.' });

    redian.nombre = nombre;
    redian.enlace = enlace;

    redian.save();

    res.status(201).json(redian);
  } catch (error) {
    res.status(500).json({ error: 'Error al editar Tablero de REDI-AN: ' + error });
  }
}

//Delete
export const deleteRedian = async (req, res) => {
  const { id } = req.body;
  try {
    const redian = await Redian.findById(id)
    if(!redian) return res.status(404).json({ error: 'Error al eliminar Tablero de REDI-AN. Tablero no encontrado.' });

    redian.delete();

    res.status(201).json(redian);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar Tablero de REDI-AN: ' + error });
  }
}

