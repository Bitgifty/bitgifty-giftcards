import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sellSchema } from "../components/utils/Validations";
import { TextInput } from "../components/Inputs/TextInput";
import { ActionButton } from "../components/Buttons/ActionButton";
import { useNavigate } from "react-router-dom";
import { SellFormProps } from "../components/utils/Types";
import { BaseArrowUpBIcon } from "../components/images";

const SellForm = () => {
  const [brandInfo, setBrandInfo] = useState<Record<string, any>>({});
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SellFormProps>({
    defaultValues: {
      sub_category: "",
      amount: "",
      image: null,
    },
    resolver: zodResolver(sellSchema),
  });

  useEffect(() => {
    const storedBrandInfo = localStorage.getItem("brandInfo");
    if (storedBrandInfo) {
      setBrandInfo(JSON.parse(storedBrandInfo));
    }
  }, []);

  const handlePurchase = () => {
    navigate(`/`);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setValue("image", file || null);
  };

  const image = watch("image");

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
          label="Sub category"
          name="sub_category"
          placeholder="Lorem Ipsum"
        />
        <TextInput
          control={control}
          label="Amount on card"
          name="amount"
          placeholder="Lorem Ipsum"
        />

        <div className="w-[100px] h-[100px] rounded-[50%] bg-blue-3 m-[0_auto] flex flex-col items-center justify-center gap-y-[7px]">
          <p className="text-[12px] text-blue-1 leading-[14.22px] space-x-[6%]">
            Cash Value
          </p>
          <p className="text-[24px] text-blue-1 leading-[28.13px] font-[600] space-x-[2%]">
            $0
          </p>
        </div>

        <div>
          <p className=" text-[14px] leading-[16.41px] text-black-3 mb-[8px]">
            Upload
          </p>

          <label
            htmlFor="image"
            className="w-full h-[120px] rounded-[8px] border-[1px] border-dotted border-brown-1 bg-orange-1 flex items-center justify-center"
          >
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleFileChange}
              className=" opacity-0 w-0"
            />

            <div className="flex flex-col items-center justify-center gap-y-[7px]">
              <BaseArrowUpBIcon />
              {image === null ? "upload image" : image?.name}
            </div>
          </label>
          {errors.image && (
            <p className="text-red-1 text-[0.875rem] mt-[8px]">
              {errors.image?.message}
            </p>
          )}
        </div>

        <ActionButton extraClass="mt-[36px]" label="Continue" />
      </form>
    </Layout>
  );
};

export default SellForm;
