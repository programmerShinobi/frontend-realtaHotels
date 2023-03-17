import React from "react";
import NProgress from "nprogress";
import { useRouter } from "next/router";
import { Backdrop, CircularProgress } from "@mui/material";

const ComponentsIndicatorLoading: React.FC = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  React.useEffect(() => {
    if (isMounted) {
      const handleRouteChangeStart = () => NProgress.start();
      const handleRouteChangeComplete = () => NProgress.done();
      const handleRouteChangeError = () => NProgress.done();

      router.events.on('routeChangeStart', handleRouteChangeStart);
      router.events.on('routeChangeComplete', handleRouteChangeComplete);
      router.events.on('routeChangeError', handleRouteChangeError);

      return () => {
        router.events.off('routeChangeStart', handleRouteChangeStart);
        router.events.off('routeChangeComplete', handleRouteChangeComplete);
        router.events.off('routeChangeError', handleRouteChangeError);
      };
    }
  }, [isMounted, router]);

  return (
    <div id="loading-indicator">
      <Backdrop
        sx={{ color:"#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default ComponentsIndicatorLoading;
