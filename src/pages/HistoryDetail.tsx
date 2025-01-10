import { BackIcon, DoneGreenIcon } from "../components/images";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import { useGetTransactionHistoryByIdQuery } from "../appSlices/apiSlice";
import { GetCountryCurrency } from "../components/utils/GetCountryCurrency";
import dayjs from "dayjs";
import { formatHash } from "../components/utils/FormatHash";

const HistoryDetail = () => {
  const { id } = useParams();

  const { currentData: transaction, isFetching: isFetchingTransaction } =
    useGetTransactionHistoryByIdQuery({
      id,
    });

  const ListDetails = ({ name, value }: { name: string; value: string }) => (
    <div className="flex items-center justify-between">
      <span className="text-[14px] ">{name}</span>
      <span className=" text-[14px] font-[500]">{value}</span>
    </div>
  );

  return (
    <Layout>
      <section className="py-[40px] px-[16px] relative">
        <div className="absolute left-0 right-0 px-[16px] bg-grey-1">
          <div className="flex items-center justify-center relative">
            <BackIcon extraClass="absolute left-0" />
            <h2 className=" text-[18px] text-black-1 font-[500] leading-[21.09px]">
              Transaction Receipt
            </h2>
          </div>
        </div>
        {isFetchingTransaction ? (
          <div className="mt-[50px]">
            <div className="w-full h-[120px] animate-pulse bg-white-1 p-[10px] rounded-[16px] mt-[15px] flex flex-col gap-y-[8px]"></div>
            <div className="w-full h-[120px] animate-pulse bg-white-1 p-[10px] rounded-[16px] mt-[15px] flex flex-col gap-y-[8px]"></div>
          </div>
        ) : (
          <>
            <div className="w-full bg-white-1 p-[10px] rounded-[16px] mt-[50px] flex flex-col items-center justify-center gap-y-[8px]">
              <p className="text-[13px] text-black-1 font-[600] space-[2%] leading-[13.23px]">
                {transaction?.transaction_type}
              </p>
              <p className="text-[24px] font-[500] leading-[37.5px] space-x-[-9%]">
                {GetCountryCurrency(transaction?.country)} {transaction?.amount}
              </p>
              <p className=" text-[14px]">{transaction?.crypto_amount} cusd</p>
              <div
                className={`text-[14px] ${
                  transaction?.status === "success"
                    ? "text-[#008000]"
                    : "text-brown-1"
                }  flex items-center gap-x-[5px]`}
              >
                {transaction?.status === "success" ? <DoneGreenIcon /> : "..."}
                {transaction?.status}
              </div>
            </div>
            <div className="w-full bg-white-1 p-[10px] rounded-[16px] mt-[15px] flex flex-col gap-y-[8px]">
              <p className="text-[13px] text-black-1 font-[600] space-[2%] leading-[13.23px]">
                Transaction Details
              </p>

              <div className="mt-[10px] flex flex-col gap-y-[8px]">
                <ListDetails name="Customer" value={transaction?.customer} />
                <ListDetails name="Reference" value={transaction?.ref} />
                <ListDetails
                  name="Time"
                  value={dayjs(transaction?.time).format("MMM DD, HH:mm:ss")}
                />
                <ListDetails
                  name="TxHash"
                  value={formatHash(transaction?.transaction_hash)}
                />
              </div>
            </div>
          </>
        )}
      </section>
    </Layout>
  );
};

export default HistoryDetail;
