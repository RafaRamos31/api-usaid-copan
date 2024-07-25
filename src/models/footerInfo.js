import mongoose from "mongoose";

const schema = new mongoose.Schema({
  ref: {
    type: String,
    required: true,
  },
  direccion: {
    type: String,
  },
  correo: {
    type: String,
  },
  telefono: {
    type: String,
  },
  facebook: {
    type: String,
  },
  instagram: {
    type: String,
  },
  youtube: {
    type: String,
  },
  twitter: {
    type: String,
  },
});

export default mongoose.model("FooterInfo", schema, "FooterInfo");
