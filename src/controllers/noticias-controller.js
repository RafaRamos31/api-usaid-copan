/**
 * Archivo para definir metodos de acceso a la base de datos de MongoDB
 * Para manipular los registros de la coleccion de Noticias
 *
 * Autor: USAID - Proyecto Avanzando por la Salud de Honduras
 * Fecha: Junio 2023
 * Versión: 1.0.0
 */
import Noticia from "../models/noticia.js";
import { getFilter } from "../utilities/queryConstructor.js";
import { createArchivosNoticia, deleteArchivosNoticia, privateCrearArchivo, privateDeleteArchivo } from "./archivos-controller.js";
import { privateGetMunicipioById } from "./municipiosController.js";
import { privateGetUnidadTecnicaById } from "./unidadTecnicaController.js";

/**
 * Registra la base de dato y obtiene una lista de noticias, 
 * ordenadas de la mas reciente a la mas antigua y
 * definiendo un limite de entradas por peticion
 * @returns Un arreglo de noticias cumpliendo con los filtros establecidos
 */

//Get paged
export const getPagedNoticias = async (req, res) => {
  try {
    const { page, pageSize, ut=null, municipio=null, query=null } = req.body;

    const noticias = (await Noticia.find(getFilter({ut, municipio, query}))
    .limit(pageSize)
    .skip(page * pageSize)
    .populate("unidadTecnica").populate("archivos").populate("municipio"));
    
    const count = await Noticia.countDocuments(getFilter({ut, municipio, query}))
    
    res.json({ count, noticias });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las noticias: ' + error });
  }
}

//Create
export const crearNoticia = async (req, res) => {
  try {
    const {unidadTecnicaId, municipioId, contenido} = req.body;
    const files = req.files;

    const unidadTecnica = await privateGetUnidadTecnicaById(unidadTecnicaId)
    if(!unidadTecnica) return res.status(404).json({ error: 'Error al crear la Noticia. Unidad Técnica no encontrada.' });

    const municipio = await privateGetMunicipioById(municipioId)
    if(!municipio) return res.status(404).json({ error: 'Error al crear la Noticia. Municipio no encontrado.' });

    const archivos = await createArchivosNoticia(files);

    const noticia = new Noticia({
      unidadTecnica,
      municipio,
      fechaPublicacion: new Date(),
      contenido,
      archivos
    });

    noticia.save();
    
    res.json(noticia);
  } catch (error) {
    res.status(500).json({ error: 'Error al subir la noticia: ' + error });
  }
}


//Edit
export const editNoticia = async (req, res) => {
  try {
    const {id, unidadTecnicaId, municipioId, contenido} = req.body;

    const noticia = await Noticia.findById(id)
    if(!noticia) return res.status(404).json({ error: 'Error al modificar la Noticia. Noticia no encontrada.' });

    const unidadTecnica = await privateGetUnidadTecnicaById(unidadTecnicaId)
    if(!unidadTecnica) return res.status(404).json({ error: 'Error al modificar la Noticia. Unidad Técnica no encontrada.' });

    const municipio = await privateGetMunicipioById(municipioId)
    if(!municipio) return res.status(404).json({ error: 'Error al modificar la Noticia. Municipio no encontrado.' });

    noticia.unidadTecnica = unidadTecnica;
    noticia.municipio = municipio;
    noticia.contenido = contenido;

    noticia.save();
    
    res.json(noticia);
  } catch (error) {
    res.status(500).json({ error: 'Error al modificar la noticia: ' + error });
  }
}


//Edit Add Archivo
export const editAddArchivo = async (req, res) => {
  try {
    const { id } = req.body;
    const file = req.files[0];

    const noticia = await Noticia.findById(id)
    if(!noticia) return res.status(404).json({ error: 'Error al modificar la Noticia. Noticia no encontrada.' });

    const archivo = await privateCrearArchivo({file, detail: true});

    noticia.archivos = noticia.archivos.concat([archivo._id])

    noticia.save();
    
    res.json(archivo);
  } catch (error) {
    res.status(500).json({ error: 'Error al modificar la noticia: ' + error });
  }
}


//Edit Delete Archivo
export const editDeleteArchivo = async (req, res) => {
  try {
    const { id, archivoId } = req.body;

    const noticia = await Noticia.findById(id)
    if(!noticia) return res.status(404).json({ error: 'Error al modificar la Noticia. Noticia no encontrada.' });

    const archivo = await privateDeleteArchivo(archivoId);
    
    res.json(archivo);
  } catch (error) {
    res.status(500).json({ error: 'Error al modificar la noticia: ' + error });
  }
}


//Delete Noticia
export const deleteNoticia = async (req, res) => {
  try {
    const { id, deleteFiles=false } = req.body;

    const noticia = await Noticia.findById(id)
    if(!noticia) return res.status(404).json({ error: 'Error al eliminar la Noticia. Noticia no encontrada.' });

    if(JSON.parse(deleteFiles)){
      deleteArchivosNoticia(noticia.archivos)
    }

    noticia.delete();
    res.json(noticia);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la noticia: ' + error });
  }
}
