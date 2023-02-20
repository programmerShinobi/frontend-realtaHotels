import Head from 'next/head';
import { Box, Button } from "@mui/material";
import { useRouter } from 'next/router';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { doLogin } from '@/redux/Actions/Users/reduceActions';
import Cookies from "js-cookie";
import LayoutGuest from '@/components/Layout/LayoutGuest';

export default function Guest() {
  const router = useRouter();

  // useDispatch
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(doLogin());
    localStorage.removeItem('token');
    localStorage.removeItem('roleId');
    localStorage.removeItem('userId');
    localStorage.removeItem('userFullName');
    localStorage.removeItem('profilePhotoMe');
    localStorage.removeItem('userFullNameNew');
    Cookies.remove('userId');
    setTimeout(() => {
      router.push('/auth/signin');
    }, 500);
  };

  return (
    <Box>
      <Head>
        <title>Guest</title>
      </Head>
      <LayoutGuest>
          <center className="title mx-auto my-auto">
            <h1 className='text-orange-600 text-3xl font-bold pb-2 '>--- GUEST ---</h1>
          </center> 
      </LayoutGuest>
    </Box>
  );
}