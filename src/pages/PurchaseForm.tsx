import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { buySchema } from "../components/utils/Validations";
import { TextInput } from "../components/Inputs/TextInput";
import { TextAreaInput } from "../components/Inputs/TextAreaInput";
import { ActionButton } from "../components/Buttons/ActionButton";
import { useNavigate, useParams } from "react-router-dom";
import { BuyFormProps } from "../components/utils/Types";
import { BackIcon } from "../components/images";
import { ProductSelector } from "../components/Inputs/ProductSelector";
import { SelectInput } from "../components/Inputs/SelectInput";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  selectOperatorProduct,
  setOpenOperatorProductBox,
  setOperatorProduct,
} from "../appSlices/generalSlice";
import { getRange } from "../components/utils/GetRange";

const PurchaseForm = () => {
  const [brandInfo, setBrandInfo] = useState<any>({});
  const navigate = useNavigate();
  const { brand } = useParams();
  const dispatch = useAppDispatch();
  const selectedProduct = useAppSelector(selectOperatorProduct);

  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      recipient_name: "",
      sender_name: "",
      recipient_email: "",
      recipient_phone_number: "",
      amount: "",
      quantity: "1",
      message: "",
    },
    resolver: zodResolver(
      buySchema(
        selectedProduct?.price_type,
        parseInt(selectedProduct?.price?.min?.operator),
        parseInt(selectedProduct?.price?.max?.operator)
      )
    ),
  });

  useEffect(() => {
    if (localStorage.getItem("brandInfo")) {
      setBrandInfo(JSON.parse(localStorage.getItem("brandInfo")!));
    }
    dispatch(setOperatorProduct({}));
  }, []);
  const currentAmount = watch("amount");
  const handlePurchase = (data: BuyFormProps) => {
    localStorage.setItem("checkoutInfo", JSON.stringify(data));
    navigate(`/buy-gift-card/${brand}/checkout`);
  };

  useEffect(() => {
    setValue("amount", selectedProduct?.price?.operator);
  }, [selectedProduct]);

  return (
    <Layout>
      <div className="relative">
        <img src={brandInfo?.image} alt="" className="w-full h-[241px]" />
        <BackIcon extraClass="absolute top-[15px] left-[15px] bg-grey-2 rounded-[4px] p-[2px_5px] border-grey-1 border-[0.4px]" />
      </div>
      <form
        onSubmit={handleSubmit(handlePurchase)}
        className="px-[17px] mt-[23px] flex flex-col gap-y-[24px] z-50"
      >
        <SelectInput
          label="Product"
          placeholder={selectedProduct?.name || "Select Product"}
          onClick={() => dispatch(setOpenOperatorProductBox())}
        />
        <ProductSelector operatorId={brand} />
        <TextInput
          control={control}
          label="Recipient Name"
          name="recipient_name"
          placeholder="Enter Recipient Name "
        />
        <TextInput
          control={control}
          label="Your Name"
          name="sender_name"
          placeholder="Enter Your Name "
        />
        <TextInput
          control={control}
          label="Recipient Email"
          name="recipient_email"
          placeholder="Enter Recipient Email "
        />
        <TextInput
          control={control}
          label="Recipient Phone Number"
          name="recipient_phone_number"
          placeholder="Enter Recipient Phone Number "
        />
        {selectedProduct?.price_type === "fixed" && (
          <TextInput
            control={control}
            label="Fixed Amount"
            name="amount"
            value={selectedProduct?.price?.operator}
            readOnly
          />
        )}
        {selectedProduct?.price_type === "range" && (
          <TextInput
            control={control}
            label="Select Amount"
            name="amount"
            placeholder={
              selectedProduct?.price
                ? `${parseInt(
                    selectedProduct?.price?.min?.operator
                  )} - ${parseInt(selectedProduct?.price?.max?.operator)}`
                : "Custom Amount"
            }
            fixedValues={getRange(
              parseInt(selectedProduct?.price?.max?.operator)
            )}
            fixedState={currentAmount}
            fixedOnClick={(value) => setValue("amount", value)}
          />
        )}
        <TextInput
          control={control}
          label="Quantity"
          name="quantity"
          placeholder="Enter Quantity"
        />
        <TextAreaInput
          control={control}
          label="Message"
          name="message"
          placeholder="Enter a Descriptive Message"
        />
        <ActionButton extraClass="mt-[36px]" label="Continue" />
      </form>
    </Layout>
  );
};

export default PurchaseForm;
