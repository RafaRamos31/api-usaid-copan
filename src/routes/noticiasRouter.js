import express from "express";
import multer from "multer";
import { crearNoticia, deleteNoticia, editAddArchivo, editDeleteArchivo, editNoticia, getPagedNoticias } from "../controllers/noticias-controller.js";

const upload = new multer();
const noticiasRouter = express.Router();

//Get List
noticiasRouter.post('/paged', upload.any(), getPagedNoticias);

//Create
noticiasRouter.post('/', upload.any(), crearNoticia);

//Update
noticiasRouter.put('/', upload.any(), editNoticia);

//Update Add file
noticiasRouter.put('/addfile', upload.any(), editAddArchivo);

//Update Delete file
noticiasRouter.put('/deletefile', upload.any(), editDeleteArchivo);

//Delete
noticiasRouter.delete('/', upload.any(), deleteNoticia);

export default noticiasRouter;