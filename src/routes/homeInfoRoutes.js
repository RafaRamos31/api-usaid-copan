import express from "express";
import { editHomeInfo, getHomeInfo } from "../controllers/homeInfoController.js";
import multer from "multer";

const upload = new multer();
const homeInfoRouter = express.Router();

//Get Info
homeInfoRouter.get('/', getHomeInfo);

//Get Info
homeInfoRouter.put('/', upload.any(), editHomeInfo);

export default homeInfoRouter;