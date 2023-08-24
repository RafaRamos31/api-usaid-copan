import Departamento from "../models/departamentos.js";

export async function getAllDepartamentos(){
  return Departamento.find().sort({ geocode: 1 });
}

export async function getDepartamentoById(idDepartamento){
  try {
    const departamento = await Departamento.findById(idDepartamento);
    return departamento;
  } catch (error) {
    throw error;
  }
}

export async function createDepartamento(nombre, geocode){
  const departamento = new Departamento({
    nombre,
    geocode
  })

  return departamento.save();
}

export async function editDepartamento(idDepartamento, nombre, geocode){
  const departamento = await getDepartamentoById(idDepartamento);
  if(!departamento) return null;

  departamento.nombre = nombre;
  departamento.geocode = geocode;

  return departamento.save();
}

export async function deleteDepartamento(ideDepartamento){
  const departamento = await getDepartamentoById(ideDepartamento);
  if(!departamento) return null;

  return departamento.delete();
}