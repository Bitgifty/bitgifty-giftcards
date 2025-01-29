import Layout from "../components/Layout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RedeemSchema } from "../components/utils/Validations";
import { TextInput } from "../components/Inputs/TextInput";
import { ActionButton } from "../components/Buttons/ActionButton";
import { useNavigate } from "react-router-dom";
import { BackIcon } from "../components/images";
import { useScrollToTop } from "../components/utils/ScrollToTop";
import { useSnackbar } from "notistack";
import { useAppSelector } from "../app/hooks";
import { selectWalletAddress } from "../appSlices/walletSlice";
import { useRedeemMutation } from "../appSlices/apiSlice";

const RedeemShakeWin = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const walletAddress = useAppSelector(selectWalletAddress);
  const [redeem, { isLoading: isRedeeming }] = useRedeemMutation();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      code: "",
      email: "",
    },
    resolver: zodResolver(RedeemSchema()),
  });

  const handleRedeem = async (data: { code: string; email: string }) => {
    if (!walletAddress) {
      enqueueSnackbar("Please sign in!", { variant: "error" });
      return;
    }
    const redeem_dap = { ...data, address: walletAddress };
    try {
      const response = await redeem(redeem_dap).unwrap();
      if (response?.status) {
        enqueueSnackbar("Redeemed giftcard succesfully", {
          variant: "success",
        });
        navigate("/");
      }
      console.log(response);
    } catch (error: any) {
      if (error?.status === 500) {
        enqueueSnackbar("Invalid code!", { variant: "error" });
      } else {
        enqueueSnackbar(error?.data?.error, { variant: "error" });
      }
      console.log(error);
    }
  };

  useScrollToTop();

  return (
    <Layout>
      <div className="flex items-center justify-center relative px-[16px] pt-[40px] pb-[20px]">
        <BackIcon extraClass="absolute left-[16px]" link="/" />
        <h2 className=" text-[18px] text-black-1 font-[500] leading-[21.09px]">
          Redeem Shake & Win
        </h2>
      </div>
      <form
        onSubmit={handleSubmit(handleRedeem)}
        className="px-[17px] mt-[10px] flex flex-col gap-y-[24px] z-50"
      >
        <TextInput
          control={control}
          label="Enter Giftcard Code"
          name="code"
          placeholder="Paste Code Here"
        />

        <TextInput
          control={control}
          label="Email"
          name="email"
          placeholder="Enter Your Email "
        />

        <ActionButton
          extraClass="mt-[36px]"
          label="Redeem"
          loading={isRedeeming}
        />
      </form>
    </Layout>
  );
};

export default RedeemShakeWin;
