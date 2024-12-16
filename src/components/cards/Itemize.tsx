export const Itemize = ({ name, value }: { name: string; value: string }) => (
  <div className="flex items-center justify-between text-[14px] text-black-3 space-x-[6%] leading-[16.59px] border-b-[1px] border-b-[#9A4B1130] py-[5px]">
    <span>{name}</span>
    <span>{value}</span>
  </div>
);
