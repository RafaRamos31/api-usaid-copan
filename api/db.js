import mongoose from "mongoose";
import dotenv from 'dotenv';

//Se obtienen las variables de entorno con las credenciales de MongoDB
dotenv.config();
const user = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const host = process.env.MONGO_HOST;

//Se crea la URI de peticion de acceso a MongoDB
const MONGODB_URI = `mongodb+srv://${user}:${password}@${host}`;

//Se habilita el modo estricto para evitar queries de valores no definidos en las colecciones de datos
mongoose.set('strictQuery', true);

//Se establece la coneccion con la base de dstos
mongoose.connect(MONGODB_URI)
.catch(error => {
    console.error('Error al tratar de acceder a la Base de Datos: ', error.message)
});
