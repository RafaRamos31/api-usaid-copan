import express from "express";
import multer from "multer";
import { changePassword, deleteUser, getUsers, loginUser, registerUser, verifyUser } from "../controllers/usuarios-controller.js";

const upload = new multer();
const usuariosRouter = express.Router();

//Login
usuariosRouter.post('/login', upload.any(), loginUser);

//Verify
usuariosRouter.get('/verify', verifyUser);

//Change Password
usuariosRouter.put('/password', upload.any(), changePassword);

//Register
usuariosRouter.post('/register', upload.any(), registerUser);

//Get list
usuariosRouter.get('/list', getUsers);

//Delete
usuariosRouter.delete('/', upload.any(), deleteUser);

export default usuariosRouter;