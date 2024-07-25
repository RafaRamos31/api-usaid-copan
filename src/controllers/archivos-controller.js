/**
 * Archivo para definir metodos de acceso a la base de datos de MongoDB
 * Para manipular los registros de la coleccion de Archivos
 *
 * Autor: USAID - Proyecto Avanzando por la Salud de Honduras
 * Fecha: Junio 2023
 * Versión: 1.0.0
 */

import Archivo from "../models/archivo.js";
import { getFilter } from "../utilities/queryConstructor.js";
import { deleteDriveFile, uploadFile } from "./google-controller.js";


//Get paged
export const getPagedArchivos = async (req, res) => {
  try {
    const { page, pageSize, tipo='Documento', queryArchivo=null, ut=null, municipio=null, query=null } = req.body;

    const archivos = (await Archivo.find(getFilter({tipo, queryArchivo, ut, municipio, query}))
    .limit(pageSize)
    .skip(page * pageSize));

    const count = await Archivo.countDocuments(getFilter({tipo, queryArchivo, ut, municipio, query}))
    
    res.json({ count, archivos });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los archivos: ' + error });
  }
}

//Create
export const crearArchivo = async (req, res) => {
  try {
    const data = req.files[0];

    //Subir archivo a Google Drive
    const fileId = await uploadFile(data.originalname, data.mimetype, data.buffer)

    const archivo = new Archivo({
      tipo: determinarTipo(data.originalname),
      docType: determinarTipoArchivo(data.originalname),
      nombre: data.originalname,
      tamano: data.size,
      fileId: fileId,
      enlace: 'https://drive.google.com/file/d/' + fileId + '/view',
      descargar: 'https://drive.google.com/u/0/uc?id=' + fileId + '&export=download',
      totalDescargas: 0
    });

    archivo.save();
    
    res.json(archivo);
  } catch (error) {
    res.status(500).json({ error: 'Error al subir el archivo: ' + error });
  }
}

//Private Create
export const privateCrearArchivo = async ({file, detail=false}) => {
  try {
    //Subir archivo a Google Drive
    const fileId = await uploadFile(file.originalname, file.mimetype, file.buffer)

    const archivo = new Archivo({
      tipo: determinarTipo(file.originalname),
      docType: determinarTipoArchivo(file.originalname),
      nombre: file.originalname,
      tamano: file.size,
      fileId: fileId,
      enlace: 'https://drive.google.com/file/d/' + fileId + '/view',
      descargar: 'https://drive.google.com/u/0/uc?id=' + fileId + '&export=download',
      totalDescargas: 0
    });

    archivo.save();

    if(detail){
      return archivo
    }
    else{
      return archivo._id;
    }
    
  } catch (error) {
    throw error;
  }
}


//Create archivos noticia
export const createArchivosNoticia = async (files) => {
  try {

    const promises = files.map(async (file) => {
      const id = await privateCrearArchivo({file});
      return id;
    });
  
    const ids = await Promise.all(promises);
    return ids;

  } catch (error) {
    throw error;
  }
}


//Sumar descarga
export const sumarDescarga = async (req, res) => {
  try {
    const { id } = req.body;

    const archivo = await Archivo.findById(id)
    if(!archivo) return res.status(404).json({ error: 'Error al editar el Archivo. Archivo no encontrado.' });

    archivo.totalDescargas = archivo.totalDescargas + 1;
    archivo.save();
    
    res.json(archivo);
  } catch (error) {
    res.status(500).json({ error: 'Error al modificar el archivo: ' + error });
  }
}

//Edit
export const modificarArchivo = async (req, res) => {
  try {
    const { id, nombre } = req.body;

    const archivo = await Archivo.findById(id)
    if(!archivo) return res.status(404).json({ error: 'Error al editar el Archivo. Archivo no encontrado.' });

    archivo.nombre = nombre;
    archivo.save();
    
    res.json(archivo);
  } catch (error) {
    res.status(500).json({ error: 'Error al modificar el archivo: ' + error });
  }
}

//Delete
export const eliminarArchivo = async (req, res) => {
  try {
    const { id } = req.body;

    const archivo = await Archivo.findById(id)
    if(!archivo) return res.status(404).json({ error: 'Error al eliminar el Archivo. Archivo no encontrado.' });
    
    deleteDriveFile(archivo.fileId);
    archivo.delete();

    res.json(archivo);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el archivo: ' + error });
  }
}

//Private Delete
export const privateDeleteArchivo = async (id) => {
  try {
    const archivo = await Archivo.findById(id)
    if(!archivo) return null
    
    deleteDriveFile(archivo.fileId);
    archivo.delete();

    return archivo;
  } catch (error) {
    throw error
  }
}

//Delete all archivos noticia
export const deleteArchivosNoticia = async (filesList) => {
  try {

    const promises = filesList.map(async (file) => {
      const archivo = await privateDeleteArchivo(file);
      return archivo;
    });
  
    const archivos = await Promise.all(promises);
    return archivos;

  } catch (error) {
    throw error;
  }
}


/**
 * Obtiene el tipo de un archivo enviado en base a su extension de nombre
 * @param {string} nombreArchivo El nombre del archivo enviado
 * @returns Retorna un string con el tipo de archivo 
 */
export function determinarTipo(nombreArchivo){
  //Evita el proceso logico al no tener un nombre de archivo
  if(!nombreArchivo) return "";
  
  //Extensiones fijas para cada tipo de archivo
  const extensionesDocumento = ["doc", "docx", "pdf", "xls", "xlsx", "xlsm", "ppt", "pptx"];
  const extensionesImagen = ["img", "png", "jpg", "jpeg", "gif"];
  const extensionesVideo = ["mp4", "mpeg4", "avi", "wmv", "mov", "3gp", "3gpp"];

  //Se obtiene la terminacion del nombre de archivo luego del punto.
  const extension = nombreArchivo.split('.').pop();

  //Se compara la extension de archivo con los diferentes grupos de extensiones
  if(extensionesDocumento.includes(extension)) {
    return 'Documento';
  }

  if(extensionesImagen.includes(extension)) {
    return 'Imagen';
  }

  if(extensionesVideo.includes(extension)) {
    return 'Imagen';
  }

  //Si se envia un archivo no vacio, pero que no tiene ningun de las extensiones permitidas
  return "No válido";
}

/**
 * Obtiene el tipo de un archivo enviado en base a su extension de nombre
 * @param {string} nombreArchivo El nombre del archivo enviado
 * @returns Retorna un string con el tipo de archivo 
 */
export function determinarTipoArchivo(nombreArchivo){
  //Evita el proceso logico al no tener un nombre de archivo
  if(!nombreArchivo) return null;

  //Se obtiene la terminacion del nombre de archivo luego del punto.
  const extension = nombreArchivo.split('.').pop();

  //Se compara la extension de archivo con los diferentes grupos de extensiones
  if(['pdf'].includes(extension)) {
    return 'pdf';
  }

  if(['doc', 'docx'].includes(extension)) {
    return 'word';
  }

  if(['ppt', 'pptx'].includes(extension)) {
    return 'ppt';
  }

  if(['xls', 'xlsx', 'xlsm'].includes(extension)) {
    return 'excel';
  }

  //Si se envia un archivo no vacio, pero que no tiene ningun de las extensiones permitidas
  return null;
}
