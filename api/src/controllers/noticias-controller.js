import Noticia from "../models/noticia.js";
import { getDepartamentoById } from "./departamentos-controller.js";

export async function getNoticias(){
  return Noticia.find().sort({ _id: -1 }).limit(5).populate("departamento");
}

export async function addNoticia({deptoId, contenido, nombreArchivo, enlace}){
  const departamento = await getDepartamentoById(deptoId);
  
  const noticia = new Noticia({
    departamento, 
    contenido,
    fechaPublicacion: Date.now(),
    tipoMultimedia: determinarTipo(nombreArchivo),
    enlaces: [enlace]
  });

  const saved = (await noticia.save());
  return saved;
}

function determinarTipo(nombreArchivo){

  if(!nombreArchivo) return "";
  
  const extensionesDocumento = ["doc", "docx", "pdf", "xls", "xlsx", "xlsm", "ppt", "pptx"];
  const extensionesImagen = ["img", "png", "jpg", "jpeg", "gif"];
  const extensionesVideo = ["mp4", "mpeg4", "avi", "wmv", "mov", "3gp", "3gpp"];

  const extension = nombreArchivo.split('.').pop();

  if(extensionesDocumento.includes(extension)) {
    return 'Documento';
  }

  if(extensionesImagen.includes(extension)) {
    return 'Imagen';
  }

  if(extensionesVideo.includes(extension)) {
    return 'Video';
  }

  return "No válido";
}