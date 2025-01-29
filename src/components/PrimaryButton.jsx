import Image from "next/image";
import React, { useId } from "react";

const PrimaryButton = ({
    onClick,
    label,
    width,
    disabled,
    textColor,
    color = "bg-[#b53836]",
}) => {
    const randomId = useId();
    return (
        <button
            suppressHydrationWarning
            id={randomId}
            tabIndex={0}
            disabled={disabled}
            onClick={onClick}
            className={`active:bg-opacity-100 hover:bg-opacity-90 ease-linear transition-all duration-75  h-11 ${width || "w-full"
                } px-5 rounded ${color} relative ${textColor || "text-AliceBlue"
                } 3xl:text-base text-sm font-medium flex items-center justify-center ${disabled ? "cursor-not-allowed opacity-50" : ""
                }`}
        >
            <div className="flex items-center justify-center">
                {disabled && (
                    <Image
                        width={28}
                        height={28}
                        src="/spinner.svg"
                        alt="spinner"
                        className="animate-spin w-7 h-7"
                    />
                )}

                <span className="lg:text-base text-sm text-white">{label}</span>
            </div>
        </button>
    );
};

export default React.memo(PrimaryButton);