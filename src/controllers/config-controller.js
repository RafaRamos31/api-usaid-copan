/**
 * Archivo para definir metodos de acceso a la base de datos de MongoDB
 * Para manipular los registros de la coleccion de Usuarios
 *
 * Autor: USAID - Proyecto Avanzando por la Salud de Honduras
 * Fecha: Junio 2023
 * Versión: 1.0.0
 */

import Configuracion from "../models/configuracion.js";

export async function getConfig() {
  let config = await Configuracion.findOne({ ref: 1 });
  if (!config) {
    config = createConfig();
  }
  return config;
}


export async function updateGeneralConfig(
  {
  nosotros, mensaje, autor, 
  mision, vision, urlMapa
  }
) {

  let config = await getConfig()

  config.nosotros = nosotros
  config.mensaje = mensaje
  config.autor = autor
  config.mision = mision
  config.vision = vision
  config.urlMapa = urlMapa

  return config.save()
}


function createConfig() {
  const initConfig = new Configuracion({
    ref: 1,
    mensaje: "Mensaje de un representante de la region",
    autor: "Nombre y Cargo del representante",
    nosotros: "Texto de Seccion Sobre Nosotros de la pagina",
    mision: "La mision de la Regional",
    vision: "La vision de la Regional",
    urlMapa: " ",
    valores: [
      {
        nombre: "Valor 1",
        descripcion: "Descripcion del Valor 1",
      },
      {
        nombre: "Valor 2",
        descripcion: "Descripcion del Valor 2",
      },
      {
        nombre: "Valor 3",
        descripcion: "Descripcion del Valor 3",
      },
      {
        nombre: "Valor 4",
        descripcion: "Descripcion del Valor 4",
      },
    ],
  });

  return initConfig.save();
}
