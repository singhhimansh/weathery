import { useEffect, useState } from "react";
import { HazardSign } from "../../public/svg/HazardSign";

// ErrorToast component to show error message
export const ErrorToast = ({
  show,
  error,
  label,
  onClose,
  delay = 5000,
}: {
  show?: boolean;
  error: string;
  label?: string;
  delay?: number;
  onClose: () => void;
}) => {


 // useEffect to close the toast after certain delay time (default 5 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) {
        onClose();
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [onClose, delay]);

  if (!show) return null;

  return (
    <div className="absolute min-w-64 text-start text-nowrap right-0 flex gap-3 items-center text-sm top-0 m-4 bg-red-fade text-red-lite px-7 py-3 rounded-xl border border-red-pale">
      <button
        className="absolute rounded-full  text-sm text-center  top-1 right-2 bg-red-pale w-5 h-4 pb-5"
        onClick={() => {
          onClose && onClose();
        }}
      >
        x
      </button>
      <div className="rounded-full bg-red-pale w-8 h-8 pb-1 flex items-center justify-center">
        <HazardSign />
      </div>
      <div className="flex flex-col">
        {label && <h1 className="text-red-crimson font-bold firstCapital ">{label}</h1>}
        <p className="firstCapital">{error}</p>
      </div>
    </div>
  );
};
