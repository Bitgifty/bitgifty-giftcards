import { useState } from "react";
import { BackIcon, SearchIcon } from "../components/images";
import Layout from "../components/Layout";
import { CategoryBtn } from "../components/Buttons/CategoryBtn";
import { BrandCard } from "../components/cards/BrandCard";
import { useGetBrandsByCountryQuery } from "../appSlices/apiSlice";
import { useAppSelector } from "../app/hooks";
import { selectCountry } from "../appSlices/CountrySlice";
import { BrandCardSkeleton } from "../components/utils/skeletons/BrandCardSkeleton";

const BuyGiftCard = () => {
  const [category, setCategory] = useState<string>("All");
  const country = useAppSelector(selectCountry);
  const { currentData: operators, isFetching: isFetchingOperators } =
    useGetBrandsByCountryQuery({ country });
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
          {isFetchingOperators &&
            Array(8)
              .fill(0)
              .map((_, index) => <BrandCardSkeleton key={index} />)}
          {operators?.map((brand: any) => (
            <BrandCard
              key={brand?.id}
              text1={brand?.name}
              text2={brand?.productTypeName}
              image={`https://media.sochitel.com/img/operators/${brand?.id}.png`}
              link={`/buy-gift-card/${brand?.id}`}
            />
          ))}
        </section>
      </section>
    </Layout>
  );
};

export default BuyGiftCard;
