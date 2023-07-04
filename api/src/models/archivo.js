import mongoose from "mongoose";

const schema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    required: true
  },
  enlace: {
    type: String,
    required: true
  }
});

/**
 * Modelo de entidad de un Departamento
 */
export default mongoose.model("Archivo", schema, "Archivos");
