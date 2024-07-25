import express from "express";
import multer from "multer";
import { createUnidadTecnica, deleteUnidadTecnica, editUnidadTecnica, getUnidadesTecnicasList } from "../controllers/unidadTecnicaController.js";

const upload = new multer();
const unidadesTecnicasRouter = express.Router();

//Get List
unidadesTecnicasRouter.get('/', getUnidadesTecnicasList);

//Create
unidadesTecnicasRouter.post('/', upload.any(), createUnidadTecnica);

//Update
unidadesTecnicasRouter.put('/', upload.any(), editUnidadTecnica);

//Ocultar
unidadesTecnicasRouter.delete('/', upload.any(), deleteUnidadTecnica);

export default unidadesTecnicasRouter;