import mongoose from "mongoose";

const schema = new mongoose.Schema({
  departamento: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Departamento",
    required: true,
  },
  fechaPublicacion: {
    type: String,
    required: true,
    minlength: 5,
  },
  contenido: {
    type: String,
  },
  archivos:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Archivo"
  }],
});

/**
 * Modelo de entidad de una Noticia
 */
export default mongoose.model("Noticia", schema, "Noticias");
