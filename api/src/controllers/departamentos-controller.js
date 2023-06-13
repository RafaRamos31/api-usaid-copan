import Departamento from "../models/departamento.js";

export async function getDepartamentos(){
  return Departamento.find();
}