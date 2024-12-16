export const ScrollCard = ({
  icon,
  text1,
  text2,
  extraClass,
}: {
  icon: React.ReactNode;
  text1: string;
  text2: string;
  extraClass: string;
}) => (
  <div
    className={`${extraClass} h-[82px] flex items-center gap-x-[5px] rounded-[16px]`}
  >
    {icon}
    <div className="max-w-[213px]">
      <p className=" text-black-1 text-[14px] leading-[16.41px] font-[600] space-x-[2%] mb-[5px]">
        {text1}
      </p>
      <p className=" text-[10px] text-blue-1 leading-[11.85px] space-[6%] ">
        {text2}
      </p>
    </div>
  </div>
);
