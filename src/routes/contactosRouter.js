import express from "express";
import multer from "multer";
import { createContacto, deleteContacto, editContacto, getContactosList } from "../controllers/contactosController.js";

const upload = new multer();
const contactosRouter = express.Router();

//Get List
contactosRouter.get('/', getContactosList);

//Create
contactosRouter.post('/', upload.any(), createContacto);

//Update
contactosRouter.put('/', upload.any(), editContacto);

//Ocultar
contactosRouter.delete('/', upload.any(), deleteContacto);

export default contactosRouter;