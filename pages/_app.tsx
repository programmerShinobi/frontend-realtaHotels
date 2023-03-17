import React, { useEffect, useState } from 'react';
import { SessionProvider } from 'next-auth/react'
import '@/styles/globals.css'
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from "@/redux/Store";
import 'react-toastify/dist/ReactToastify.css';
import ToastIndicator from "@/components/Indicator/toast";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

const App: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  const [isToken, setIsToken]: any = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsToken(true);
    }
  });

  if (isToken) {
    setTimeout(async () => {
    await localStorage.removeItem('token');
      await localStorage.removeItem('roleId');
      await localStorage.removeItem('userId');
      await localStorage.removeItem('userFullName');
      await localStorage.removeItem('profilePhotoMe');
      await localStorage.removeItem('userFullNameNew');
      await localStorage.removeItem('userPhoto');
      await localStorage.removeItem('Email');
      await localStorage.removeItem('UserType');
      await localStorage.removeItem('PhoneNumber');
      await Cookies.remove('userId');
      await setIsToken(false);
    }, 3600000); // 3600 detik = 1 jam
  }

  return (
    <SessionProvider session={pageProps.session}>
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="light"
        />
      
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
          
    </SessionProvider>
  );
};

export default App;
