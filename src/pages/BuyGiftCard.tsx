import { useEffect, useState } from "react";
import { BackIcon } from "../components/images";
import Layout from "../components/Layout";
import { CategoryBtn } from "../components/Buttons/CategoryBtn";
import { BrandCard } from "../components/cards/BrandCard";
import { useGetBrandsByCountryQuery } from "../appSlices/apiSlice";
import { useAppSelector } from "../app/hooks";
import { selectCountry } from "../appSlices/CountrySlice";
import { BrandCardSkeleton } from "../components/utils/skeletons/BrandCardSkeleton";
import { Search } from "../components/Inputs/Search";
import { useScrollToTop } from "../components/utils/ScrollToTop";

const BuyGiftCard = () => {
  const [category, setCategory] = useState<string>("All");
  const country = useAppSelector(selectCountry);
  const { currentData: operators, isFetching: isFetchingOperators } =
    useGetBrandsByCountryQuery({ country });
  const [filteredOperators, setFilteredOperators] = useState(operators);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const brandToSearch = e.target.value?.toLowerCase();
    const filtered = operators?.filter((operator: any) =>
      operator?.name?.toLowerCase()?.includes(brandToSearch)
    );
    setFilteredOperators(filtered);
  };

  useEffect(() => {
    setFilteredOperators(operators);
  }, [operators]);

  useScrollToTop();

  return (
    <Layout>
      <section className="py-[40px] px-[16px] relative">
        <div className=" fixed md:max-w-[500px] lg:max-w-[600px] top-0 z-10 m-[0_auto] pt-[40px] pb-[20px] left-0 right-0 px-[16px] bg-grey-1">
          <div className=" bg-grey-1">
            <div className="flex items-center justify-center relative">
              <BackIcon extraClass="absolute left-0" />
              <h2 className=" text-[18px] text-black-1 font-[500] leading-[21.09px]">
                Buy Gift Cards
              </h2>
            </div>
            <Search
              extraClass="mt-[13px] "
              placeholder="Search Brands"
              onChange={(e) => handleSearch(e)}
            />
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
        <section className="mt-[170px] grid grid-cols-2 gap-[16px]">
          {!isFetchingOperators &&
            operators?.length < 1 &&
            "No operator available!"}
          {isFetchingOperators &&
            Array(8)
              .fill(0)
              .map((_, index) => <BrandCardSkeleton key={index} />)}
          {filteredOperators?.map((brand: any) => (
            <BrandCard
              key={brand?.id}
              text1={brand?.name}
              text2={brand?.productTypeName}
              image={`https://bitgifty-bucket.s3.eu-north-1.amazonaws.com/brands/${brand?.id}.jpg`}
              link={`/buy-gift-card/${brand?.id}`}
              currency={brand?.currency}
            />
          ))}
        </section>
      </section>
    </Layout>
  );
};

export default BuyGiftCard;
