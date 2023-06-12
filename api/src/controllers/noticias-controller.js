import Noticia from "../models/noticia.js";
import { findDeptoById } from "./departamentos-controller.js";

export async function getNoticias(){
  return Noticia.find().populate("departamento");
}

export async function setNoticias(){
  const depto = await findDeptoById('64874b401ccc73e359451bbd');

}