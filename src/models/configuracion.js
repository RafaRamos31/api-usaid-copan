import mongoose from "mongoose";

const schema = new mongoose.Schema({
  ref: {
    type: Number,
    required: true,
  }
});

/**
 * Modelo de entidad de un Usuario
 */
export default mongoose.model("Configuracion", schema, "Configuracion");
