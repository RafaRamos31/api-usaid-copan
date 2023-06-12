import Departamento from "../models/departamento.js";

export async function addDepto() {
  const depto = new Departamento({
    nombre: "Nombre depto2",
    urlLogo: "google.com/logo"
  });
  return depto.save();
}

export async function findDeptoById(deptoId) {
  return await Departamento.findById(deptoId);
}
