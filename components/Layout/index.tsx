import Header from "../Header";

const Layout = ({ children }:any) => {
  return (
    <>
      <Header/>
      <main
        className={`pt-16 transition-all duration-[400ms] `}
      >
        <div className="px-4 md:px-16">{children}</div>
      </main>
    </>
  );
}

export default Layout;