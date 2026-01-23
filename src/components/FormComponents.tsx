'use client';

import React from 'react';

export const InputGroup = ({ label, type = "text", required = true, placeholder = "", name }: { label: string, type?: string, required?: boolean, placeholder?: string, name?: string }) => (
    <div className="flex flex-col gap-2">
        <label className="text-[#EFD9F7] text-xs font-bold uppercase tracking-wider">
            {required && '* '}{label}
        </label>
        <input
            type={type}
            name={name}
            required={required}
            placeholder={placeholder}
            className="w-full bg-transparent border border-[#EFD9F7]/20 p-4 text-[#EFD9F7] focus:border-[#C78D17] outline-none transition-colors rounded-sm"
        />
    </div>
);

export const SelectGroup = ({ label, options, required = true, placeholder = "Select an answer", defaultValue = "", variant = 'box' }: { label: string, options: string[], required?: boolean, placeholder?: string, defaultValue?: string, variant?: 'box' | 'underline' }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selected, setSelected] = React.useState(defaultValue);

    const baseStyles = "w-full bg-transparent text-[#EFD9F7] cursor-pointer flex justify-between items-center transition-all group";
    const boxStyles = `border ${isOpen ? 'border-[#C78D17]' : 'border-[#EFD9F7]/20'} p-4 rounded-sm`;
    const underlineStyles = `border-b ${isOpen ? 'border-[#C78D17]' : 'border-[#EFD9F7]/20'} py-3 text-sm`;

    return (
        <div className="flex flex-col gap-2 relative h-full">
            {label && (
                <label className="text-[#EFD9F7] text-xs font-bold uppercase tracking-wider">
                    {required && '* '}{label}
                </label>
            )}
            <div
                className={`${baseStyles} ${variant === 'box' ? boxStyles : underlineStyles}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={`block truncate mr-2 ${selected ? 'text-[#EFD9F7]' : 'text-[#EFD9F7]/50'}`}>
                    {selected || placeholder}
                </span>
                <span className={`text-[#EFD9F7] transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
            </div>

            {/* Dropdown Menu */}
            <div className={`absolute top-full left-0 min-w-full w-max max-w-[300px] mt-1 bg-[#3D0066] border border-[#C78D17] rounded-sm shadow-xl z-50 transition-all duration-200 origin-top max-h-60 overflow-y-auto ${isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}`}>
                {options.map((opt) => (
                    <div
                        key={opt}
                        className="p-4 text-[#EFD9F7] hover:bg-[#EFD9F7] hover:text-[#3D0066] cursor-pointer transition-colors border-b border-[#EFD9F7]/10 last:border-none"
                        onClick={() => {
                            setSelected(opt);
                            setIsOpen(false);
                        }}
                    >
                        {opt}
                    </div>
                ))}
            </div>

            {/* Backdrop for closing */}
            {isOpen && <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setIsOpen(false)} />}
        </div>
    );
};

export const TextAreaGroup = ({ label, subtext, required = true }: { label: string, subtext?: string, required?: boolean }) => (
    <div className="flex flex-col gap-2">
        <label className="text-[#EFD9F7] text-xs font-bold uppercase tracking-wider">
            {required && '* '}{label}
        </label>
        <textarea
            rows={5}
            className="w-full bg-transparent border border-[#EFD9F7]/20 p-4 text-[#EFD9F7] focus:border-[#C78D17] outline-none transition-colors rounded-sm"
        />
        {subtext && <p className="text-[#EFD9F7]/40 text-xs">{subtext}</p>}
    </div>
);

export const FileUpload = ({ label, subtext, required = true }: { label: string, subtext: string, required?: boolean }) => (
    <div className="flex flex-col gap-2">
        <label className="text-[#EFD9F7] text-xs font-bold uppercase tracking-wider">
            {required && '* '}{label}
        </label>
        <button className="border border-[#EFD9F7] bg-[#EFD9F7] text-[#3D0066] p-3 rounded-full w-fit px-8 font-semibold text-sm hover:bg-[#C78D17] hover:border-[#C78D17] transition-colors flex items-center gap-2">
            <span>☁</span> click to upload
        </button>
        <p className="text-[#EFD9F7]/60 text-xs mt-1">{subtext}</p>
    </div>
);
