import {
  BaseArrowDownIcon,
  BaseArrowUpIcon,
  BellIcon,
  BuyIcon,
  NameLogo,
  PersonIcon,
  SellIcon,
  SpeakerIcon,
  TimeIcon,
} from "../components/images";
import Layout from "../components/Layout";
import { Option } from "../components/cards/Option";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SlickSettings } from "../components/utils/SlickSettings";
import { ScrollCard } from "../components/cards/ScrollCard";
import { ActionCard } from "../components/cards/ActionCard";
import { RecentCards } from "../components/cards/RecentsCard";
import { recents } from "../components/utils/Dummy";

const Home = () => {
  const Slide = Slider as unknown as React.FC<any>;
  return (
    <Layout>
      <section>
        <div className=" pt-[44px] px-[16px]">
          <div className=" flex items-center justify-between">
            <NameLogo />
            <div className="flex items-center gap-x-[7px]">
              <PersonIcon />
              <BellIcon />
            </div>
          </div>
          <div className="mt-[16px] drop-shadow-sm bg-blue-1 border-blue-1 border-opacity-20 border-blue-gradient border-[5px] rounded-[16px] ">
            <div className="flex items-center justify-between text-white-1 px-[16px] pt-[18px]">
              <div>
                <p className="text-[14px] leading-[16.41px]">Hello</p>
                <p className=" text-[20px] leading-[23.44px] font-[500]">
                  Johnson
                </p>
              </div>
              <span className="text-[32px] font-[500] leading-[37.5px] space-x-[-9%]">
                $100
              </span>
            </div>
            <div className=" flex items-center gap-x-[46px] justify-center px-[43px] py-[18px]">
              <Option icon={<BaseArrowUpIcon />} label="Depoit" link="" />
              <Option icon={<BaseArrowDownIcon />} label="Withdraw" link="" />
              <Option icon={<TimeIcon />} label="History" link="" />
            </div>
          </div>
          <div className="mt-[27px] w-full">
            <Slide {...SlickSettings}>
              <ScrollCard
                icon={<SpeakerIcon />}
                text1="Lorem Ipsum"
                text2="Lorem Ipsum is a dummy text and a very dummy text Lorem Ipsum."
                extraClass="bg-[url('assets/images/lCardBg.png')] bg-cover bg-center bg-no-repeat"
              />
              <ScrollCard
                icon={<SpeakerIcon />}
                text1="Lorem Ipsum"
                text2="Lorem Ipsum is a dummy text and a very dummy text Lorem Ipsum."
                extraClass="bg-[url('assets/images/cCardBg.png')] bg-cover bg-center bg-no-repeat"
              />
              <ScrollCard
                icon={<SpeakerIcon />}
                text1="Lorem Ipsum"
                text2="Lorem Ipsum is a dummy text and a very dummy text Lorem Ipsum."
                extraClass="bg-[url('assets/images/rCardBg.png')] bg-cover bg-center bg-no-repeat"
              />
            </Slide>
          </div>
          <section className="mt-[40px]">
            <h2 className="text-[16px] text-black-1 leading-[18.75px] space-[2%] font-[600]">
              Actions
            </h2>
            <div className="mt-[14px] w-full flex gap-x-[16px]">
              <ActionCard
                icon={<BuyIcon />}
                text1="Buy Gift cards"
                text2="Lorem Ipsum is a dummy text."
                link="/buy-gift-card"
              />
              <ActionCard
                icon={<SellIcon />}
                text1="Sell Gift cards"
                text2="Lorem Ipsum is a dummy text."
                link="/sell-gift-card"
              />
            </div>
          </section>
          <section className="mt-[36px]">
            <h2 className="text-[16px] text-black-1 leading-[18.75px] space-[2%] font-[600]">
              Recents
            </h2>

            <div className="flex flex-col gap-y-[5px] mt-[13px]">
              {recents?.map((recent) => (
                <RecentCards
                  text1={recent?.text1}
                  text2={recent?.text2}
                  amount={recent?.amount}
                  date={recent?.date}
                />
              ))}
            </div>
          </section>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
