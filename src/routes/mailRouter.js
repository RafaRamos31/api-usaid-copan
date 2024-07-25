import express from "express";
import { sendMail } from "../controllers/mail-controller.js";
import multer from "multer";

const upload = new multer();
const mailRouter = express.Router();

//Send Email
mailRouter.post('/', upload.any(), sendMail);

export default mailRouter;