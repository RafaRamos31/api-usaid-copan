
import nodemailer from 'nodemailer'

export const sendMail = async (pagina, nombre, apellido, municipio, comunidad, correo, telefono, asunto) => {

  // Configura el transporte del correo electrónico (Gmail en este ejemplo)
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.GOOGLE_MAIL, // Coloca tu dirección de correo electrónico
      pass: process.env.CLAVE_MAIL, // Coloca tu contraseña de correo electrónico
    },
  });

  const mailOptions = {
    from: process.env.GOOGLE_MAIL, // Remitente (debe ser la misma cuenta que se usa para el transporte)
    to: process.env.RECEPTOR_MAIL, // Destinatario
    subject: 'Correo de la Pagina Web: ' + pagina,
    text: `${asunto}. \n ${nombre + ' ' + apellido} \n Municipio: ${municipio} \n Comunidad: ${comunidad} \n Correo electronico: ${correo} \n Teléfono: ${telefono}`,
  };

  const response = await transporter.sendMail(mailOptions)
  return response;
}
