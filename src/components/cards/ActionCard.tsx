import { useNavigate } from "react-router-dom";

export const ActionCard = ({
  icon,
  text1,
  text2,
  link,
  soon,
}: {
  icon: React.ReactNode;
  text1: string;
  text2: string;
  link: string;
  soon?: boolean;
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="relative w-[50%] h-[172px] rounded-[8px] bg-blue-3 flex flex-col justify-center items-center cursor-pointer"
      onClick={() => navigate(link)}
    >
      {icon}
      <div className="mt-[19px]">
        <p className="text-[14px] text-black-1 leading-[16.41px] font-[600] space-[2%]">
          {text1}
        </p>
        <p className="text-[10px] text-black-3 leading-[11.85px] space-[6%] mt-[5px]">
          {text2}
        </p>
      </div>
      {soon && (
        <div className="flex items-center justify-center absolute right-[10px] top-[10px] px-[5px] bg-brown-1 text-white-1 text-[13px] rounded-[8px]">
          Soon
        </div>
      )}
    </div>
  );
};
