import mongoose from "mongoose";

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
  cargo: {
    type: String,
  },
  mision: {
    type: String,
  },
  vision: {
    type: String,
  },
});

export default mongoose.model("HomeInfo", schema, "HomeInfo");
