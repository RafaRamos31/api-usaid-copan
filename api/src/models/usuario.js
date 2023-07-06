import mongoose from "mongoose";

const schema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true
  }
});

/**
 * Modelo de entidad de un Usuario
 */
export default mongoose.model("Usuario", schema, "Usuarios");
