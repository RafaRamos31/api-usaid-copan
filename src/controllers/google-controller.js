/**
 * Archivo para definir la logica de conexion, autorizacion y envio de datos a Google Drive
 *
 * Autor: USAID - Proyecto Avanzando por la Salud de Honduras
 * Fecha: Junio 2023
 * Versión: 1.0.0
 */
import dotenv from 'dotenv';
dotenv.config();

import { google } from "googleapis";
import stream from "stream";

//Se define el alcance del permiso de operacion, en este caso acceso total en Drive
const SCOPES = ["https://www.googleapis.com/auth/drive"];

//Se decodifican los datos de la cuenta de servicio
const base64EncodedServiceAccount = process.env.BASE64_ENCODED_SERVICE_ACCOUNT;
const decodedServiceAccount = Buffer.from(base64EncodedServiceAccount, 'base64').toString('utf-8');
const credentials = JSON.parse(decodedServiceAccount);

//Se  crea el objeto de credenciales
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: SCOPES,
});

//Upload
export const uploadFile = async (name, type, buffer) => {
  //Se crea el archivo usando las credenciales de Google Drive y el stream de bytes que componen el archivo.
  const bufferStream = new stream.PassThrough();
  bufferStream.end(buffer);

  const { data } = await google.drive({ version: "v3", auth }).files.create({
    media: {
      mimeType: type,
      body: bufferStream
    },
    resumable: true,
    requestBody: {
      //Se define que el archivo conserve su nombre original
      name: name,
      //Se establece la carpeta donde se guardará la informacion
      parents: [process.env.GOOGLE_FOLDER_ID],
    },
    fields: "id,name",
  });

  
  //Genera una URL valida en base al ID generado por el archivo guardado
  return data.id;
};


//Delete
export const deleteDriveFile = async (driveId) => {
  try {
    const result = await google.drive({ version: "v3", auth }).files.delete({fileId: driveId})
    return result;
  } catch (error) {
    throw error;
  }
};
