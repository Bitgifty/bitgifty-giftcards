export const BrandCardSkeleton = ({ sell }: { sell?: boolean }) => {
  return (
    <div
      className={`${
        sell ? "pt-[16px]" : "pt-0"
      } h-[173px] rounded-[8px] cursor-pointer bg-white-1 drop-shadow-md animate-pulse`}
    >
      <div
        className={`  w-full ${
          sell
            ? "h-[77px] w-[77px] m-[0_auto]"
            : "h-[101px] rounded-[4px] bg-black-2"
        } `}
      ></div>
      <div
        className={` animate-pulse  flex flex-col w-full px-[13px] mt-[20px] pb-[25px] gap-y-[10px]`}
      >
        <div className=" animate-pulse w-[90%] h-[6px] rounded bg-black-1 "></div>
        <div className=" animate-pulse w-[70%] h-[6px] rounded bg-black-2 "></div>
      </div>
    </div>
  );
};
