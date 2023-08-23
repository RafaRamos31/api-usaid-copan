import Cargo from "../models/cargos.js";
import { getOrganizacionById } from "./organizaciones-controller.js";


export async function getCargosByOrg(idOrganizacion){
  return Cargo.find({organizacion: {_id: idOrganizacion}});
}

export async function getCargoById(idCargo){
  try {
    const cargo = await Cargo.findById(idCargo);
    return cargo;
  } catch (error) {
    throw error;
  }
}

export async function createCargo(nombre, idOrganizacion){
  const organizacion = await getOrganizacionById(idOrganizacion)
  const cargo = new Cargo({
    nombre,
    organizacion
  })

  return cargo.save();
}

export async function editCargo(idCargo, nombre, idOrganizacion){
  const cargo = await getCargoById(idCargo);
  if(!cargo) return null;

  const organizacion = await getOrganizacionById(idOrganizacion);
  cargo.nombre = nombre;
  cargo.organizacion = organizacion;

  return cargo.save();
}

export async function deleteCargo(idCargo){
  const cargo = await getCargoById(idCargo);
  if(!cargo) return null;

  return cargo.delete();
}