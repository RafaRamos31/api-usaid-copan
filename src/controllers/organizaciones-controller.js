import Organizacion from "../models/organizaciones.js";
import { getAldeaByIdSimple } from "./aldeas-controller.js";
import { getCaserioByIdSimple } from "./caserios-controller.js";
import { getDepartamentoById } from "./departamentos-controller.js";
import { getMunicipioByIdSimple } from "./municipios-controller.js";
import { getOrgTypeById } from "./tiposOrganizaciones-controller.js";

export async function getOrganizacionById(idOrganizacion){
  try {
    const organizacion = await Organizacion.findById(idOrganizacion).populate(['tipoOrganizacion', 
    'departamento', 'municipio', 'aldea', 'caserio']);
    return organizacion;
  } catch (error) {
    throw error;
  }
}

export async function getOrganizaciones(tipo=null, nivel=null, departamento=null, municipio=null, aldea=null, caserio=null){
  try {

    let filter = {}

    if(tipo){
      filter = {...filter, tipoOrganizacion: {_id: tipo}}
    }

    if(nivel){
      filter = {...filter, nivelOrganizacion: nivel}
    }

    if(departamento){
      filter = {...filter, departamento: {_id: departamento}}
    }

    if(municipio){
      filter = {...filter, municipio: {_id: municipio}}
    }

    if(aldea){
      filter = {...filter, aldea: {_id: aldea}}
    }

    if(caserio){
      filter = {...filter, caserio: {_id: caserio}}
    }

    const organizaciones = await Organizacion.find(filter).populate(['tipoOrganizacion', 
    'departamento', 'municipio', 'aldea', 'caserio']);
    return organizaciones;
  } catch (error) {
    throw error;
  }
}

export async function createOrganizacion(codigo, idOrgtype, nivel, nombre, idDepartamento, idMunicipio,
  idAldea, idCaserio, telefonoOrganizacion, nombreContacto, telefonoContacto, correoContacto){

  const promises = await Promise.all([
    getOrgTypeById(idOrgtype),
    getDepartamentoById(idDepartamento),
    getMunicipioByIdSimple(idMunicipio),
    getAldeaByIdSimple(idAldea),
    getCaserioByIdSimple(idCaserio)
  ])

  const organizacion = new Organizacion({
    codigoOrganizacion: codigo,
    tipoOrganizacion: promises[0],
    nivelOrganizacion: nivel,
    nombre,
    departamento: promises[1],
    municipio: promises[2],
    aldea: promises[3],
    caserio: promises[4],
    telefonoOrganizacion,
    nombreContacto,
    telefonoContacto,
    correoContacto
  })

  return organizacion.save();
}


export async function editOrganizacion(idOrganizacion, codigo, idOrgtype, nivel, nombre, idDepartamento, idMunicipio,
  idAldea, idCaserio, telefonoOrganizacion, nombreContacto, telefonoContacto, correoContacto){

  const organizacion = await getOrganizacionById(idOrganizacion);
  if(!organizacion) return null;

  const promises = await Promise.all([
    getOrgTypeById(idOrgtype),
    getDepartamentoById(idDepartamento),
    getMunicipioByIdSimple(idMunicipio),
    getAldeaByIdSimple(idAldea),
    getCaserioByIdSimple(idCaserio)
  ])

  organizacion.codigoOrganizacion = codigo;
  organizacion.tipoOrganizacion = promises[0];
  organizacion.nivelOrganizacion = nivel;
  organizacion.nombre = nombre;
  organizacion.departamento = promises[1];
  organizacion.municipio = promises[2];
  organizacion.aldea = promises[3];
  organizacion.caserio = promises[4];
  organizacion.telefonoOrganizacion = telefonoOrganizacion;
  organizacion.nombreContacto = nombreContacto;
  organizacion.telefonoContacto = telefonoContacto;
  organizacion.correoContacto = correoContacto;

  return organizacion.save();
}

export async function deleteOrganizacion(idOrganizacion){
  const organizacion = await getOrganizacionById(idOrganizacion);
  if(!organizacion) return null;

  return organizacion.delete();
}