import mongoose from "mongoose";

const schema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  enlace: {
    type: String,
    required: true,
  },
  ref: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Redian", schema, "Redian");
