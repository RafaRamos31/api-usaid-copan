import mongoose from "mongoose";

const schema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  departamento: {
    type: String,
    required: true
  },
  quienesSomos: {
    type: String,
    required: true
  },
  mensaje: {
    type: String,
    required: true
  },
  mision: {
    type: String,
    required: true
  },
  vision: {
    type: String,
    required: true
  },
  valores: [{
    nombre: {
      type: String,
      required: true
    },
    descripcion: {
      type: String,
      required: true
    }
  }],
  urlTematica: {
    type: String,
  },
  urlRepresentante: {
    type: String,
  },
  urlOrganigrama: {
    type: String,
  },
  urlMapa: {
    type: String,
  },
});

/**
 * Modelo de entidad de un Usuario
 */
export default mongoose.model("Configuracion", schema, "Configuraciones");
