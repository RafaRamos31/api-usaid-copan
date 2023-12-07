import mongoose from "mongoose";

const schema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    minlength: 3,
  }
});

/**
 * Modelo de entidad de un Departamento
 */
export default mongoose.model("Departamento", schema, "Departamentos");
