import { Oval } from "react-loader-spinner";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useGetOperatorProductsQuery } from "../../appSlices/apiSlice";
import {
  closeOperatorProductBox,
  selectOpenOperatorProductBox,
  setOperatorProduct,
} from "../../appSlices/generalSlice";
import { CancelIcon } from "../images";
import { useRef } from "react";

export const ProductSelector = ({
  operatorId,
}: {
  operatorId: string | undefined;
}) => {
  const { currentData: products, isFetching: isProductFetching } =
    useGetOperatorProductsQuery({ operatorId });
  const contRef = useRef(null);
  const productsArray = products ? Object.values(products) : [];
  const dispatch = useAppDispatch();
  const openProductBox = useAppSelector(selectOpenOperatorProductBox);
  const handleSelect = (product: any) => {
    if (openProductBox) {
      dispatch(setOperatorProduct(product));
      dispatch(closeOperatorProductBox());
    }
  };
  return (
    <div
      ref={contRef}
      className={`${
        openProductBox ? "block " : "hidden"
      } p-[25px_19px] right-[10px] left-[10px] bg-white-1 rounded-[16px] absolute drop-shadow-md`}
    >
      <div className="flex items-center justify-center relative">
        <h2 className="text-black-1 text-[16px] leading-[18.75px] font-[600] space-x-[2%]">
          Operator Products
        </h2>
        <CancelIcon
          extraClass="absolute right-[23px] top-[20px]"
          onClick={() => dispatch(closeOperatorProductBox())}
        />
      </div>
      {isProductFetching && (
        <Oval
          height={20}
          width={20}
          color="#fff"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#22262B"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      )}
      <div className="mt-[15px]">
        {productsArray?.map((product: any) => (
          <div
            key={product?.id}
            className="p-[10px] border-b-[1px] border-b-grey-1 text-[14px] leading-[16.59px] space-x-[6%] text-black-3 flex flex-col gap-y-[6px] cursor-pointer"
            onClick={() => handleSelect(product)}
          >
            {product?.name}
          </div>
        ))}
      </div>
    </div>
  );
};
