import mongoose from "mongoose";

const schema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  tamano: {
    type: Number,
    required: true
  },
  fileId: {
    type: String,
    required: true
  },
  enlace: {
    type: String,
    required: true
  }
});

/**
 * Modelo de entidad de un Archivo
 */
export default mongoose.model("ConfArchivo", schema, "ConfArchivos");
