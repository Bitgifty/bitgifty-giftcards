//Check if outside is clicked

import React, { useEffect } from "react";

type CheckOutType = {
  onState: Boolean | string | null;
  mainRef: React.RefObject<HTMLDivElement | HTMLUListElement | HTMLFormElement>;
  subRef: React.RefObject<HTMLImageElement | HTMLDivElement>;
  dispatchFunc?: () => void;
  setFunc?: React.Dispatch<React.SetStateAction<Boolean>>;
};

export const useClickOut = ({
  onState,
  mainRef,
  subRef,
  dispatchFunc,
  setFunc,
}: CheckOutType) => {
  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (
        onState &&
        mainRef?.current &&
        !mainRef?.current?.contains(e.target as Node) &&
        !subRef?.current?.contains(e.target as Node)
      ) {
        dispatchFunc ? dispatchFunc() : setFunc && setFunc(!onState);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [onState, mainRef, dispatchFunc, subRef, setFunc]);
};
