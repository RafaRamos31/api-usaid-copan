/**
 * Archivo para definir metodos de acceso a la base de datos de MongoDB
 * Para manipular los registros de la coleccion de Departamentos
 *
 * Autor: USAID - Proyecto Avanzando por la Salud de Honduras
 * Fecha: Junio 2023
 * Versión: 1.0.0
 */
import Valor from "../models/valor.js";

//Get List
export const getValoresList = async (req, res) => {
  try {
    const valores = await Valor.find();
    res.json(valores);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener lista de Valores: ' + error });
  }
}

//Create
export const createValor = async (req, res) => {
  const { nombre, descripcion } = req.body;
  try {
    const valor = new Valor({
      nombre,
      descripcion,
    });
  
    valor.save();

    res.status(201).json(valor);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el Valor: ' + error });
  }
}


//Edit
export const editValor = async (req, res) => {
  const { id, nombre, descripcion } = req.body;
  try {
    const valor = await Valor.findById(id)
    if(!valor) return res.status(404).json({ error: 'Error al editar el Valor. Valor no encontrado.' });

    valor.nombre = nombre;
    valor.descripcion = descripcion;

    valor.save();

    res.status(201).json(valor);
  } catch (error) {
    res.status(500).json({ error: 'Error al editar el Valor: ' + error });
  }
}

//Delete
export const deleteValor = async (req, res) => {
  const { id } = req.body;
  try {
    const valor = await Valor.findById(id)
    if(!valor) return res.status(404).json({ error: 'Error al eliminar el Valor. Valor no encontrado.' });

    valor.delete();

    res.status(201).json(valor);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar Valor: ' + error });
  }
}

