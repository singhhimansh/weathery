import { twc } from "@/utils/common.utils";
import React, { KeyboardEvent, useCallback, useState } from "react";

type TInputProps = {
  value: string;
  name?: string;
  placeholder?: string;
  className?: string;
  defaultValue?: string;
  label?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onkeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
};

// Reusable Input component
function Input({
  onChange,
  onkeyDown,
  placeholder,
  className,
  value,
  defaultValue,
}: TInputProps) {
  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e);
    },
    [onChange]
  );

  return (
    <div className="relative flex w-full">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg
          className="w-[20px] h-[20px] text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fill-rule="evenodd"
            d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <input
        type="text"
        className={twc(
          "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:bg-slate-100 focus:ring-blue-500  focus:border-blue-500 w-full block",
          className,
          "ps-10"
        )}
        onKeyDown={onkeyDown}
        value={value}
        onChange={handleOnChange}
        placeholder={placeholder}
      />
    </div>
  );
}

export default Input;
