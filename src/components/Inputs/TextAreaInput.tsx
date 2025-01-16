import { Controller } from "react-hook-form";

interface FormFieldProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  control: any;
  name: string;
  label: string;
}
export const TextAreaInput = ({
  control,
  name,
  label,
  ...props
}: FormFieldProps) => {
  return (
    <Controller
      control={control}
      name={name!}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <div>
          <p className=" text-[14px] leading-[16.41px] text-black-3 mb-[8px]">
            {label}
          </p>

          <textarea
            value={value}
            onChange={onChange}
            {...props}
            className="w-full h-[73px]  rounded-[8px] bg-white-1 border-[1px] border-grey-2 text-[16px_important!] placeholder:text-[16px_important!] text-black-3 placeholder:text-black-3 leading-[12.89px] outline-none px-[15px] py-[12px] resize-none"
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
