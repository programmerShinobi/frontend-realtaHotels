import { useRouter } from 'next/router';
import styles from '../../styles/LayoutAuth.module.css';
import Custom401 from '@/pages/401';
import WithAuth from '../Private/withAuth';

const LayoutUsers = ({ children }:any) => {
  const router = useRouter();
  const roleId: any = localStorage.getItem("roleId");
  if (roleId != 5) {
    router.back();
    return Custom401();
  }
  return (
    <>
      <div className="flex h-screen bg-gray-700">
        <div className="m-auto rounded-xl w-3/5 h-3/4 grid lg:grid-cols-2 ">
          <div className={styles.imgStyle}>
            <div className={styles.cartoonImg}></div>
            <div className={styles.shuriken_one}></div>
            <div className={styles.shuriken_two}></div>
          </div>
          <div className="right flex flex-col bg-slate-50 form-auth">
            <div className="text-center py-10">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WithAuth(LayoutUsers);