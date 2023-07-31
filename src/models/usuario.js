import mongoose from "mongoose";

const schema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true
  },
  firstLogin: {
    type: Boolean,
    required: true
  },
  ultimaConexion: {
    type: String
  }
});

/**
 * Modelo de entidad de un Usuario
 */
export default mongoose.model("Usuario", schema, "Usuarios");
