import Componente from "../models/componentes.js";

export async function getAllComponentes(){
  return Componente.find();
}

export async function getComponentById(idComponente){
  try {
    const componente = await Componente.findById(idComponente);
    return componente;
  } catch (error) {
    throw error;
  }
}

export async function createComponente(nombre){
  const componente = new Componente({
    nombre
  })

  return componente.save();
}

export async function editComponente(idComponente, nombre){
  const componente = await getComponentById(idComponente);
  if(!componente) return null;

  componente.nombre = nombre;
  return componente.save();
}

export async function deleteComponente(idComponente){
  const componente = await getComponentById(idComponente);
  if(!componente) return null;

  return componente.delete();
}