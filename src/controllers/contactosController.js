/**
 * Archivo para definir metodos de acceso a la base de datos de MongoDB
 * Para manipular los registros de la coleccion de Departamentos
 *
 * Autor: USAID - Proyecto Avanzando por la Salud de Honduras
 * Fecha: Junio 2023
 * Versión: 1.0.0
 */
import Contacto from "../models/contacto.js";
import { privateGetMunicipioById } from "./municipiosController.js";


//Get List
export const getContactosList = async (req, res) => {
  try {
    const contactos = await Contacto.aggregate([
      {
        $match: { sectorRef: Number(process.env.WEB_SECTOR), departamentoRef: Number(process.env.WEB_DEPTO) }
      },
      {
        $group: {
          _id: '$municipio',
          contactos: { $push: { _id: '$_id', establecimiento: '$establecimiento', telefono: '$telefono', municipio: '$municipio', } }
        }
      },
    ]);
    res.json(contactos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener lista de Contactos: ' + error });
  }
}

//Create
export const createContacto = async (req, res) => {
  const { municipioId, establecimiento, telefono } = req.body;
  try {
    const municipio = await privateGetMunicipioById(municipioId)
    if(!municipio) return res.status(404).json({ error: 'Error al crear el Contacto. Contacto no encontrado.' });

    const contacto = new Contacto({
      establecimiento,
      telefono,
      municipio,
      departamentoRef: process.env.WEB_DEPTO,
      sectorRef: process.env.WEB_SECTOR
    });
  
    contacto.save();

    res.status(201).json(contacto);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el Contacto: ' + error });
  }
}


//Edit
export const editContacto = async (req, res) => {
  const { id, municipioId, establecimiento, telefono } = req.body;
  try {
    const contacto = await Contacto.findById(id)
    if(!contacto) return res.status(404).json({ error: 'Error al editar el Contacto. Contacto no encontrado.' });

    contacto.municipio = municipioId;
    contacto.establecimiento = establecimiento;
    contacto.telefono = telefono;

    contacto.save();

    res.status(201).json(contacto);
  } catch (error) {
    res.status(500).json({ error: 'Error al editar el Contacto: ' + error });
  }
}

//Delete
export const deleteContacto = async (req, res) => {
  const { id } = req.body;
  try {
    const contacto = await Contacto.findById(id)
    if(!contacto) return res.status(404).json({ error: 'Error al eliminar Contacto. Contacto no encontrado.' });

    contacto.delete();

    res.status(201).json(contacto);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar Contacto: ' + error });
  }
}

