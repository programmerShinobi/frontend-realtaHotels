import dotenv from 'dotenv';
dotenv.config();

const sendWADefault = (): void => {
  const apiKey = process.env.API_KEY; // API KEY Anda
  const idDevice = process.env.ID_DEVICE; // ID DEVICE yang di SCAN (Sebagai pengirim)
  const url = 'https://api.watsap.id/send-message'; // URL API
  const noHp = '+6282121991992'; // No.HP yang dikirim (No.HP Penerima)
  const pesan = 'Assalamualaikum.. '; // Pesan yang dikirim

  const dataPost = {
    'id_device': idDevice,
    'api-key': apiKey,
    'no_hp': noHp,
    'pesan': pesan
  };

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataPost),
  };

  fetch(url, requestOptions)
    .then(response => response.text())
    .then(result => console.info(result))
    .catch(error => console.info('error', error));
};

export default sendWADefault;

