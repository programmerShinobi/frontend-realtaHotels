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
          <Box className="m-8 pl-8 font-bold shadow-md w-full h-fit py-2 px-2 mx-auto items-center bg-orange-100 text-orange-900 hover:bg-orange-200 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-75">
            <Typography className={styles.textTitleInProfile}>
              Enjoy your holiday with us
            </Typography>
          </Box>
          <Box className="pl-8 pr-8 font-normal text-orange-900 text-justify">
            <Typography className={styles.textLabelInProfile}>
              Our hotel is located in the heart of the city, providing easy access to popular tourist attractions and business hubs.
Enjoy unbeatable rates and special promotions when you book a room at our hotel.
            </Typography>
          </Box>
        </Box>

      </Layout>
    </>
  );
}