import React from 'react';

const SelectInput = ({ value, name, options, handleChange, width, label, showPlaceholder = true, required, error, helperText }) => {
    return (
        <div className={`${width || 'w-full'} relative`}>
            <select
                required={required}
                placeholder={label}
                name={name}
                value={value}
                onChange={handleChange}
                className='h-[42px] pr-10 pl-2 border rounded border-[#E2E4E5] outline-none w-full text-white font-medium lg:text-sm text-sm bg-transparent appearance-none'
            >
                {showPlaceholder && <option value="" disabled>{label}</option>}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <div className='absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none'>
                <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 4.5L6 9.5L11 4.5H1Z" fill="#808080" />
                </svg>
            </div>

            {
                error && <p className='mt-1.5 text-xs text-[#d32f2f] font-medium'>{helperText}</p>
            }
        </div>
    );
};

export default SelectInput;