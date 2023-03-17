import axios from 'axios';
import { toString } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function sendWA () {
  // const fullPhoneNumber = '+6282121991992';
  // const password = 'GuesT!2023021982121991992';

  const [fullPhoneNumber, setFullPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const isPhoneNumber = toString(localStorage.getItem('isPhoneNumber'));
  const isPassword = toString(localStorage.getItem('isPassword'));
  setFullPhoneNumber(isPhoneNumber);
  setPassword(isPassword);

  const sender = '+6281212499837'; // No.Hp Pengirim
  const apiKey = 'jTYnHBlDlPrzM0EFEidotthE2Xnv18'; // API KEY Anda
  const url = 'https://server.wa-bisnis.com/send-message'; // URL API
  const receiver = fullPhoneNumber; // No.HP Penerima
  const pesan = `Welcome to Realta Hotels. Your login access with password is :\n${password}`; // Pesan yang dikirim

  const data = {
    api_key: apiKey,
    sender: sender,
    number: receiver,
    message: pesan,
  };

  axios.post(url, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => {
      const router = useRouter();
      localStorage.removeItem('isPhoneNumber');
      localStorage.removeItem('isPassword');
      router.push('/auth/signin');
  }).catch(error => {
    console.error(error);
  }); 
};

