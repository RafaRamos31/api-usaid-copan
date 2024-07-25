import mongoose from "mongoose";

const schema = new mongoose.Schema({
  unidadTecnica: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UnidadTecnica",
    required: true,
  },
  municipio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Municipio",
    required: true,
  },
  fechaPublicacion: {
    type: Date,
    required: true,
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
