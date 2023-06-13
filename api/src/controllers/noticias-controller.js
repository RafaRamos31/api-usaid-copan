import Noticia from "../models/noticia.js";

export async function getNoticias(){
  return Noticia.find().populate("departamento");
}
