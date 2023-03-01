import HeaderLogin from "@/components/Header/login";

const LayoutLogin = ({ children }:any) => {
  return (
    <>
      <HeaderLogin/>
      <main
        className={`transition-all duration-[400ms]`}
      >
        <div className="pl-4 pr-4 pt-4 pb-6 md:px-8 md:py-8">{children}</div>
      </main>
    </>
  );
}

export default LayoutLogin;