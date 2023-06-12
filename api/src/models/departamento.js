import mongoose from "mongoose";

const schema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    minlength: 3,
  },
  urlLogo: {
    type: String,
    required: true
  }
});

export default mongoose.model("Departamento", schema, "Departamentos");
