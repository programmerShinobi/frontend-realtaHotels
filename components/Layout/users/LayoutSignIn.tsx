import styles from '../../../styles/LayoutSignIn.module.css';

export default function LayoutSignIn({ children }:any) {
  return (
    <>
      <div className="bgLayout">
        <div className="mx-auto sm:mx-0">
          <center>
            <div className={styles.logoLayout}></div>
          </center>
          <div className={styles.cardLogin}>
                {children}
          </div>
        </div>
      </div>
    </>
  );
}