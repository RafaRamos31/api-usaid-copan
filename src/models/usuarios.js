import mongoose from "mongoose";

const schema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  sexo: {
    type: String
  },
  organizacion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organizacion",
  },
  cargo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cargo",
  },
  componente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Componente",
  },
  rol: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Rol",
    required: true,
  },
  correo: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  }
});

/**
 * Modelo de entidad de un Componente
 */
export default mongoose.model("Usuario", schema, "Usuarios");
