import mongoose from "mongoose";

const imagen = new mongoose.Schema({
  nombre: {
      type: String,
      required: true
  },
  fileId: {
      type: String,
      required: true
  },
  imgUrl: {
    type: String,
    required: true
},
})

const valor = new mongoose.Schema({
  nombre: {
      type: String,
      required: true
  },
  descripcion: {
      type: String,
      required: true
  }
})

const schema = new mongoose.Schema({
  ref: {
    type: Number,
    required: true,
  },
  titulo: {
    type: String,
    required: true,
  },
  subtitulo: {
    type: String,
    required: true
  },
  departamento: {
    type: Number,
    required: true
  },
  nosotros: {
    type: String,
    required: true
  },
  mensaje: {
    type: String,
    required: true
  },
  autor: {
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
    type: valor,
  }],
  urlMapa: {
    type: String,
  },
  enlaces: [{
    type: imagen,
  }]
});

/**
 * Modelo de entidad de un Usuario
 */
export default mongoose.model("Configuracion", schema, "Configuracion");
