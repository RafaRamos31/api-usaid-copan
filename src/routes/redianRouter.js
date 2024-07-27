import express from "express";
import multer from "multer";
import { createRedian, deleteRedian, editRedian, getRedianList } from "../controllers/redianController.js";

const upload = new multer();
const redianRouter = express.Router();

//Get List
redianRouter.get('/', getRedianList);

//Create
redianRouter.post('/', upload.any(), createRedian);

//Update
redianRouter.put('/', upload.any(), editRedian);

//Ocultar
redianRouter.delete('/', upload.any(), deleteRedian);

export default redianRouter;