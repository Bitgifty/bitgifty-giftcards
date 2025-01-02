import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { initializeChain, selectActiveToken } from "../appSlices/TokenSlice";
import { connectWallet, selectWalletAddress } from "../appSlices/walletSlice";
import { PersonIcon } from "./images";
import TokenSelector from "./Inputs/TokenSelector";

const WalletConnect = () => {
  const walletAddress = useAppSelector(selectWalletAddress);
  const activeToken = useAppSelector(selectActiveToken);
  const dispatch = useAppDispatch();

  const handleConnectWallet = async () => {
    try {
      // Dispatch the connectWallet thunk
      await dispatch(connectWallet()).unwrap();
    } catch (err) {
      // Handle errors (optional, since errors are already handled in the slice)
      console.error("Error connecting wallet:", err);
    }
  };

  useEffect(() => {
    dispatch(initializeChain());
    console.log(walletAddress);
  }, [dispatch]);

  useEffect(() => {
    console.log(activeToken);
  }, [activeToken]);

  return (
    <div className="flex items-center gap-x-[10px]">
      {walletAddress && activeToken && <TokenSelector />}
      {!walletAddress ? (
        <button
          onClick={handleConnectWallet}
          className="text-white-1 rounded-[8px] py-[4px] px-[16px] text-[14px] bg-blue-1 font-[600]"
        >
          Sign in
        </button>
      ) : (
        <PersonIcon />
      )}
    </div>
  );
};

export default WalletConnect;
