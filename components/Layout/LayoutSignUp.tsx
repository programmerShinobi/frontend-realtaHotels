import styles from '../../styles/LayoutSignUp.module.css';
import { Card } from '@mui/material';

export default function LayoutSignUp({ children }:any) {
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
              <b>Happy Staycation </b>
            </div>
            <div className={styles.textTitlaInCardLogin2}>
              <b>like <u>Selebrity</u></b>
            </div>
            <div className={styles.textSubtitleInCardLogin}>
              Experience comfort like never before at our hotel.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}