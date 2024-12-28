import { Controller } from "react-hook-form";
import { useAppSelector } from "../../app/hooks";
import { selectCountry } from "../../appSlices/CountrySlice";

interface FormFieldProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  control: any;
  name: string;
  label: string;
  fixedValues?: string[] | undefined;
  fixedState?: string;
  fixedOnClick?: (value: string) => void;
}
export const TextInput = ({
  control,
  name,
  label,
  fixedValues,
  fixedState,
  fixedOnClick,
  ...props
}: FormFieldProps) => {
  const selectedCountry = useAppSelector(selectCountry);
  return (
    <Controller
      control={control}
      name={name!}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <div>
          <p className=" text-[14px] leading-[16.41px] text-black-3 mb-[8px]">
            {label}
          </p>
          {fixedValues !== undefined && (
            <div className="flex mb-[12px] gap-[8px] flex-wrap">
              {fixedValues?.map((value) => (
                <button
                  type="button"
                  className={`py-[9px] px-[17px] text-[10px] leading-[11.72px] space-x-[2%] rounded-[13px] ${
                    value === fixedState
                      ? "bg-brown-1 text-white-1"
                      : "bg-orange-1 text-black-4"
                  }`}
                  onClick={() => fixedOnClick && fixedOnClick(value)}
                >
                  {`${selectedCountry?.currency}${value}`}
                </button>
              ))}
            </div>
          )}

          <input
            value={value}
            onChange={onChange}
            {...props}
            className="w-full h-[44px] rounded-[8px] bg-white-1 border-[1px] border-grey-2 text-[11px] text-black-3 placeholder:text-black-3 leading-[12.89px] outline-none px-[15px]"
          />

          {error && (
            <p className="text-red-1 text-[0.875rem] mt-[8px]">
              {error.message}
            </p>
          )}
        </div>
      )}
    />
  );
};
