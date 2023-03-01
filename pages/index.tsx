import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react'
import Layout from '@/components/Layout';
import { Box, Typography } from "@mui/material"
import styles from '../styles/ContentHome.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Layout>
        <Box className="grid shadow-lg shadow-orange-100 rounded-xl bg-white pb-8">
          {/* Home */}
          <Box className="mt-8 mb-4 pl-8 font-bold shadow-md w-full h-fit py-2 px-2 mx-auto items-center bg-orange-100 text-orange-900 hover:bg-orange-200 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-75">
            <Typography className={styles.textTitleInHome}>
              Welcome to our official hotel !
            </Typography>
          </Box>
          <Box className="pl-8 pr-8 font-normal text-orange-900 text-justify">
            <Typography className={styles.textLabelInHome}>
              We are delighted to provide you with the best service possible and make your stay an unforgettable experience. From booking to check-out, our team is ready to assist you in every step of your journey. Please explore our website to learn more about our facilities and services. Thank you for choosing our hotel as your place to stay
            </Typography>
          </Box>
        </Box>

      </Layout>
    </>
  );
}