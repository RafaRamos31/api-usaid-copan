import express from "express";
import multer from "multer";
import { editFooterInfo, getFooterInfo } from "../controllers/footerInfoController.js";

const upload = new multer();
const footerInfoRouter = express.Router();

//Get Info
footerInfoRouter.get('/', getFooterInfo);

//Get Info
footerInfoRouter.put('/', upload.any(), editFooterInfo);

export default footerInfoRouter;