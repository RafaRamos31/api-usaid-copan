import mongoose from "mongoose";

export const getFilter = ({tipo=null, queryArchivo=null, ut=null, municipio=null, query=null}) => {

  let filter = {}

  if (tipo) {
    filter.tipo = tipo;
  }

  if (ut) {
    filter.unidadTecnica = mongoose.Types.ObjectId(ut);
  }

  if (municipio) {
    filter.municipio = mongoose.Types.ObjectId(municipio);
  }

  if (query) {
    filter.contenido = { $regex: query, $options: 'i' }
  }

  if (queryArchivo) {
    filter.nombre = { $regex: queryArchivo, $options: 'i' }
  }

  return filter;
}