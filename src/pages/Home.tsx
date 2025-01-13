import {
  ArrowLeftWhiteIcon,
  BuyIcon,
  Logo,
  SellIcon,
  Slide1,
  Slide2,
  Slide3,
} from "../components/images";
import Layout from "../components/Layout";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SlickSettings } from "../components/utils/SlickSettings";
import { ActionCard } from "../components/cards/ActionCard";
import { RecentCards } from "../components/cards/RecentsCard";
import { Link } from "react-router-dom";
import CountrySelector from "../components/Inputs/CountrySelector";
import WalletConnect from "../components/WalletConnect";
import { fetchTokenBalances, selectActiveToken } from "../appSlices/TokenSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  detectCountryByIP,
  fetchRate,
  selectCountry,
  selectRate,
  setActiveCountry,
} from "../appSlices/CountrySlice";
import { useEffect } from "react";
import { defaultCountry } from "../components/utils/SupportedCountries";
import dayjs from "dayjs";
import { selectWalletAddress } from "../appSlices/walletSlice";
import { useGetTransactionHistoryQuery } from "../appSlices/apiSlice";
import { TransactionSkeleton } from "../components/utils/skeletons/TransactionSkeleton";

const Home = () => {
  const activeToken: any = useAppSelector(selectActiveToken);
  const rate = useAppSelector(selectRate);
  const dispatch = useAppDispatch();
  const localCountry = localStorage.getItem("user_country");
  const walletAddress = useAppSelector(selectWalletAddress);
  const {
    currentData: transactionHistory,
    isFetching: isFetchingTransactions,
  } = useGetTransactionHistoryQuery({
    walletAddress,
  });

  useEffect(() => {
    if (localCountry) {
      dispatch(setActiveCountry(JSON.parse(localCountry)));
    } else {
      dispatch(setActiveCountry(defaultCountry));
    }
  }, [localCountry]);

  const country = useAppSelector(selectCountry);
  const Slide = Slider as unknown as React.FC<any>;

  useEffect(() => {
    dispatch(detectCountryByIP());
    dispatch(fetchTokenBalances());
  }, [dispatch]);

  useEffect(() => {
    if (country) {
      console.log("fetching rate", country);
      dispatch(fetchRate(country?.country));
    }
  }, [country, dispatch]);

  return (
    <Layout>
      <section>
        <div className=" pt-[44px] px-[16px]">
          <div className=" flex items-center justify-between">
            <div className="flex items-center gap-x-[15px]">
              <Logo /> <CountrySelector />
            </div>
            <WalletConnect />
          </div>
          <div className="mt-[16px] drop-shadow-sm bg-blue-1 border-blue-1 border-opacity-20 border-blue-gradient border-[5px] rounded-[16px] ">
            <div className="flex items-start justify-between text-white-1 px-[16px] pt-[18px]">
              <div className="flex flex-col w-[50%]">
                <p className="text-[14px] leading-[16.41px] pb-[10px]">
                  Available Balance
                </p>
                <p className="text-[32px] font-[500] leading-[37.5px] space-x-[-9%]">
                  {activeToken?.symbol} {activeToken?.formattedBalance || null}
                </p>
                <p className="text-[16px]  leading-[37.5px] space-x-[-9%]">
                  {country?.ticker}{" "}
                  {isNaN(
                    parseFloat(
                      (
                        parseFloat(activeToken?.formattedBalance || null) * rate
                      ).toFixed(0)
                    )
                  )
                    ? "0"
                    : parseFloat(
                        (
                          parseFloat(activeToken?.formattedBalance || null) *
                          rate
                        ).toFixed(0)
                      )}
                </p>
              </div>
              <Link
                to="/history"
                className=" text-white-1 text-[14px] w-full flex items-center gap-x-[10px] justify-end cursor-pointer"
              >
                Transaction History <ArrowLeftWhiteIcon />
              </Link>
            </div>
          </div>
          <div className="mt-[27px] max-w-full overflow-hidden">
            <Slide {...SlickSettings}>
              <Slide1 />
              <Slide2 />
              <Slide3 />
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
                text2="Perfect gift for any occasion"
                link="/buy-gift-card"
              />
              <ActionCard
                icon={<SellIcon />}
                text1="Sell Gift cards"
                text2="Trade your giftcard for money"
                link=""
                soon
              />
            </div>
          </section>
          <section className="mt-[36px]">
            <h2 className="text-[16px] text-black-1 leading-[18.75px] space-[2%] font-[600]">
              Recents
            </h2>

            <div className="flex flex-col gap-y-[5px] mt-[13px]">
              {transactionHistory?.count < 1 ||
                (!walletAddress && "No transactions yet!")}
              {isFetchingTransactions &&
                Array(3)
                  .fill(3)
                  ?.map((_, index) => <TransactionSkeleton key={index} />)}
              {walletAddress &&
                transactionHistory?.results
                  ?.slice(0, 3)
                  ?.map((history: any) => (
                    <RecentCards
                      key={history?.id}
                      text1={history?.transaction_type}
                      text2={history?.status}
                      amount={`${history?.currency} ${history?.crypto_amount}`}
                      date={
                        <span>
                          {dayjs(history?.time).format("DD/MM/YY HH:mm")}
                        </span>
                      }
                      link={`/transaction-receipt/${history?.id}`}
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
