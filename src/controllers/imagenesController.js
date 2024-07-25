import Imagen from "../models/imagen.js";
import { getInitialImagenes } from '../utilities/initialData.js'
import { uploadFile } from "./google-controller.js";

export const getImagenesList = async (req, res) => {
  try {
    let imagenes = await Imagen.find()
    if(imagenes.length === 0){
      await Imagen.insertMany(getInitialImagenes())
      imagenes = await Imagen.find();
    }
    res.json(imagenes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las imágenes de Inicio: ' + error });
  }
}

//Create
export const subirImagenHome = async (req, res) => {
  try {
    const { nombre } = req.body;
    const data = req.files[0];

    const imagen = await Imagen.findOne({nombre})

    //Subir archivo a Google Drive
    const fileId = await uploadFile(data.originalname, data.mimetype, data.buffer)

    imagen.fileId = fileId;
    imagen.enlace = 'https://drive.google.com/file/d/' + fileId + '/view';

    imagen.save();
    
    res.json(imagen);
  } catch (error) {
    res.status(500).json({ error: 'Error al subir la imagen: ' + error });
  }
}