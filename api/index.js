/**
 * Este archivo es el punto de entrada principal de la aplicación.
 * Aquí se configuran las dependencias, se define la lógica principal
 * y se inicia la ejecución del programa.
 *
 * Autor: USAID - Proyecto Avanzando por la Salud de Honduras
 * Fecha: Junio 2023
 * Versión: 1.0.0
 */

import express from "express";
import cors from "cors";
import { setRoutes } from "../src/config/routes.js";
import "../src/config/db.js";

//Se inicializa un servidor Express para la navegacion entre rutas al acceder a la API
const app = express();

// Habilitar CORS
app.use(cors());

// Rutas
setRoutes(app)

//Se establece el puerto de acceso a la API
app.listen({port: 4000});