import { SearchFillIcon } from "../images";

export const Search = ({ extraClass }: { extraClass: string }) => {
  return (
    <div
      className={`${extraClass} pl-[11px] h-[44px] rounded-[8px] flex items-center bg-white-1 border-[1px] border-grey-2`}
    >
      <SearchFillIcon />
      <input className="w-[80%]  border-none  text-[11px] text-black-3 placeholder:text-black-3 leading-[12.89px] outline-none px-[15px]" />
    </div>
  );
};
