# API de Gestion Seccional USAID

Servicio de peticiones con Express.js para el envio y recepcion de informacion y archivos utilizados por las diferentes
unidades de educacion y salud de USAID.

## Herramientas utilizadas

- Node.js
- MongoDB
- Google Auth

## Instalación

1. Clona este repositorio: `git clone https://github.com/tu-usuario/nombre-del-repo.git`
2. Ingresa al directorio del proyecto: `cd nombre-del-repo`
3. Instala las dependencias: `npm install`

## Configuración

1. Crea un archivo `.env` en la raíz del proyecto y configura las variables de entorno necesarias. Puedes utilizar el archivo `.env.example` como base.

## Uso

1. Inicia el servidor: `npm start`
2. La API estará disponible en `http://localhost:4000`

## Endpoints

### GET /api/noticias

Endpoint para la obtencion de un arreglo de noticias, las cuales vendran ordenadas en orden cronologico a su fecha de subida. Y aplicando un limite en la cantidad de items obtenidos.

### POST /api/noticias

Endpoint para la publicacion de una noticia, guardando los archivos adjuntos en Google Drive, y la informacion general de la noticia en MongoDB

### GET /api/departamentos

Endpoint para la obtencion de un arreglo de departamentos, necesarios para la organizacion y filtrado de noticias, a la hora de mostrarlas o de publicar una nueva.

