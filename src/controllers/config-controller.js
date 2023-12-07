/**
 * Archivo para definir metodos de acceso a la base de datos de MongoDB
 * Para manipular los registros de la coleccion de Usuarios
 *
 * Autor: USAID - Proyecto Avanzando por la Salud de Honduras
 * Fecha: Junio 2023
 * Versión: 1.0.0
 */

import Configuracion from "../models/configuracion.js";

/**Config General */

export async function getGeneralConfig() {
  let config = await Configuracion.findOne({ ref: 'general' });
  if (!config) {
    config = createGeneralConfig();
  }
  return config;
}


export async function updateGeneralConfig(
  {
  nosotros, mensaje, autor, 
  mision, vision, urlMapa
  }
) {

  let config = await getGeneralConfig()

  config.nosotros = nosotros
  config.mensaje = mensaje
  config.autor = autor
  config.mision = mision
  config.vision = vision
  config.urlMapa = urlMapa

  return config.save()
}


function createGeneralConfig() {
  const initConfig = new Configuracion({
    ref: 'general',
    mensaje: "Mensaje de un representante de la region",
    autor: "Nombre y Cargo del representante",
    nosotros: "Texto de Seccion Sobre Nosotros de la pagina",
    mision: "La mision de la Regional",
    vision: "La vision de la Regional",
    urlMapa: " ",
  });

  return initConfig.save();
}


/**Config Valores */

export async function getValoresConfig() {
  let config = await Configuracion.findOne({ ref: 'valores' });
  if (!config) {
    config = createValoresConfig();
  }
  return config;
}


export async function updateValoresConfig({names, values}) {

  let config = await getValoresConfig();

  config.valores = [
    {
      nombre: "Valor 1",
      descripcion: "Descripcion del Valor 1",
    },
    {
      nombre: "Valor 2",
      descripcion: "Descripcion del Valor 2",
    }
  ]

  //return config.save()
  return {names, values}
}


function createValoresConfig() {
  const initConfig = new Configuracion({
    ref: 'valores',
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


/**Config Footer */

export async function getFooterConfig() {
  let config = await Configuracion.findOne({ ref: 'footer' });
  if (!config) {
    config = createFooterConfig();
  }
  return config;
}


export async function updateFooterConfig({valoresList}) {

  let config = await getFooterConfig()

  config.valores = [
    {
      nombre: "Valor 1",
      descripcion: "Descripcion del Valor 1",
    },
    {
      nombre: "Valor 2",
      descripcion: "Descripcion del Valor 2",
    }
  ]

  return config.save()
}


function createFooterConfig() {
  const initConfig = new Configuracion({
    ref: 'footer',
    footerCorreo: 'correo@server.com',
    footerDireccion: 'Direccion',
    footerTelefonos: '9999-1111 / 8888-0000',
    footerDesc: 'Descripcion resumidad de la pagina',
    footerEnlace: '',
    footerRedes: [
      {
        "name":"Facebook",
        "exists":true,
        "enlace":"/"
      },
      {
        "name":"Twitter",
        "exists":false,
        "enlace":"/"
      },
      {
        "name":"Google",
        "exists":false,
        "enlace":"/"
      },
      {
        "name":"Youtube",
        "exists":false,
        "enlace":"/"
      },
      {
        "name":"Instagram",
        "exists":false,
        "enlace":"/"
      }
    ],
  });

  return initConfig.save();
}


/**Config Contactos */

export async function getContactosConfig() {
  let config = await Configuracion.findOne({ ref: 'contactos' });
  if (!config) {
    config = createContactosConfig();
  }
  return config;
}


export async function updateContactosConfig({valoresList}) {

  let config = await getContactosConfig()

  config.valores = [
    {
      nombre: "Valor 1",
      descripcion: "Descripcion del Valor 1",
    },
    {
      nombre: "Valor 2",
      descripcion: "Descripcion del Valor 2",
    }
  ]

  return config.save()
}


function createContactosConfig() {
  const initConfig = new Configuracion({
    ref: 'contactos',
    contactos: [
      {
        "name":"Lugar 1",
        "referencias": 
        [
          "Establecimiento 1: +504 9000-0000",
          "Establecimiento 2: +504 9000-0000"
        ]
      },
      {
        "name":"Lugar 2",
        "referencias": 
        [
          "Establecimiento 1: +504 9000-0000",
          "Establecimiento 2: +504 9000-0000"
        ]
      },
      {
        "name":"Lugar 3",
        "referencias": 
        [
          "Establecimiento 1: +504 9000-0000",
          "Establecimiento 2: +504 9000-0000"
        ]
      }
    ]
  });

  return initConfig.save();
}
