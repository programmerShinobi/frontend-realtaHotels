import React, { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from 'react';
import { NextPage } from "next";
import Loading from "@/pages/loading";

const WithAuth = <P extends object>(WrappedComponent: NextPage<P>) => {
  return (props: P) => {
    const router = useRouter();
    const [isToken, setIsToken] = useState(null);
    useEffect(() => {
      const token: any = localStorage.getItem('token');
      if (!token) {
        setIsToken(null)
        router.push('auth/signin');
      }
      else {
        setIsToken(token);
      }
    }, []);
    if (isToken) {
      return <WrappedComponent {...props} />;
    }
    else {
      return (<Loading/>);
    }
  }
}

export default WithAuth;