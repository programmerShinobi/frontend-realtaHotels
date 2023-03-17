import Head from 'next/head';
import React from 'react'
import LayoutGuest from "@/components/Layout/guest";

export default function Guest() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <LayoutGuest>
        <div className="text-center">
            {"This is Home Page"}
        </div>
      </LayoutGuest>
    </>
  );
}