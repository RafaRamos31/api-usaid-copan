import mongoose from "mongoose";

const schema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  }
});

/**
 * Modelo de entidad de un Componente
 */
export default mongoose.model("TipoOrganizacion", schema, "TiposOrganizaciones");
