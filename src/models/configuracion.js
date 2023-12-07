import mongoose from "mongoose";

const valor = new mongoose.Schema({
  nombre: {
    type: String,
  },
  descripcion: {
    type: String,
  },
})

const red = new mongoose.Schema({
  name: {
    type: String,
  },
  exists: {
    type: Boolean,
  },
  enlace: {
    type: 'string',
  },
})


const schema = new mongoose.Schema({
  ref: {
    type: String,
    required: true,
  },
  nosotros: {
    type: String,
  },
  mensaje: {
    type: String,
  },
  autor: {
    type: String,
  },
  mision: {
    type: String,
  },
  vision: {
    type: String,
  },
  urlMapa: {
    type: String,
  },
  valores: [{
    type: valor,
  }],
  footerCorreo: {
    type: String,
  },
  footerDireccion: {
    type: String,
  },
  footerTelefonos: {
    type: String,
  },
  footerDesc: {
    type: String,
  },
  footerEnlace: {
    type: String,
  },
  footerRedes: [{
    type: red,
  }],
});

/**
 * Modelo de entidad de un Usuario
 */
export default mongoose.model("Configuracion", schema, "Configuracion");
