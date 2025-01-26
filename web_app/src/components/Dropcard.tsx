import { twc } from "@/utils/common.utils";
import React from "react";

type TDropcardProps = {
  className?: string;
  children?: React.ReactNode;
};

// container card component having drop shadow effect
function Dropcard({ className, children }: TDropcardProps) {
  return (
    <div className={twc('w-full p-2 shadow-md rounded-lg bg-white',className)}>
      {children}
    </div>
  );
}

export default Dropcard;
