import Municipio from "../models/municipios.js";
import { getDepartamentoById } from "./departamentos-controller.js";

export async function getMunicipiosByDepto(idDepto){
  return Municipio.find({departamento: {_id: idDepto}}).sort({ geocode: 1 });
}

export async function getMunicipioById(idMunicipio){
  try {
    const municipio = await Municipio.findById(idMunicipio).populate('departamento');
    return municipio;
  } catch (error) {
    throw error;
  }
}

export async function getMunicipioByIdSimple(idMunicipio){
  try {
    const municipio = await Municipio.findById(idMunicipio);
    return municipio;
  } catch (error) {
    throw error;
  }
}

export async function createMunicipio(nombre, geocode, idDepartamento){
  const departamento = await getDepartamentoById(idDepartamento)
  const municipio = new Municipio({
    nombre,
    geocode,
    departamento
  })

  return municipio.save();
}

export async function editMunicipio(idMunicipio, nombre, geocode, idDepartamento){
  const municipio = await getMunicipioById(idMunicipio);
  if(!municipio) return null;

  const departamento = await getDepartamentoById(idDepartamento);
  municipio.nombre = nombre;
  municipio.geocode = geocode;
  municipio.departamento = departamento

  return municipio.save();
}

export async function deleteMunicipio(idMunicipio){
  const municipio = await getMunicipioById(idMunicipio);
  if(!municipio) return null;

  return municipio.delete();
}