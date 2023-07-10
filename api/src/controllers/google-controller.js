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
 * Proceso encargado de la conexion con Google Drive, y la subida de un archivo, 
 * devolviendo el enlace formateado de dicho archivo
 * @param {File} fileObject El archivo a ser subido a Google Drive
 * @returns El enlace generado del archivo subido
 */
export const uploadDriveFile = async (fileObject) => {
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
  return data.id;
};

export const deleteDriveFile = async (driveId) => {
  try {
    const result = await google.drive({ version: "v3", auth }).files.delete({fileId: driveId})
    return result;
  } catch (error) {
    console.error('Error al eliminar el archivo:', error);
  }
};