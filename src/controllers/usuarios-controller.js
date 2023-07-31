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
import { generarCodigoAleatorio } from "../utilities/codeGenerator.js";

export async function getUsers(){
  return Usuario.find().select('-passwordHash');
}

export async function getUserById(userId){
  
  let user = await Usuario.findById(userId);
  if(!user){
    return ({
      valid: false
    })
  }

  //Actualizar conexion
  user.ultimaConexion = Date.now();
  user.save()

  return ({
    valid: true,
    id: user._id,
    name: user.nombre,
    rol: user.rol,
    firstLogin: user.firstLogin
  });
}

export async function login(username, password){
  
  let user = await Usuario.findOne({username: username});
  if(!user || user.passwordHash !== hashPassword(password)){
    return ({
      valid: false
    })
  }
  return ({
    valid: true,
    id: user._id,
    nombre: user.nombre,
    rol: user.rol,
    firstLogin: user.firstLogin
  });
}

async function confirmMaster(userId){
  
  let user = await Usuario.findOne({rol: 'Master'});

  if(!user){
    return false;
  }

  return userId === user._id;
}

export async function register(nombre, username, rol, masterId){
  if(confirmMaster(masterId)){
    return ({
      valid: false
    });
  }
  
  const codigo = generarCodigoAleatorio()
  const user = new Usuario({
    nombre: nombre,
    username: username,
    passwordHash: hashPassword(codigo),
    rol: rol,
    firstLogin: true,
    ultimaConexion: Date.now()
  })

  user.save();
  return ({
    valid: true,
    codigo: codigo,
    id: user._id,
    username: user.username,
    nombre: user.nombre,
  });
}

export async function updatePassword(idUsuario, password){
  const user = await Usuario.findById(idUsuario);

  user.passwordHash = hashPassword(password)
  user.firstLogin = false

  user.save();
  return ({
    valid: true,
    id: user._id,
    username: user.username,
    nombre: user.nombre,
  });
}

function hashPassword(password) {
  return createHash("sha256").update(password).digest("hex");
}
