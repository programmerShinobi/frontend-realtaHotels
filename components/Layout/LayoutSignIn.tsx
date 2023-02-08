import styles from '../../styles/LayoutSignIn.module.css';
import { Card } from '@mui/material';

export default function LayoutSignIn({ children }:any) {
  return (
    <>
      <div className="bgLayout">
        <div className="mx-auto sm:mx-0">
          <div className={styles.logoLayout}></div>
          <Card className={styles.cardLogin}>
            <div className="form-auth">
              <div className="py-8">
                {children}
              </div>
            </div>
          </Card>
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
    </>
  );
}