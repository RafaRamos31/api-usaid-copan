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
  docType: {
    type: String
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
  },
  descargar: {
    type: String,
    required: true
  },
  totalDescargas: {
    type: Number,
    required: true
  }
});

/**
 * Modelo de entidad de un Archivo
 */
export default mongoose.model("Archivo", schema, "Archivos");
