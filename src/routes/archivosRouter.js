import express from "express";
import multer from "multer";
import { crearArchivo, eliminarArchivo, getPagedArchivos, modificarArchivo, sumarDescarga } from "../controllers/archivos-controller.js";

const upload = new multer();
const archivosRouter = express.Router();

//Get List
archivosRouter.post('/paged', upload.any(), getPagedArchivos);

//Create
archivosRouter.post('/', upload.any(), crearArchivo);

//Sumar
archivosRouter.put('/sumar', upload.any(), sumarDescarga);

//Update
archivosRouter.put('/', upload.any(), modificarArchivo);

//Ocultar
archivosRouter.delete('/', upload.any(), eliminarArchivo);

export default archivosRouter;