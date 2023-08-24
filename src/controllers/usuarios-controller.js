import { createHash } from 'crypto';
import Usuario from "../models/usuarios.js";
import { getCargoById } from "./cargos-controller.js";
import { getComponentById } from "./componentes-controller.js";
import { getOrganizacionById } from "./organizaciones-controller.js";
import { getRolById } from "./roles-controller.js";

export async function getUsuarios(organizacion=null, cargo=null, componente=null, rol=null){
  try {

    let filter = {}

    if(organizacion){
      filter = {...filter, organizacion: {_id: organizacion}}
    }

    if(cargo){
      filter = {...filter, cargo: cargo}
    }

    if(componente){
      filter = {...filter, componente: {_id: componente}}
    }

    if(rol){
      filter = {...filter, rol: {_id: rol}}
    }

    const usuarios = await Usuario.find(filter, '-password').populate(['organizacion', 
    'cargo', 'componente', 'rol']);
    return usuarios;
  } catch (error) {
    throw error;
  }
}

export async function getUsuarioById(idUsuario){
  try {
    const usuario = await Usuario.findById(idUsuario, '-password').populate(['organizacion', 
    'cargo', 'componente', 'rol']);
    return usuario;
  } catch (error) {
    throw error;
  }
}

export async function createUsuario(nombre, sexo, idOrganizacion, idCargo, idComponente, idRol,
  correo, password){

  const promises = await Promise.all([
    getOrganizacionById(idOrganizacion),
    getCargoById(idCargo),
    getComponentById(idComponente),
    getRolById(idRol)
  ])

  const usuario = new Usuario({
    nombre,
    sexo,
    organizacion: promises[0],
    cargo: promises[1],
    componente: promises[2],
    rol: promises[3],
    correo,
    password: hashPassword(password)
  })

  return usuario.save();
}


export async function editUsuario(idUsuario, nombre, sexo, idOrganizacion, idCargo, idComponente, idRol,
  correo){

  const usuario = await getUsuarioById(idUsuario);
  if(!usuario) return null;

  const promises = await Promise.all([
    getOrganizacionById(idOrganizacion),
    getCargoById(idCargo),
    getComponentById(idComponente),
    getRolById(idRol)
  ])

  usuario.nombre = nombre;
  usuario.sexo = sexo;
  usuario.organizacion = promises[0];
  usuario.cargo = promises[1];
  usuario.componente = promises[2];
  usuario.rol = promises[3];
  usuario.correo = correo;

  return usuario.save();
}

export async function deleteUsuario(idUsuario){
  const usuario = await getUsuarioById(idUsuario);
  if(!usuario) return null;

  return usuario.delete();
}


function hashPassword(password) {
  return createHash("sha256").update(password).digest("hex");
}