export const CategoryBtn = ({
  label,
  state,
  stateFn,
}: {
  label: string;
  state: string;
  stateFn: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <button
      className={`${
        state === label
          ? " bg-brown-1 text-white-1"
          : "bg-orange-1 text-black-2"
      } py-[6px] px-[19px] text-[14px] font-[500] leading-[16.41px] space-[2%] rounded-[13px] `}
      onClick={() => stateFn(label)}
    >
      {label}
    </button>
  );
};
