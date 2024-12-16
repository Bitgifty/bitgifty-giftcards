const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className=" w-full min-h-screen bg-white flex flex-col items-center ">
      <div className=" w-full md:max-w-[393px] lg:max-w-[500px] min-h-screen bg-grey-1 pb-[50px]">
        {children}
      </div>
    </section>
  );
};

export default Layout;
