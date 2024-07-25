import express from "express";
import { getMunicipiosList } from "../controllers/municipiosController.js";

const municipiosRouter = express.Router();

//Get List
municipiosRouter.get('/', getMunicipiosList);

export default municipiosRouter;