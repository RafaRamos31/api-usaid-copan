/**
 * Archivo para definir metodos de acceso a la base de datos de MongoDB
 * Para manipular los registros de la coleccion de Archivos
 *
 * Autor: USAID - Proyecto Avanzando por la Salud de Honduras
 * Fecha: Junio 2023
 * Versión: 1.0.0
 */

import Archivo from "../models/archivo.js";
import { throwInvalidIDError, throwNotFoundException } from "../utilities/errorHandler.js";
import { deleteDriveFile, uploadDriveFile } from "./google-controller.js";

export async function publicarArchivo({nombre, weight, id}){
  const archivo = new Archivo({
    tipo: determinarTipo(nombre),
    nombre: nombre,
    tamano: weight,
    fileId: id,
    enlace: 'https://drive.google.com/file/d/' + id + '/view',
    descargar: 'https://drive.google.com/u/0/uc?id=' + id + '&export=download',
    totalDescargas: 0
  });

  return archivo.save();
}

export async function crearArchivos(filesArray){
  let files = [];

  for(let i=0; i<filesArray.length; i++){
    const archivo = await publicarArchivo({
      nombre: filesArray[i].originalname, 
      weight: filesArray[i].size, 
      id: await uploadDriveFile(filesArray[i])
    });
    files = files.concat(archivo);
  }
  return files;
}

/**
 * Registra la base de dato y obtiene una lista de noticias, 
 * ordenadas de la mas reciente a la mas antigua y
 * definiendo un limite de entradas por peticion
 * @returns Un arreglo de noticias cumpliendo con los filtros establecidos
 */
export async function getArchivos(index = 1, type = undefined){
  const queryFilter = type ? {tipo: type} : {};
  return Archivo.find(queryFilter).skip((index-1)*5).limit(5);
}

/**
 * Registra la base de dato y obtiene una lista de noticias, 
 * ordenadas de la mas reciente a la mas antigua y
 * definiendo un limite de entradas por peticion
 * @returns Un arreglo de noticias cumpliendo con los filtros establecidos
 */
export async function getArchivoById(idArchivo){
  return Archivo.findById(idArchivo).catch((error) => throwInvalidIDError("Archivo", error.message));
}


export async function getCountArchivos(type = undefined){
  const queryFilter = type ? {tipo: type} : {};
  return Archivo.countDocuments(queryFilter);
}


export async function sumarDescarga(idArchivo){
  const archivo = await getArchivoById(idArchivo);
  if(!archivo) return throwNotFoundException("Archivo");

  archivo.totalDescargas = archivo.totalDescargas + 1;
  return archivo.save();
}


export async function eliminarArchivo(idArchivo){
  const archivo = await getArchivoById(idArchivo);
  if(!archivo) return throwNotFoundException("Archivo");

  await deleteDriveFile(archivo.fileId);
  return archivo.delete();
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
    return 'Video';
  }

  //Si se envia un archivo no vacio, pero que no tiene ningun de las extensiones permitidas
  return "No válido";
}