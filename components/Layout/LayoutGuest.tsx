import styles from '../../styles/LayoutAuth.module.css';

export default function LayoutAuth({ children }:any) {

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