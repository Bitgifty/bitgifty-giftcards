import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import {
  closeCountryBox,
  openCountry,
  setOpenCountryBox,
} from "../../appSlices/generalSlice";
import { DoneGreenIcon, DropDownBlackIcon, SearchFillIcon } from "../images";
import { useRef, useState } from "react";
import { useClickOut } from "../utils/ClickOut";
import { SUPPORTED_COUNTRIES } from "../utils/SupportedCountries";
import { SupportedCountry } from "../utils/Types";
import { setActiveCountry } from "../../appSlices/CountrySlice";

const CountrySelector = () => {
  const openCountryBox = useAppSelector(openCountry);
  const dropDownRef = useRef(null);
  const countryBoxRef = useRef(null);
  const dispatch = useDispatch();
  const currentCountry = JSON.parse(localStorage.getItem("user_country")!);
  const [filteredCountries, setFilteredCountries] =
    useState<SupportedCountry[]>(SUPPORTED_COUNTRIES);

  useClickOut({
    onState: openCountryBox,
    mainRef: countryBoxRef,
    subRef: dropDownRef,
    dispatchFunc: () => dispatch(setOpenCountryBox()),
  });

  const handleSearchCountries = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilteredCountries(
      SUPPORTED_COUNTRIES?.filter((country) =>
        country?.name?.toLowerCase()?.includes(e.target.value?.toLowerCase())
      )
    );
  };

  const handleChangeCountry = (country: SupportedCountry) => {
    if (countryBoxRef?.current) {
      dispatch(setActiveCountry(country));
      dispatch(closeCountryBox());
    }
  };
  return (
    <section className="relative">
      <div
        ref={dropDownRef}
        onClick={() => dispatch(setOpenCountryBox())}
        className="flex items-center gap-x-[10px] bg-grey-2 p-[3px_10px] rounded-[8px] cursor-pointer text-[14px] text-black-1"
      >
        {currentCountry?.flag} <span>{currentCountry?.name}</span>
        <DropDownBlackIcon />
      </div>
      <div
        className={`absolute top-[35px] z-10 bg-white-1 rounded-[8px] p-[1px] transition-opacity duration-500 ease-in-out ${
          openCountryBox ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          ref={countryBoxRef}
          className={`w-[240px] pl-[11px] h-[36px] rounded-[8px] flex items-center bg-white-1 border-[1px] border-grey-2`}
        >
          <SearchFillIcon />
          <input
            placeholder="Search countries"
            onChange={handleSearchCountries}
            className="w-[80%]  border-none  text-[11px] text-black-3 placeholder:text-black-3 leading-[12.89px] outline-none px-[15px]"
          />
        </div>
        <div className="p-[10px_15px] text-black-1 text-[14px] flex flex-col gap-y-[10px]">
          {filteredCountries?.map((country, index) => (
            <div
              key={index}
              className=" flex items-center justify-between cursor-pointer"
              onClick={() => handleChangeCountry(country)}
            >
              <div>
                <span>{country?.flag}</span> <span>{country?.name}</span>
              </div>
              {currentCountry?.name === country?.country ? (
                <DoneGreenIcon />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountrySelector;
