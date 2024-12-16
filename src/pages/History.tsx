import { BackIcon } from "../components/images";
import Layout from "../components/Layout";
import { history } from "../components/utils/Dummy";
import { RecentCards } from "../components/cards/RecentsCard";
import { CategoryBtn } from "../components/Buttons/CategoryBtn";
import { useState } from "react";

const History = () => {
  const [category, setCategory] = useState<string>("All");
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
          {history?.map((recent) => (
            <RecentCards
              text1={recent?.text1}
              text2={recent?.text2}
              amount={recent?.amount}
              date={recent?.date}
            />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default History;
