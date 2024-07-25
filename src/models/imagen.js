import mongoose from "mongoose";

const schema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  fileId: {
    type: String,
  },
  enlace: {
    type: String,
  }
});

/**
 * Modelo de entidad de una Imagen de Home
 */
export default mongoose.model("Imagen", schema, "Imagenes");
