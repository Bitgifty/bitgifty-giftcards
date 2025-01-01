import { useEffect, useState } from "react";
import Layout from "../components/Layout";

import { useNavigate } from "react-router-dom";
import { Itemize } from "../components/cards/Itemize";
import { ActionButton } from "../components/Buttons/ActionButton";
import { BackIcon } from "../components/images";
import { useAppSelector } from "../app/hooks";
import { selectCountry } from "../appSlices/CountrySlice";
import { getFormattedBalance } from "../components/utils/Formatters";
import { selectActiveChain, selectActiveToken } from "../appSlices/TokenSlice";
import { handleTokenTransfer } from "../appSlices/ContractSlice";
import { Address } from "viem";
import { selectOperatorProduct } from "../appSlices/generalSlice";
import { selectAccount, selectWalletAddress } from "../appSlices/walletSlice";
import { useCheckoutMutation } from "../appSlices/apiSlice";

const BuyCheckout = () => {
  const [brandInfo, setBrandInfo] = useState<any>({});
  const [checkoutInfo, setCheckoutInfo] = useState<any>({});
  const [balanceError, setBalanceError] = useState<string>("");
  const navigate = useNavigate();
  const activeToken = useAppSelector(selectActiveToken);
  const activeChain = useAppSelector(selectActiveChain);
  const account: any = useAppSelector(selectAccount);
  const product = useAppSelector(selectOperatorProduct);
  const walletAddress = useAppSelector(selectWalletAddress);
  const chain = useAppSelector(selectActiveChain);
  const [checkout, { isLoading: isCheckingOut }] = useCheckoutMutation();

  useEffect(() => {
    if (localStorage.getItem("brandInfo")) {
      setBrandInfo(JSON.parse(localStorage.getItem("brandInfo")!));
    }
    if (localStorage.getItem("checkoutInfo")) {
      setCheckoutInfo(JSON.parse(localStorage.getItem("checkoutInfo")!));
    }
  }, []);

  const validateBalance = () => {
    let isValid = true;
    const userBalance = parseFloat(
      getFormattedBalance(activeToken || null) || "0"
    );

    if (parseFloat(checkoutInfo?.amount) > userBalance) {
      setBalanceError("Insufficient balance");
      isValid = false;
    } else {
      setBalanceError("");
      isValid = true;
    }

    return { isValid };
  };

  const handleCheckout = async () => {
    const { isValid } = validateBalance();

    if (isValid) {
      try {
        const tx: any = handleTokenTransfer({
          tokenAddress: activeToken?.address as Address,
          receiverAddress: import.meta.env.VITE_UTIL_MW as Address,
          amount: parseFloat(checkoutInfo?.amount).toFixed(4),
          chainId: activeChain?.id as number,
          decimals: activeToken?.decimals as number,
        });

        if (tx.status === "success") {
          const data = {
            operator: checkoutInfo?.brand,
            msisdn: checkoutInfo?.recipient_phone_number,
            account_id: account?.id,
            amount: null,
            amount_operator: `${checkoutInfo?.amount}.0`,
            product_id: product?.id,
            user_reference: checkoutInfo?.recipient_email,
            product_type: product?.product_type,
            product_category: product?.product_category,
            extra_parameters: {},
            wallet_address: walletAddress,
            crypto_amount: null,
            country: checkoutInfo?.country,
            transaction_hash: tx.transactionHash as string,
            chain,
            transaction_type: "",
            bill_type: "",
          };

          try {
            const response = await checkout(data).unwrap();
            console.log(response);
            localStorage.removeItem("brandInfo");
            navigate("/");
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log(balanceError);
    }
  };

  const selectedCountry = useAppSelector(selectCountry);

  return (
    <Layout>
      <div className="relative">
        <img
          src={brandInfo?.image}
          alt=""
          className="w-full h-[318px] rounded-[0px_0px_8px_8px]"
        />
        <BackIcon extraClass="absolute top-[15px] left-[15px] bg-grey-2 rounded-[4px] p-[2px_5px] border-grey-1 border-[0.4px]" />

        <div className="relative px-[16px]">
          <section className="w-[calc(100%-32px)] flex flex-col gap-y-[8px] mt-[-65px] absolute  pt-[16px] px-[18px] pb-[33px] rounded-[11px] bg-orange-1">
            <div className="flex justify-center mb-[21px] text-[16px] text-black-1 font-[600] space-x-[2%] leading-[18.75px]">
              Review Your Gift Card
            </div>
            <Itemize
              name="Gift Card"
              value={brandInfo?.brand || "No brand found!"}
            />
            <Itemize
              name="Email"
              value={checkoutInfo?.recipient_email || "No email found!"}
            />
            <Itemize
              name="Phone Number"
              value={
                checkoutInfo?.recipient_phone_number || "No phone number found!"
              }
            />
            <Itemize
              name="Name"
              value={checkoutInfo?.recipient_name || "No name found!"}
            />
            <Itemize
              name="Quantity"
              value={checkoutInfo?.quantity || "No quantity found!"}
            />
            <Itemize
              name="Price"
              value={checkoutInfo?.amount || "No price found!"}
            />
            <Itemize
              name="Rate"
              value={`${checkoutInfo?.amount}/1` || "No rate found!"}
            />

            <div className="flex items-center justify-between mt-[13px]">
              <span className="text-[14px] text-black-1 leading-[16.59px] font-[500] space-x-[6%]">
                Total
              </span>
              <span className="text-[20px] text-black-1 leading-[23.71px] space-x-[6%] font-[500]">
                {`${selectedCountry?.currency} ${
                  isNaN(checkoutInfo?.amount * checkoutInfo?.quantity)
                    ? "0"
                    : checkoutInfo?.amount * checkoutInfo?.quantity
                }`}
              </span>
            </div>
          </section>
        </div>
        <div className="w-full mt-[350px] px-[16px]">
          <ActionButton
            label="Pay"
            onClick={handleCheckout}
            loading={isCheckingOut}
          />
        </div>
      </div>
    </Layout>
  );
};

export default BuyCheckout;
