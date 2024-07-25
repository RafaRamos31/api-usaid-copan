import nodemailer from 'nodemailer'

export const sendMail = async (req, res) => {
  const { nombre, apellido, municipio, comunidad, correo, telefono, asunto } = req.body;
  try {

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      service: 'gmail',
      auth: {
        user: process.env.GOOGLE_MAIL,
        pass: process.env.CLAVE_MAIL,
      },
    });

    const mailOptions = {
      from: process.env.GOOGLE_MAIL,
      to: process.env.RECEPTOR_MAIL,
      subject: 'Correo de la Pagina Web',
      text: `${asunto}. \n ${nombre + ' ' + apellido} \n Municipio: ${municipio} \n Comunidad: ${comunidad} \n Correo electronico: ${correo} \n Teléfono: ${telefono}`,
    };

    const response = await transporter.sendMail(mailOptions)
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Error al enviar Email: ' + error });
  }
}
