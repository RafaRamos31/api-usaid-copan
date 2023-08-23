import mongoose from "mongoose";

const schema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  geocode: {
    type: String,
    required: true,
    unique: true
  },
  municipio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Municipio",
    required: true,
  },
});

/**
 * Modelo de entidad de un Componente
 */
export default mongoose.model("Aldea", schema, "Aldeas");
