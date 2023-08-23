import mongoose from "mongoose";

const schema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  }
});

/**
 * Modelo de entidad de un Usuario
 */
export default mongoose.model("Rol", schema, "Roles");
