import React, { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from 'react';
import { NextPage } from "next";
import LoadingIndicator from "../Indicator/loading";

const ComponentsPrivateWithAuth = <P extends object>(WrappedComponent: NextPage<P>) => {
  return (props: P) => {
    const router = useRouter();
    const [isToken, setIsToken] = useState(null);
    useEffect(() => {
      const token: any = localStorage.getItem('token');
      if (!token) {
<<<<<<< Updated upstream
        setIsToken(null)
        router.push('users/signin');
=======
        setIsToken(null);
        router.push('/users/signin');
>>>>>>> Stashed changes
      }
      else {
        setIsToken(token);
      }
    }, []);
    if (isToken) {
      return <WrappedComponent {...props} />;
    }
    else {
      return (<LoadingIndicator/>);
    }
  }
}

export default ComponentsPrivateWithAuth;