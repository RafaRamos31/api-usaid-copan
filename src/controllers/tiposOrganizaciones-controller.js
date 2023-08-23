import TipoOrganizacion from "../models/tiposOrganizaciones.js";

export async function getAllOrgTypes(){
  return TipoOrganizacion.find();
}

export async function getOrgTypeById(idOrgType){
  try {
    const orgType = await TipoOrganizacion.findById(idOrgType);
    return orgType;
  } catch (error) {
    throw error;
  }
}

export async function createOrgType(nombre){
  const orgType = new TipoOrganizacion({
    nombre
  })

  return orgType.save();
}

export async function editOrgType(idOrgtype, nombre){
  const orgtype = await getOrgTypeById(idOrgtype);
  if(!orgtype) return null;

  orgtype.nombre = nombre;
  return orgtype.save();
}

export async function deleteOrgType(idOrgtype){
  const orgType = await getOrgTypeById(idOrgtype);
  if(!orgType) return null;

  return orgType.delete();
}