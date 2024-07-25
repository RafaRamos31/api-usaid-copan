/**
 * Archivo para definir metodos de acceso a la base de datos de MongoDB
 * Para manipular los registros de la coleccion de Usuarios
 *
 * Autor: Feed the Future Honduras Avanzando la Nutricion
 * Fecha: Julio 2024
 * Versión: 1.0.0
 */

import Usuario from "../models/usuario.js";
import { generarCodigoAleatorio } from "../utilities/codeGenerator.js";
import { decodeToken, signToken } from "../utilities/jwtDecoder.js";
import { createHash } from 'crypto';

//Login
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    await checkInitialUser();

    const usuario = await Usuario.findOne({username, passwordHash: hashPassword(password)});
    if(!usuario) return res.status(404).json({ error: 'Los datos ingresados no son válidos.' });

    usuario.ultimaConexion = new Date();
    usuario.save();

    const tokenUser = {
      id: usuario._id,
      nombre: usuario.nombre,
      username: usuario.username,
      firstLogin: usuario.firstLogin,
      rol: usuario.rol,
    }
    const token = signToken({tokenInfo: tokenUser})

    res.json({token});

  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error al hacer el login: ' + error });
  }
}

//Verify
export const verifyUser = async (req, res) => {
  try {
    const authorizationHeader = req.headers['authorization'];

    const auth = decodeToken(authorizationHeader);
    if(auth.code !== 200) return res.status(auth.code).json({ error: 'Ocurrió un error al verificar el login: ' + auth.payload });

    res.json({user: auth.payload});

  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error al verificar el login: ' + error });
  }
}

//Change Password
export const changePassword = async (req, res) => {
  try {
    const { id, password } = req.body;

    const usuario = await Usuario.findById(id)
    if(!usuario) return res.status(404).json({ error: 'Error al editar el Usuario. Usuario no encontrado.' });
    
    usuario.passwordHash = hashPassword(password);
    usuario.firstLogin = false;

    usuario.save();

    res.json(usuario);

  } catch (error) {
    res.status(500).json({ error: 'Error al editar el Usuario: ' + error });
  }
}


//Register
export const registerUser = async (req, res) => {
  try {
    const { nombre, username } = req.body;

    const password = generarCodigoAleatorio();

    const usuario = new Usuario({
      nombre: nombre,
      rol: 'USER',
      username: username,
      firstLogin: true,
      passwordHash: hashPassword(password),
    })

    await usuario.save();

    res.json({codigo: password});

  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el Usuario: ' + error });
  }
}


//Get List
export const getUsers = async (req, res) => {
  try {
    const usuarios = await Usuario.find().select('-passwordHash');;
    res.json(usuarios);

  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los Usuarios: ' + error });
  }
}


//Delete User
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;

    const usuario = await Usuario.findById(id)
    if(!usuario) return res.status(404).json({ error: 'Error al eliminar el Usuario. Usuario no encontrado.' });
    if(usuario.rol === 'ADMIN') return res.status(500).json({ error: 'Error al eliminar el Usuario. No se puede borrar el usuario ADMIN.' });
    
    usuario.delete();
    res.json(usuario);

  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el Usuario: ' + error });
  }
}

//Hash Password
function hashPassword(password) {
  return createHash("sha256").update(password).digest("hex");
}

//Initial User
const checkInitialUser = async () => {
  try {
    const count = await Usuario.countDocuments();
    
    if(count === 0){
      const usuario = new Usuario({
        nombre: 'Administrador',
        username: 'admin',
        firstLogin: true,
        rol: 'ADMIN',
        passwordHash: hashPassword('admin')
      })
      
      await usuario.save();
    }
  } catch (error) {
    throw error
  }
}