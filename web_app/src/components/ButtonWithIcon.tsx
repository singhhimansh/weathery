import React from "react";
import EmptyLoader from "./EmptyLoader";
import { twc } from "@/utils/common.utils";

type TButtonWithIcon = {
  className?: string;
  label: string;
  isLoading?: boolean;
  disabled?: boolean;
  onClick: ()=> void;
};

// Button with icon and label component
function ButtonWithIcon({ className, label, disabled, isLoading,onClick }: TButtonWithIcon) {
  return (
    <button
      type="button"
      disabled={isLoading || disabled }
      onClick={onClick}
      className={twc('text-white bg-blue-700 hover:bg-blue-800 hover:cursor-pointer  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center text-nowrap me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',className)}
    >
      {isLoading ? (
        <EmptyLoader size="15" />
      ) : (
        <svg
          className=" text-gray-800 mr-2 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          preserveAspectRatio="1"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-width="1.4"
            d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
          />
        </svg>
      )}

      {label}
    </button>
  );
}

export default ButtonWithIcon;
