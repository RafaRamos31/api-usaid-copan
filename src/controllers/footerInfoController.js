import FooterInfo from "../models/footerInfo.js";

export const getFooterInfo = async (req, res) => {
  try {
    const footerInfo = await getFooterInfoFile();
    res.json(footerInfo);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener Informacion de Footer: ' + error });
  }
}

export const editFooterInfo = async (req, res) => {
  try {
    const { direccion, correo, telefono, facebook, instagram, youtube, twitter, tiktok } = req.body;

    const footerInfo = await getFooterInfoFile();

    footerInfo.direccion = direccion;
    footerInfo.correo = correo;
    footerInfo.telefono = telefono;
    footerInfo.facebook = facebook;
    footerInfo.instagram = instagram;
    footerInfo.youtube = youtube;
    footerInfo.twitter = twitter;
    footerInfo.tiktok = tiktok;

    footerInfo.save();
    res.json(footerInfo);
  } catch (error) {
    res.status(500).json({ error: 'Error al editar Informacion de Footer: ' + error });
  }
}

const getFooterInfoFile = async () => {
  let footerInfo = await FooterInfo.findOne({ref: 1})
    if(!footerInfo){
      footerInfo = new FooterInfo({
        ref: 1,
        direccion: '',
        correo: '',
        telefono: '',
        facebook: '',
        instagram: '',
        youtube: '',
        twitter: '',
        twitter: '',
        tiktok: '',
      })
      footerInfo.save();
    }
  return footerInfo;
}
