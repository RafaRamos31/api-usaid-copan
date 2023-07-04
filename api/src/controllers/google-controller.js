/**
 * Archivo para definir la logica de conexion, autorizacion y envio de datos a Google Drive
 *
 * Autor: USAID - Proyecto Avanzando por la Salud de Honduras
 * Fecha: Junio 2023
 * Versión: 1.0.0
 */

import { google } from "googleapis";
import stream from "stream";
import path from "path";
import { fileURLToPath } from 'url';
import Archivo from "../models/archivo.js";
import { determinarTipo } from "./archivos-controller.js";

//Procedimiento para el correcto enrutamiento a un documento ubicado en la raiz del proyecto
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Se define la ruta al archivo con las credenciales de acceso como servicio de Google Drive
const KEYFILENAME = path.join(__dirname, '../../../credentials.json');

//Se define el alcance del permiso de operacion, en este caso acceso total en Drive
const SCOPES = ["https://www.googleapis.com/auth/drive"];

//Se  crea el objeto de credenciales
const auth = new google.auth.GoogleAuth({
  keyFilename: KEYFILENAME,
  scopes: SCOPES,
});

/**
 * Procesa los archivos recibidos en la peticion POST de la API, 
 * y los envia a Google Drive, y generando Objetos de tipo Archivo almacenados en MongoDB
 * @param {[File]} files //Un arreglo con todos los archivos enviados para subir al almacenamiento de Google Drive
 * @returns Un arreglo con todos los objetos de Archivo en MongoDB
 */
export async function sendFiles(files){
  let archivos = [];
  try {
    //Se actualiza el arreglo de Archivos cada vez que se sube un archivo.
    for (let i = 0; i < files.length; i++) {
      const archivo = new Archivo({
        tipo: determinarTipo(files[i].originalname),
        nombre: files[i].originalname,
        enlace: await uploadFile(files[i])
      });
      await archivo.save();

      archivos = archivos.concat(archivo);
    }
    return archivos;
  } catch (f) {
    throw new Error(f.message);
  }
}

/**
 * Proceso encargado de la conexion con Google Drive, y la subida de un archivo, 
 * devolviendo el enlace formateado de dicho archivo
 * @param {File} fileObject El archivo a ser subido a Google Drive
 * @returns El enlace generado del archivo subido
 */
const uploadFile = async (fileObject) => {
  //Genera un stream de datos para el procesamiento de los Bytes del archivo
  const bufferStream = new stream.PassThrough();
  bufferStream.end(fileObject.buffer);

  //Se crea el archivo usando las credenciales de Google Drive y el stream de bytes que componen el archivo.
  const { data } = await google.drive({ version: "v3", auth }).files.create({
    media: {
      mimeType: fileObject.mimeType,
      body: bufferStream,
    },
    requestBody: {
      //Se define que el archivo conserve su nombre original
      name: fileObject.originalname,
      //Se establece la carpeta donde se guardará la informacion
      parents: [process.env.GOOGLE_FOLDER_ID],
    },
    fields: "id,name",
  });
  
  //Genera una URL valida en base al ID generado por el archivo guardado
  return 'https://drive.google.com/file/d/' + data.id + '/view';
};