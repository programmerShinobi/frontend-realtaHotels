import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

// const sendWA = () => {
const sendWAOld = (fullPhoneNumber:any, password:any, cookie:any) => {
  // const fullPhoneNumber = '+6282121991992';
  // const password = 'GuesT!2023021982121991992';

  // const [fullPhoneNumber, setFullPhoneNumber]:any = useState([]);
  // const [password, setPassword]:any = useState([]);

    const apiKey = '9699c055d1ea2d9ce1ca02e22adf36ef69f6fc2a'; // API KEY Anda
    const idDevice = '5580'; // ID DEVICE yang di SCAN (Sebagai pengirim)
    const url = 'https://api.watsap.id/send-message'; // URL API
    const noHp = fullPhoneNumber; // No.HP yang dikirim (No.HP Penerima)
    const pesan = `Welcome to Realta Hotels. For login access, your password is : 
    ${password}`; // Pesan yang dikirim
  
    const dataPost = {
      'id_device': idDevice,
      'api-key': apiKey,
      'no_hp': noHp,
      'pesan': pesan
    };

    axios.post(url, dataPost, {
      headers: {
        'Content-Type': 'application/json',
         'Accept': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
        'Cookie': cookie
      }
    })
    .then((response: any) => {
      // Cookies.remove('isPhoneNumber');
      // Cookies.remove('isPassword');
      console.info(response.data);
    })
    .catch((error:any) => {
      console.info(error);
    });
  
};

export default sendWAOld;
