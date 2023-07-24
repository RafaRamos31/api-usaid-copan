import mongoose from "mongoose";

const schema = new mongoose.Schema({
  municipio: {
    type: String,
    required: true
  },
  establecimientos: [{
    nombre: {
      type: String,
      required: true
    },
    telefono: {
      type: String,
      required: true
    }
  }]
});

/**
 * Modelo de entidad de un Usuario
 */
export default mongoose.model("Contacto", schema, "Contactos");
