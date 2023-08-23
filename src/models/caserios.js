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
  aldea: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Aldea",
    required: true,
  },
});

/**
 * Modelo de entidad de un Componente
 */
export default mongoose.model("Caserio", schema, "Caserios");
