import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

// const sendWA = () => {
const sendWAOld3 = () => {
  // const fullPhoneNumber = '+6282121991992';
  // const password = 'GuesT!2023021982121991992';

  const [fullPhoneNumber, setFullPhoneNumber]:any = useState([]);
  const [password, setPassword]:any = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('load', function(event) {
        const isPhoneNumber = localStorage.getItem('isPhoneNumber');
        const isPassword = localStorage.getItem('isPassword');
        setFullPhoneNumber(isPhoneNumber);
        setPassword(isPassword);
      });
    }
  });

  const apiKey = 'bdfe96343483e9a73bdac49d971b302121c374f9'; // API KEY Anda
  const idDevice = '5815'; // ID DEVICE yang di SCAN (Sebagai pengirim)
  const url = 'https://api.watsap.id/send-message'; // URL API
  const noHp = fullPhoneNumber; // No.HP yang dikirim (No.HP Penerima)
  const pesan = `Welcome to Realta Hotels. Your login access with password is :\n${password}`; // Pesan yang dikirim

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
      'Access-Control-Allow-Origin': '*',
    }
  }).then((response: any) => {
    localStorage.removeItem('isPhoneNumber');
    localStorage.removeItem('isPassword');
    console.info(response.data);
  })
  .catch((error:any) => {
    console.info(error);
  });
  
};

export default sendWAOld3;
