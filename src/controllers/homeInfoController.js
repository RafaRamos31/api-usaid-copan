import HomeInfo from "../models/homeInfo.js";

export const getHomeInfo = async (req, res) => {
  try {
    const homeInfo = await getHomeInfoFile();
    res.json(homeInfo);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener Informacion de Inicio: ' + error });
  }
}

export const editHomeInfo = async (req, res) => {
  try {
    const {nosotros, mensaje, autor, cargo, mision, vision} = req.body;

    const homeInfo = await getHomeInfoFile();

    homeInfo.nosotros = nosotros;
    homeInfo.mensaje = mensaje;
    homeInfo.autor = autor;
    homeInfo.cargo = cargo;
    homeInfo.mision = mision;
    homeInfo.vision = vision;

    homeInfo.save();
    res.json(homeInfo);
  } catch (error) {
    res.status(500).json({ error: 'Error al editar Informacion de Inicio: ' + error });
  }
}

const getHomeInfoFile = async () => {
  let homeInfo = await HomeInfo.findOne({ref: 1})
    if(!homeInfo){
      homeInfo = new HomeInfo({
        ref: 1,
        nosotros: null,
        mensaje: null,
        autor: null,
        cargo: null,
        mision: null,
        vision: null
      })
      homeInfo.save();
    }
  return homeInfo;
}
