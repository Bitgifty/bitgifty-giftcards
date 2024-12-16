import { useEffect, useState } from "react";
import Layout from "../components/Layout";

import { useNavigate } from "react-router-dom";
import { Itemize } from "../components/cards/Itemize";
import { ActionButton } from "../components/Buttons/ActionButton";

const BuyCheckout = () => {
  const [brandInfo, setBrandInfo] = useState<any>({});
  const [checkoutInfo, setCheckoutInfo] = useState<any>({});
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("brandInfo")) {
      setBrandInfo(JSON.parse(localStorage.getItem("brandInfo")!));
    }
    if (localStorage.getItem("checkoutInfo")) {
      setCheckoutInfo(JSON.parse(localStorage.getItem("checkoutInfo")!));
    }
  }, []);

  const handleCheckout = () => {
    localStorage.removeItem("brandInfo");
    navigate("/");
  };

  return (
    <Layout>
      <div>
        <img
          src={brandInfo?.checkoutBanner}
          alt=""
          className="w-full h-[318px] rounded-[0px_0px_8px_8px]"
        />

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
                {`$ ${
                  isNaN(checkoutInfo?.amount * checkoutInfo?.quantity)
                    ? "0"
                    : checkoutInfo?.amount * checkoutInfo?.quantity
                }`}
              </span>
            </div>
          </section>
        </div>
        <div className="w-full mt-[285px] px-[16px]">
          <ActionButton label="Pay" onClick={handleCheckout} />
        </div>
      </div>
    </Layout>
  );
};

export default BuyCheckout;
