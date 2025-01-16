import { useEffect, useState } from "react";
import { BackIcon } from "../components/images";
import Layout from "../components/Layout";
import { CategoryBtn } from "../components/Buttons/CategoryBtn";
import { BrandCard } from "../components/cards/BrandCard";
import { useGetBrandsByCountryQuery } from "../appSlices/apiSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectCountry, setActiveCountry } from "../appSlices/CountrySlice";
import { BrandCardSkeleton } from "../components/utils/skeletons/BrandCardSkeleton";
import { Search } from "../components/Inputs/Search";
import { useScrollToTop } from "../components/utils/ScrollToTop";
import { defaultCountry } from "../components/utils/SupportedCountries";

const BuyGiftCard = () => {
  const [category, setCategory] = useState<string>("General");
  const country = useAppSelector(selectCountry);
  const localCountry = localStorage.getItem("user_country");
  const dispatch = useAppDispatch();
  const { currentData: operators, isFetching: isFetchingOperators } =
    useGetBrandsByCountryQuery(country?.country);
  const [filteredOperators, setFilteredOperators] = useState(operators);
  const { currentData: popular, isFetching: isFetchingPopular } =
    useGetBrandsByCountryQuery("US");

  const groupToBeFiltered = () => {
    if (category === "General") {
      return operators;
    } else {
      return popular;
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const brandToSearch = e.target.value?.toLowerCase();
    const filtered = groupToBeFiltered()?.filter((operator: any) =>
      operator?.name?.toLowerCase()?.includes(brandToSearch)
    );
    setFilteredOperators(filtered);
  };

  useEffect(() => {
    if (category === "General") {
      setFilteredOperators(operators);
    } else {
      setFilteredOperators(popular);
    }
  }, [operators, popular, category]);

  useEffect(() => {
    if (localCountry) {
      dispatch(setActiveCountry(JSON.parse(localCountry)));
    } else {
      dispatch(setActiveCountry(defaultCountry));
    }
  }, [localCountry]);

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
          <div className="flex items-center gap-x-[10px] mt-[27px]">
            <CategoryBtn
              label="General"
              state={category}
              stateFn={setCategory}
            />
            <CategoryBtn
              label="Popular"
              state={category}
              stateFn={setCategory}
            />
          </div>
        </div>
        <section className="mt-[170px] grid grid-cols-2 gap-[16px]">
          {!isFetchingOperators &&
            !isFetchingPopular &&
            operators?.length < 1 &&
            "No operator available!"}
          {(isFetchingOperators || isFetchingPopular) &&
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
