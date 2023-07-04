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
import { addRestDirections } from "./expressApi.js";
import "./db.js";

//Se inicializa un servidor Express para la navegacion entre rutas al acceder a la API
let app = express();

//Se agregan las diferentes rutas /GET y /POST para la manipulacion de datos almacenados en MongoDB
app = addRestDirections(app);

//Se establece el puerto de acceso a la API
app.listen({port: 4000});