import { Oval } from "react-loader-spinner";

export const ActionButton = ({
  label,
  onClick,
  loading,
  extraClass,
}: {
  label: string;
  onClick?: () => void;
  loading?: boolean;
  extraClass?: string;
}) => (
  <button
    className={`${extraClass} w-full flex items-center justify-center text-white-1 bg-blue-1 h-[44px] rounded-[8px] text-[14px] font-[600]`}
    onClick={onClick}
  >
    {loading ? (
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
    ) : (
      label
    )}
  </button>
);
