import mongoose from "mongoose";

const schema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  organizacion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organizacion",
    required: true,
  },
});

/**
 * Modelo de entidad de un Componente
 */
export default mongoose.model("Cargo", schema, "Cargos");
