import Noticia from "../models/noticia.js";
import { getDepartamentoById } from "./departamentos-controller.js";

export async function getNoticias(){
  return Noticia.find().populate("departamento");
}

export async function addNoticia({deptoId, contenido, nombreArchivo}){
  const departamento = await getDepartamentoById(deptoId);
  
  const noticia = new Noticia({
    departamento, 
    contenido,
    fechaPublicacion: Date.now(),
    tipoMultimedia: determinarTipo(nombreArchivo),
    enlaces: []
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