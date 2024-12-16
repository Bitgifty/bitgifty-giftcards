import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { buySchema } from "../components/utils/Validations";
import { TextInput } from "../components/Inputs/TextInput";
import { fixedPrices } from "../components/utils/Dummy";
import { TextAreaInput } from "../components/Inputs/TextAreaInput";
import { ActionButton } from "../components/Buttons/ActionButton";
import { useNavigate, useParams } from "react-router-dom";
import { BuyFormProps } from "../components/utils/Types";

const PurchaseForm = () => {
  const [brandInfo, setBrandInfo] = useState<any>({});
  const navigate = useNavigate();
  const { brand } = useParams();

  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      recipient_name: "",
      sender_name: "",
      recipient_email: "",
      amount: "",
      quantity: "1",
      message: "",
    },
    resolver: zodResolver(buySchema),
  });

  useEffect(() => {
    if (localStorage.getItem("brandInfo")) {
      setBrandInfo(JSON.parse(localStorage.getItem("brandInfo")!));
    }
  }, []);
  const currentAmount = watch("amount");
  const handlePurchase = (data: BuyFormProps) => {
    localStorage.setItem("checkoutInfo", JSON.stringify(data));
    navigate(`/buy-gift-card/${brand}/checkout`);
  };
  return (
    <Layout>
      <div>
        <img src={brandInfo?.banner} alt="" className="w-full" />
      </div>
      <form
        onSubmit={handleSubmit(handlePurchase)}
        className="px-[17px] mt-[23px] flex flex-col gap-y-[24px]"
      >
        <TextInput
          control={control}
          label="Recipient Name"
          name="recipient_name"
          placeholder="Lorem Ipsum "
        />
        <TextInput
          control={control}
          label="Your Name"
          name="sender_name"
          placeholder="Lorem Ipsum "
        />
        <TextInput
          control={control}
          label="Recipient Email"
          name="recipient_email"
          placeholder="Lorem Ipsum "
        />
        <TextInput
          control={control}
          label="Select Amount"
          name="amount"
          placeholder="Custom Amount"
          fixedValues={fixedPrices}
          fixedState={currentAmount}
          fixedOnClick={(value) => setValue("amount", value)}
        />
        <TextInput
          control={control}
          label="Quantity"
          name="quantity"
          placeholder="Lorem Ipsum "
        />
        <TextAreaInput
          control={control}
          label="Message"
          name="message"
          placeholder="Lorem Ipsum "
        />
        <ActionButton extraClass="mt-[36px]" label="Continue" />
      </form>
    </Layout>
  );
};

export default PurchaseForm;
