import { google } from "googleapis";
import stream from "stream";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const KEYFILENAME = path.join(__dirname, '../../../credentials.json');
const SCOPES = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.GoogleAuth({
  keyFilename: KEYFILENAME,
  scopes: SCOPES,
});

export async function sendFiles(files){
  let enlaces = [];
  try {
    for (let i = 0; i < files.length; i++) {
      enlaces = enlaces.concat(await uploadFile(files[i]));
    }
    return enlaces;
  } catch (f) {
    throw new Error(f.message);
  }
}

const uploadFile = async (fileObject) => {
  const bufferStream = new stream.PassThrough();
  bufferStream.end(fileObject.buffer);
  const { data } = await google.drive({ version: "v3", auth }).files.create({
    media: {
      mimeType: fileObject.mimeType,
      body: bufferStream,
    },
    requestBody: {
      name: fileObject.originalname,
      parents: [process.env.GOOGLE_FOLDER_ID],
    },
    fields: "id,name",
  });
  
  return 'https://drive.google.com/file/d/' + data.id + '/view';
};