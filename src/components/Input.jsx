import React from 'react';

const Input = ({ value, name, type, handleChange, width, label, required, helperText, error }) => {
    return (
        <div className={`${width || 'w-full'}`}>
            <input
                placeholder={label}
                type={type}
                required={required}
                name={name}
                value={value}
                onChange={handleChange}
                className='h-[42px] border-b bg-transparent border-[#E2E4E5] w-full lg:text-sm text-sm outline-none'
            />
            {
                error && <p className='mt-1.5 text-xs text-[#d32f2f] font-medium'>{helperText}</p>
            }
        </div>
    )
}

export default Input