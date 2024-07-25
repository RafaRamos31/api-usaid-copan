import mongoose from "mongoose";

const schema = new mongoose.Schema({
  municipio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Municipio",
    required: true,
  },
  establecimiento: {
    type: String,
    required: true
  },
  telefono: {
    type: String,
    required: true
  },
  sectorRef: {
    type: Number,
    required: true
  },
  departamentoRef: {
    type: Number,
    required: true
  }
});

/**
 * Modelo de entidad de un Usuario
 */
export default mongoose.model("Contacto", schema, "Contactos");
