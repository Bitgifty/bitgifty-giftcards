export const RecentCards = ({
  text1,
  text2,
  amount,
  date,
}: {
  text1: string;
  text2: string;
  amount: string;
  date: string;
}) => {
  return (
    <div className="w-full px-[10px] py-[13px] flex items-center justify-between bg-white-1">
      <div>
        <p className=" text-[13px] text-black-1 font-[600] space-[2%] leading-[13.23px]">
          {text1}
        </p>
        <p className=" text-[10px] text-black-3 leading-[11.85px] space-[6%] mt-[3px]">
          {text2}
        </p>
      </div>
      <div>
        <p className=" text-[13px] text-black-1 font-[600] space-[2%] leading-[13.23px]">
          {amount}
        </p>
        <p className="text-[8px] text-brown-1 leading-[9.48px] space-[6%] mt-[5px]">
          {date}
        </p>
      </div>
    </div>
  );
};
