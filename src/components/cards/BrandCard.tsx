import { useNavigate } from "react-router-dom";

export const BrandCard = ({
  image,
  text1,
  text2,
  link,
  sell,
}: {
  image: string;
  brand?: string;
  text1: string;
  text2: string;
  link: string;
  sell?: boolean;
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    const brandInfo = {
      image,
      brand: text1,
    };
    localStorage.setItem("brandInfo", JSON.stringify(brandInfo));
    navigate(link);
  };
  return (
    <div
      className={`${
        sell ? "pt-[16px]" : "pt-0"
      } rounded-[8px] cursor-pointer bg-white-1 drop-shadow-md`}
      onClick={handleClick}
    >
      <img
        src={image}
        alt=""
        className={`${
          sell
            ? "h-[77px] w-[77px] m-[0_auto]"
            : "h-[101px] w-full rounded-[4px]"
        } `}
      />
      <div
        className={`${
          sell ? "flex flex-col items-center" : "block"
        } w-full px-[13px] pt-[13px] pb-[25px]`}
      >
        <p className="text-[16px] text-black-1 leading-[18.75px] font-[600] space-[2%]">
          {text1}
        </p>
        <p className="text-[12px] text-black-3 leading-[14.22px] space-[6%] mt-[1px]">
          {text2}
        </p>
      </div>
    </div>
  );
};
