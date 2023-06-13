import Departamento from "../models/departamento.js";

export async function getDepartamentos(){
  return Departamento.find();
}

export async function getDepartamentoById(idDepartamento){
  return await Departamento.findById(idDepartamento);
}