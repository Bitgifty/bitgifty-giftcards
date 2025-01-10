export const TransactionSkeleton = () => {
  return (
    <div className="w-full px-[10px] animate-pulse py-[13px] flex items-center justify-between bg-white-1">
      <div>
        <div className=" animate-pulse w-[70px] h-[6px] rounded bg-black-1 font-[600] space-[2%]"></div>
        <div className=" animate-pulse w-[50px] h-[4px] rounded bg-black-3 leading-[11.85px] space-[6%] mt-[10px]"></div>
      </div>
      <div>
        <div className=" animate-pulse w-[70px] h-[6px] rounded bg-black-1 font-[600] space-[2%]"></div>
        <div className="w-[50px] h-[4px] rounded animate-pulse bg-brown-1 leading-[9.48px] space-[6%] mt-[10px]"></div>
      </div>
    </div>
  );
};
