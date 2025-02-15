import { SearchFillIcon } from "../images";

interface SearchProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  extraClass: string;
}

export const Search = ({ extraClass, ...props }: SearchProps) => {
  return (
    <div
      className={`${extraClass} pl-[11px] h-[44px] rounded-[8px] flex items-center bg-white-1 border-[1px] border-grey-2`}
    >
      <SearchFillIcon />
      <input
        {...props}
        className="w-[80%]  border-none  text-[16px_important!] text-black-3 placeholder:text-black-3 placeholder:text-[16px_important!] leading-[12.89px] outline-none px-[15px]"
      />
    </div>
  );
};
