import styles from '@/styles/LayoutAuthSignIn.module.css';
import stylesAuth from "@/styles/ContentAuth.module.css";

const LayoutAuthSignIn = ({ children }: any) => {
  return (
    <>
      <main className={`transition-all duration-[400ms]`}>
        <a href='/'>
          <div className={styles.logoLayout}/>
        </a>
          <div className='flex justify-between'>
            <div className={styles.cardLogin}>
              <div className="mt-4 pl-8 font-bold w-full h-fit py-2 px-2 mx-auto items-cente text-gray-900 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                <div className={stylesAuth.textTitleInAuth}>
                  {"Sign in to your account"}
                </div>
              </div>            
              <div className="pl-8 pr-8">{children}</div>
            </div>
            <div className="hidden md:block">
              <div className={styles.bgImg} />
              <div className={styles.cardInCardLogin}>
                <div className={styles.textTitlaInCardLogin1}>
                  <b>Give More</b>
                </div>
                <div className={styles.textTitlaInCardLogin2}>
                  <b><u>Experience</u></b>
                </div>
                <div className={styles.textTitlaInCardLogin3}>
                  <b>With Our Service</b>
                </div>
                <div className={styles.textSubtitleInCardLogin}>
                  Hear what our guests have to say about their unforgettable stay at our hotel
                </div>
              </div>
            </div>
          </div>
      </main>
    </>
  );
}

export default LayoutAuthSignIn;