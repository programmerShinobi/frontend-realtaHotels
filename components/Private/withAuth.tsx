import React, { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from 'react';
import { NextPage } from "next";
import LoadingIndicator from "../Indicator/LoadingIndicator";

const WithAuth = <P extends object>(WrappedComponent: NextPage<P>) => {
  return (props: P) => {
    const router = useRouter();
    const [isToken, setIsToken] = useState(null);
    useEffect(() => {
      const token: any = localStorage.getItem('token');
      if (!token) {
        setIsToken(null);
        router.replace('/users/login');
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

export default WithAuth;