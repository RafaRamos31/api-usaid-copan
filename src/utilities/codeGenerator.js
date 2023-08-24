export function generarCodigoAleatorio() {
  // Generar cada dígito del código aleatoriamente entre 0 y 9
  const digito1 = Math.floor(Math.random() * 10);
  const digito2 = Math.floor(Math.random() * 10);
  const digito3 = Math.floor(Math.random() * 10);
  const digito4 = Math.floor(Math.random() * 10);

  // Unir los dígitos para formar el código
  const codigo = `${digito1}${digito2}${digito3}${digito4}`;

  return codigo;
}