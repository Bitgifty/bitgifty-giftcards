import { BackIcon } from "../components/images";
import Layout from "../components/Layout";
import { sellBrands } from "../components/utils/Dummy";
import { BrandCard } from "../components/cards/BrandCard";
import { Search } from "../components/Inputs/Search";

const SellGiftCard = () => {
  return (
    <Layout>
      <section className="py-[40px] px-[16px] relative">
        <div className="absolute left-0 right-0 px-[16px] bg-grey-1">
          <div className="flex items-center justify-center relative">
            <BackIcon extraClass="absolute left-0" />
            <h2 className=" text-[18px] text-black-1 font-[500] leading-[21.09px]">
              Buy Gift Cards
            </h2>
          </div>
          <Search extraClass="mt-[13px]" />
        </div>
        <section className="mt-[100px] grid grid-cols-2 gap-[16px]">
          {sellBrands?.map((brand) => (
            <BrandCard
              sell
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

export default SellGiftCard;
