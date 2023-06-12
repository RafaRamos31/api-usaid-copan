import mongoose from "mongoose";
import dotenv from 'dotenv';

//Getting the environment variables for DB Connection
dotenv.config();
const user = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const host = process.env.MONGO_HOST;

const MONGODB_URI = `mongodb+srv://${user}:${password}@${host}`;

mongoose.set('strictQuery', true);

//Starting the DB Connection
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.catch(error => {
    console.error('Database connection error: ', error.message)
});
