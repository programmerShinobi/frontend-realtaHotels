import React from "react";
import { SessionProvider } from 'next-auth/react'
import '@/styles/globals.css'
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from "@/redux/Store";
import LoadingIndicator from "@/components/Indicator/LoadingIndicator";
import NProgress from 'nprogress';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  const [loading, setLoading] = React.useState(false);
  const routeChangeStart = () => setLoading(true);
  const routeChangeComplete = () => {
    setLoading(false);
    if (typeof window !== 'undefined' && NProgress.isStarted()) {
      NProgress.remove();
    }
  };
  const routeChangeError = () => {
    setLoading(false);
    if (typeof window !== 'undefined' && NProgress.isStarted()) {
      NProgress.remove();
    }
  };

  React.useEffect(() => {
    router.events.on('routeChangeStart', routeChangeStart);
    router.events.on('routeChangeComplete', routeChangeComplete);
    router.events.on('routeChangeError', routeChangeError);

    return () => {
      router.events.off('routeChangeStart', routeChangeStart);
      router.events.off('routeChangeComplete', routeChangeComplete);
      router.events.off('routeChangeError', routeChangeError);
    };
  }, []);

  
  return (
    <SessionProvider session={pageProps.session}>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
      {loading && <LoadingIndicator />}
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
};

export default App;
