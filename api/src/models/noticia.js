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
  tipoMultimedia: {
    type: String,
  },
  enlaces:[{
    type: String,
  }],
});

export default mongoose.model("Noticia", schema, "Noticias");
