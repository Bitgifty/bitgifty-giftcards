import { useState } from "react";
import { BackIcon, SearchIcon } from "../components/images";
import Layout from "../components/Layout";
import { CategoryBtn } from "../components/Buttons/CategoryBtn";
import { buyBrands } from "../components/utils/Dummy";
import { BrandCard } from "../components/cards/BrandCard";

const BuyGiftCard = () => {
  const [category, setCategory] = useState<string>("All");

  return (
    <Layout>
      <section className="py-[40px] px-[16px] relative">
        <div className="absolute left-0 right-0 px-[16px] bg-grey-1">
          <div className="flex items-center justify-between">
            <BackIcon />
            <h2 className=" text-[18px] text-black-1 font-[500] leading-[21.09px]">
              Buy Gift Cards
            </h2>
            <SearchIcon />
          </div>
          <div className="flex items-center justify-between gap-x-[10px] mt-[27px]">
            <CategoryBtn label="All" state={category} stateFn={setCategory} />
            <CategoryBtn
              label="Fashion"
              state={category}
              stateFn={setCategory}
            />
            <CategoryBtn label="Music" state={category} stateFn={setCategory} />
            <CategoryBtn
              label="Movies"
              state={category}
              stateFn={setCategory}
            />
          </div>
        </div>
        <section className="mt-[100px] grid grid-cols-2 gap-[16px]">
          {buyBrands?.map((brand) => (
            <BrandCard
              text1={brand?.text1}
              text2={brand?.text2}
              image={brand?.image}
              banner={brand?.banner}
              checkoutBanner={brand?.checkoutBanner}
              link={brand?.link}
            />
          ))}
        </section>
      </section>
    </Layout>
  );
};

export default BuyGiftCard;
