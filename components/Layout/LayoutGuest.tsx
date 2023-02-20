import { useRouter } from 'next/router';
import styles from '../../styles/LayoutAuth.module.css';
import Custom401 from '@/pages/401';
import WithAuth from '../Private/withAuth';

const LayoutGuest = ({ children }:any) => {
  const router = useRouter();
  const roleId: any = localStorage.getItem("roleId");
  if (roleId != 5) {
    router.back();
    return Custom401();
  }
  return (
    <>
      <div className="flex h-screen bg-gray-700 ">
        <div className="m-auto  w-3/5 h-3/4  ">
          <div className="right flex flex-col bg-slate-50 form-auth rounded-xl">
            <div className="text-center py-10">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WithAuth(LayoutGuest);