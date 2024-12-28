const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className=" w-full min-h-screen bg-white flex flex-col items-center ">
      <div className="relative w-full md:max-w-[500px] lg:max-w-[600px] min-h-screen bg-grey-1 pb-[50px]">
        {children}
      </div>
    </section>
  );
};

export default Layout;
