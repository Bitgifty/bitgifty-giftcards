import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  closeTokenBox,
  openToken,
  setOpenTokenBox,
} from "../../appSlices/generalSlice";
import { DropDownBlackIcon } from "../images";
import { useRef } from "react";
import { useClickOut } from "../utils/ClickOut";
import {
  selectActiveToken,
  selectAvailableTokens,
  setActiveToken,
} from "../../appSlices/TokenSlice";
import { formatUnits } from "viem";

const TokenSelector = () => {
  const dropDownRef = useRef(null);
  const tokenBoxRef = useRef(null);
  const dispatch = useAppDispatch();
  const activeToken = useAppSelector(selectActiveToken);
  const availableTokens = useAppSelector(selectAvailableTokens);
  const openTokenBox = useAppSelector(openToken);

  useClickOut({
    onState: openTokenBox,
    mainRef: tokenBoxRef,
    subRef: dropDownRef,
    dispatchFunc: () => dispatch(setOpenTokenBox()),
  });

  return (
    <section className="">
      <div
        ref={dropDownRef}
        onClick={() => dispatch(setOpenTokenBox())}
        className="flex items-center gap-x-[10px] bg-grey-2 p-[3px_10px] rounded-[8px] cursor-pointer text-[14px] text-black-1"
      >
        <img
          className="h-[20px] w-[20px] bg-white-1 rounded-[50%]"
          src={activeToken?.logoURI || ""}
          alt="usdc"
        />
        <span>{activeToken?.symbol}</span>
        <DropDownBlackIcon />
      </div>

      <div
        ref={tokenBoxRef}
        className={`${
          openTokenBox && activeToken
            ? " max-h-[500px] p-[10px_15px]"
            : " max-h-0 overflow-y-hidden p-0"
        } transition-all duration-300 ease-in-out flex flex-col gap-y-[20px]  absolute left-0 right-0 bottom-0 rounded-[16px_16px_0px_0px]  bg-white-1 z-10 drop-shadow-lg`}
      >
        {availableTokens.map((token, id) => (
          <div
            key={id}
            className="flex items-center justify-between  text-[14px] cursor-pointer"
            onClick={() => {
              dispatch(setActiveToken(token));
              dispatch(closeTokenBox());
            }}
          >
            <div className="flex items-center gap-x-[10px]">
              <img src={token?.logoURI} alt="" className="h-[25px] w-[25px]" />
              <div>
                <p>{token?.name}</p>
                <p className=" text-black-2">{token?.symbol}</p>
              </div>
            </div>
            <div>
              <p>
                {parseFloat(
                  formatUnits(token.balance ?? BigInt(0), token.decimals)
                )}
              </p>
              <p className=" text-black-2">{token?.symbol}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TokenSelector;
