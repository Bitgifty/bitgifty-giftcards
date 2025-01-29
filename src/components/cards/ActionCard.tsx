import { useNavigate } from "react-router-dom";

export const ActionCard = ({
  icon,
  text,
  link,
  soon,
}: {
  icon: React.ReactNode;
  text: string;
  link: string;
  soon?: boolean;
}) => {
  const navigate = useNavigate();
  return (
    <div className=" flex flex-col items-center gap-y-[5px] relative">
      <div
        className=" w-[60px]   rounded-[8px] p-[8px] bg-blue-3 flex flex-col justify-center items-center cursor-pointer"
        onClick={() => navigate(link)}
      >
        {icon}

        {soon && (
          <div className="flex items-center justify-center absolute right-[-5px] top-[-5px] px-[5px] bg-brown-1 text-white-1 text-[10px] rounded-[8px]">
            Soon
          </div>
        )}
      </div>

      <p className="text-[12px] text-black-1 leading-[16.41px] font-[500] space-[2%]">
        {text}
      </p>
    </div>
  );
};
