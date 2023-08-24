import Caserio from "../models/caserios.js";
import { getAldeaById } from "./aldeas-controller.js";

export async function getCaseriosByAldea(idAldea){
  return Caserio.find({aldea: {_id: idAldea}}).sort({ geocode: 1 });
}

export async function getCaserioById(idCaserio){
  try {
    const caserio = await Caserio.findById(idCaserio).populate('aldea');
    return caserio;
  } catch (error) {
    throw error;
  }
}

export async function getCaserioByIdSimple(idCaserio){
  try {
    const caserio = await Caserio.findById(idCaserio);
    return caserio;
  } catch (error) {
    throw error;
  }
}

export async function createCaserio(nombre, geocode, idAldea){
  const aldea = await getAldeaById(idAldea)
  const caserio = new Caserio({
    nombre,
    geocode,
    aldea
  })

  return caserio.save();
}

export async function editCaserio(idCaserio, nombre, geocode, idAldea){
  const caserio = await getCaserioById(idCaserio);
  if(!caserio) return null;

  const aldea = await getAldeaById(idAldea);
  caserio.nombre = nombre;
  caserio.geocode = geocode;
  caserio.aldea = aldea;

  return caserio.save();
}

export async function deleteCaserio(idCaserio){
  const caserio = await getCaserioById(idCaserio);
  if(!caserio) return null;

  return caserio.delete();
}