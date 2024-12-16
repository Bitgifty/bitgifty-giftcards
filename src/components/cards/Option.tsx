import { useNavigate } from "react-router-dom";

export const Option = ({
  icon,
  label,
  link,
}: {
  icon: React.ReactNode;
  label: string;
  link: string;
}) => {
  const navigate = useNavigate();
  return (
    <div
      className=" h-[60px] w-[60px] bg-blue-2 rounded-[50%] drop-shadow-lg flex flex-col items-center justify-center gap-y-[4.25px] cursor-pointer"
      onClick={() => navigate(link)}
    >
      {icon}
      <p className=" text-[10px] leading-[11.2px] text-white-1">{label}</p>
    </div>
  );
};
