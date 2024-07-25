import express from "express";
import { getImagenesList, subirImagenHome } from "../controllers/imagenesController.js";
import multer from "multer";

const upload = new multer();
const imagesRouter = express.Router();

//Get List
imagesRouter.get('/', getImagenesList);

//Upload
imagesRouter.put('/', upload.any(), subirImagenHome);

export default imagesRouter;