/**
 * Archivo para definir metodos de acceso a la base de datos de MongoDB
 * Para manipular los registros de la coleccion de Departamentos
 *
 * Autor: USAID - Proyecto Avanzando por la Salud de Honduras
 * Fecha: Junio 2023
 * Versión: 1.0.0
 */
import Departamento from "../models/departamento.js";
import { throwInvalidArgsError, throwInvalidIDError, throwNotFoundException } from "../utilities/errorHandler.js";

/**
 * Obtiene de la base de datos la lista de todos los departamentos o secciones de la regional
 * @returns Un arreglo con todos los departamento de la BD
 */
export async function getAllDepartamentos(){
  return Departamento.find();
}

/**
 * Busca en la base de datos por un departamento en especifico y devuelve su informacion
 * @param {string} idDepartamento el ID unico del departamento del cual se requiere informacion
 * @returns un documento JSON con la informacion del departamento seleccionado
 */
export async function getDepartamentoById(idDepartamento){
  return Departamento.findById(idDepartamento).catch((error) => throwInvalidIDError("Departamento", error.message));
}

/**
 * Obtiene de la base de datos la lista de todos los departamentos o secciones de la regional
 * @returns Un arreglo con todos los departamento de la BD
 */
export async function crearDepartamento({nombre, urlLogo}){
  const departamento = new Departamento({
    nombre, 
    urlLogo
  });

  return departamento.save().catch((error) => throwInvalidArgsError(error.message));
}


export async function modificarDepartamento({idDepartamento, nombre, urlLogo}){
  const departamento = await getDepartamentoById(idDepartamento);
  if(!departamento) return throwNotFoundException("Departamento");

  departamento.nombre = nombre;
  departamento.urlLogo = urlLogo;

  return departamento.save().catch((error) => throwInvalidArgsError(error.message));
}


export async function eliminarDepartamento({idDepartamento}){
  const departamento = await getDepartamentoById(idDepartamento);
  if(!departamento) return throwNotFoundException("Departamento");

  return departamento.delete();
}


export async function populateUnidadesSalud(){
  const unidades = [
    { nombre: 'Dirección General de Normalización'},
    { nombre: 'Unidad de Vigilancia de la Salud'},
    { nombre: 'Programa Ampliado de Inmunización PAI'},
    { nombre: 'Unidad de Comunicación Institucional'},
    { nombre: 'Comité de Control Interno Institucional'},
    { nombre: 'Unidad Administradora de Fondos de Cooperación Externa UAFCE'},
    { nombre: 'Unidad de Licitaciones'},
    { nombre: 'Bienes Nacionales'},
    { nombre: 'Primer Nivel de Atención'},
    { nombre: 'Segundo Nivel de Atención'},
    { nombre: 'Unidad de Transparencia'},
    { nombre: 'Subsecretaria de Redes Integradas de Servicio de Salud'},
    { nombre: 'Unidad de Logistica de Medicamentos e Insumos'},
    { nombre: 'Dirección General de Vigilancia del Marco Normativo'},
    { nombre: 'Unidad de Gestión de la Información'},
    { nombre: 'Unidad de Planeamiento y Evaluacion de la Gestión'},
  ];

  return Departamento.insertMany(unidades)
}