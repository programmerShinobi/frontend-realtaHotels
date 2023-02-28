import Head from 'next/head';
import { Box, InputLabel } from "@mui/material";
import Link from "next/link";
import { useRouter } from 'next/router';
import Layout from '@/components/Layout/Layout';

export default function Home() {
const router = useRouter();
  return (
    <Box>
      <Head>
        <title>Home</title>
      </Head>
      <Layout>
      <section className='Wmx-auto my-auto gap-3 rounded-xl' >
        <div className="title">
          <h1 className='text-orange-600 text-3xl font-bold pb-2 '>--- Realta Hotels ---</h1>
          <p className=' mx-auto my-auto text-gray-400 text-sm pb-3 '>HOME</p>
        </div>
        <InputLabel
          className='text-center text-gray-400 text-sm'
          sx={{ gridColumn: "span 4" }}
        >
          <Link   href={'/users/signin'} className='text-orange-500'>Sign In</Link> | <Link   href={'/users/signupEmployee'} className='text-orange-500'> Sign Up</Link>
        </InputLabel>
      </section>
      </Layout>
    </Box>
  );
}