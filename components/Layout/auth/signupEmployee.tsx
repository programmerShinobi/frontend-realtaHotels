import styles from '@/styles/LayoutAuthSignUpEmployee.module.css';
import stylesAuth from "@/styles/ContentAuth.module.css";

export default function LayoutAuthSignUpEmployee({ children }:any) {
  return (
    <>
      <main className={`transition-all duration-[400ms]`}>
        <a href='/'>
          <div className={styles.logoLayout}/>
        </a>
          <div className='flex justify-between'>
            <div className="hidden md:block">
              <div className={styles.bgImg} />
              <div className={styles.cardInCardLogin}>
                <div className={styles.textTitlaInCardLogin1}>
                  <b>Join our team</b>
                </div>
                <div className={styles.textTitlaInCardLogin2}>
                  <b>and start</b>
                </div>
                <div className={styles.textTitlaInCardLogin3}>
                  <b><u>successful career</u></b>
                </div>
                <div className={styles.textSubtitleInCardLogin}>
                  Don't miss this opportunity to be a part of our team and start a fulfilling career journey in the hospitality industry..
                </div>
              </div>
            </div>
            <div className={styles.cardLogin}>
              <div className="mt-4 pl-8 pr-8">{children}</div>
            </div>
            
          </div>
      </main>
    </>
  );
}