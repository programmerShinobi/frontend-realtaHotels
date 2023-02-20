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
        <section className='Wmx-auto my-auto gap-3 rounded-xl' >
        <div className="title">
          <h1 className='text-orange-600 text-3xl font-bold pb-2 '>--- GUEST ---</h1>
          <p className=' mx-auto my-auto text-gray-400 text-sm pb-3 '>HOME</p>
        </div>
          <Button
            className="bg-orange-100 hover:bg-orange-500 hover:text-white text-gray-700 rounded p-2 normal-case font-normal group transition-colors"
            onClick={handleLogout}>
            <LogoutIcon className="h-4 w-4 mr-2" /> Logout
          </Button>
          
        </section>
      </LayoutGuest>
    </Box>
  );
}