import { BackIcon } from "../components/images";
import Layout from "../components/Layout";
import { RecentCards } from "../components/cards/RecentsCard";
import { CategoryBtn } from "../components/Buttons/CategoryBtn";
import { useState } from "react";
import { useAppSelector } from "../app/hooks";
import { selectWalletAddress } from "../appSlices/walletSlice";
import { useGetTransactionHistoryQuery } from "../appSlices/apiSlice";
import dayjs from "dayjs";
import { TransactionSkeleton } from "../components/utils/skeletons/TransactionSkeleton";

const History = () => {
  const [category, setCategory] = useState<string>("All");
  const walletAddress = useAppSelector(selectWalletAddress);
  const {
    currentData: transactionHistory,
    isFetching: isFetchingTransactions,
  } = useGetTransactionHistoryQuery({
    walletAddress,
  });
  return (
    <Layout>
      <section className="py-[40px] px-[16px] relative">
        <div className="absolute left-0 right-0 px-[16px] bg-grey-1">
          <div className="flex items-center justify-center relative">
            <BackIcon extraClass="absolute left-0" />
            <h2 className=" text-[18px] text-black-1 font-[500] leading-[21.09px]">
              History
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-x-[10px] mb-[21px] mt-[48px]">
          <CategoryBtn label="All" state={category} stateFn={setCategory} />
          <CategoryBtn label="Buy" state={category} stateFn={setCategory} />
          <CategoryBtn label="Sell" state={category} stateFn={setCategory} />
        </div>
        <div className="flex flex-col gap-y-[5px] mt-[13px]">
          {transactionHistory?.results?.length === 0 && "No transactions yet!"}
          {isFetchingTransactions &&
            Array(3)
              .fill(3)
              ?.map((_, index) => <TransactionSkeleton key={index} />)}
          {transactionHistory?.results?.map((history: any) => (
            <RecentCards
              key={history?.id}
              text1={history?.transaction_type}
              text2={history?.status}
              amount={`${history?.currency} ${history?.crypto_amount}`}
              date={
                <span>{dayjs(history?.time).format("DD/MM/YY HH:mm")}</span>
              }
            />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default History;
