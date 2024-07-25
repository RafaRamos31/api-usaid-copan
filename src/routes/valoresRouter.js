import express from "express";
import multer from "multer";
import { createValor, deleteValor, editValor, getValoresList } from "../controllers/valoresController.js";

const upload = new multer();
const valoresRouter = express.Router();

//Get List
valoresRouter.get('/', getValoresList);

//Create
valoresRouter.post('/', upload.any(), createValor);

//Update
valoresRouter.put('/', upload.any(), editValor);

//Ocultar
valoresRouter.delete('/', upload.any(), deleteValor);

export default valoresRouter;