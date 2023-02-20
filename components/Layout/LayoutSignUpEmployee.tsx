import styles from '../../styles/LayoutSignUpEmployee.module.css';

export default function LayoutSignUpEmployee({ children }:any) {
  return (
    <>
      <div className="bgLayout">
        <div className="mx-auto sm:mx-0">
          <div className={styles.logoLayout}></div>
          <div className={styles.cardLogin}>
                {children}
          </div>
        </div>
      </div>
    </>
  );
}