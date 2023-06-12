import express from "express";
import { addRestDirections } from "./expressApi.js";
import "./db.js";

let app = express();
app = addRestDirections(app);

app.listen({port: 4000});