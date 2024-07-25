import mongoose from "mongoose";

const schema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  ref: {
    type: Number,
    required: true,
  },
});

/**
 * Modelo de entidad de un Municipio
 */
export default mongoose.model("Municipio", schema, "Municipios");
