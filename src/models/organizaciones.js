import mongoose from "mongoose";

const schema = new mongoose.Schema({
  codigoOrganizacion: {
    type: String,
    required: true,
    unique: true
  },
  tipoOrganizacion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TipoOrganizacion",
    required: true,
  },
  nivelOrganizacion: {
    type: Number,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  departamento: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Departamento",
    required: true,
  },
  municipio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Municipio",
    required: true,
  },
  aldea: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Aldea",
    required: true,
  },
  caserio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Caserio",
    required: true,
  },
  telefonoOrganizacion: {
    type: String,
    required: true,
  },
  nombreContacto: {
    type: String,
    required: true,
  },
  telefonoContacto: {
    type: String,
    required: true,
  },
  correoContacto: {
    type: String,
    required: true,
  },
});

/**
 * Modelo de entidad de un Componente
 */
export default mongoose.model("Organizacion", schema, "Organizaciones");
