import { useNavigate } from "react-router-dom";

export const NameLogo = () => (
  <img src="/images/name.svg" alt="" className="cursor-pointer" />
);
export const Logo = () => (
  <img
    src="/images/logo.ico"
    alt=""
    className="cursor-pointer h-[27px] w-[27px]"
  />
);
export const PersonIcon = () => (
  <img src="/images/person.png" alt="" className="cursor-pointer" />
);
export const BellIcon = () => (
  <img src="/images/bell.png" alt="" className="cursor-pointer" />
);
export const BaseArrowUpIcon = () => <img src="/images/baseArrow.png" alt="" />;
export const BaseArrowDownIcon = () => (
  <img className=" rotate-180" src="/images/baseArrow.png" alt="" />
);
export const BaseArrowUpBIcon = () => (
  <img src="/images/baseArrowB.png" alt="" />
);
export const TimeIcon = () => <img src="/images/time.png" alt="" />;
export const SpeakerIcon = () => <img src="/images/speaker.svg" alt="" />;
export const BuyIcon = () => (
  <img src="/images/buy.png" alt="" className=" cursor-pointer" />
);
export const SellIcon = () => (
  <img src="/images/sell.png" alt="" className=" cursor-pointer" />
);
export const CancelIcon = ({
  extraClass,
  onClick,
}: {
  extraClass?: string;
  onClick?: React.MouseEventHandler<HTMLImageElement> | undefined;
}) => (
  <img
    src="/images/cancel.png"
    alt=""
    className={`${extraClass} cursor-pointer`}
    onClick={onClick}
  />
);
export const DoneGreenIcon = () => (
  <img src="/images/doneGreen.png" alt="" className=" w-[13px] h-[13px]" />
);
export const ArrowLeftWhiteIcon = () => (
  <img
    src="/images/arrowWhite.svg"
    alt=""
    className=" cursor-pointer rotate-180"
  />
);
export const DropDownBlackIcon = () => (
  <img
    src="/images/dropDown.png"
    alt=""
    className="h-[8px] w-[5px] cursor-pointer rotate-90"
  />
);

export const BackIcon = ({ extraClass }: { extraClass?: string }) => {
  const navigate = useNavigate();
  return (
    <img
      src="/images/back.png"
      alt=""
      className={`${extraClass} cursor-pointer`}
      onClick={() => navigate(-1)}
    />
  );
};

export const SearchIcon = () => (
  <img src="/images/search.png" alt="" className=" cursor-pointer" />
);

export const SearchFillIcon = () => (
  <img src="/images/searchFill.png" alt="" className=" cursor-pointer" />
);
