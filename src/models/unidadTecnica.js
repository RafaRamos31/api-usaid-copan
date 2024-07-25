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
 * Modelo de entidad de una Unidad Técnica
 */
export default mongoose.model("UnidadTecnica", schema, "UnidadesTecnicas");
