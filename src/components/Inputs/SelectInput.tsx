import { DropDownBlackIcon } from "../images";

export const SelectInput = ({
  label,
  placeholder,
  onClick,
}: {
  label: string;
  placeholder: string;
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
}) => {
  return (
    <div onClick={onClick} className=" cursor-pointer w-full">
      <p className=" text-[14px] leading-[16.41px] text-black-3 mb-[8px]">
        {label}
      </p>

      <div className="w-full flex items-center justify-between h-[44px] rounded-[8px] bg-white-1 border-[1px] border-grey-2 text-[11px] text-black-3 placeholder:text-black-3 leading-[12.89px] outline-none px-[15px]">
        <span>{placeholder}</span>
        <DropDownBlackIcon />
      </div>
    </div>
  );
};
