import Rol from "../models/roles.js";

export async function getAllRoles(){
  return Rol.find();
}

export async function getRolById(idRol){
  try {
    const rol = await Rol.findById(idRol);
    return rol;
  } catch (error) {
    throw error;
  }
}

export async function createRol(nombre){
  const rol = new Rol({
    nombre
  })

  return rol.save();
}

export async function editRol(idRol, nombre){
  const rol = await getRolById(idRol);
  if(!rol) return null;

  rol.nombre = nombre;
  return rol.save();
}

export async function deleteRol(idRol){
  const rol = await getRolById(idRol);
  if(!rol) return null;

  return rol.delete();
}