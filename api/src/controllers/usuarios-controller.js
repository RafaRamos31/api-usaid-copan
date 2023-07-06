/**
 * Archivo para definir metodos de acceso a la base de datos de MongoDB
 * Para manipular los registros de la coleccion de Usuarios
 *
 * Autor: USAID - Proyecto Avanzando por la Salud de Honduras
 * Fecha: Junio 2023
 * Versión: 1.0.0
 */

import Usuario from "../models/usuario.js";
import { createHash } from 'crypto';


export async function getUserById(userId){
  
  let user = await Usuario.findById(userId);
  if(!user){
    return ({
      valid: false
    })
  }
  return ({
    valid: true,
    id: user._id,
    name: user.nombre
  });
}

export async function login(username, password){
  
  let user = await Usuario.findOne({nombre: username});
  if(!user || user.passwordHash !== hashPassword(password)){
    return ({
      valid: false
    })
  }
  return ({
    valid: true,
    id: user._id
  });
}

export async function register(username, password){
  const user = new Usuario({
    nombre: username,
    passwordHash: hashPassword(password),
  })

  user.save();
  return ({
    valid: true,
    id: user._id
  });
}


function hashPassword(password) {
  return createHash("sha256").update(password).digest("hex");
}
