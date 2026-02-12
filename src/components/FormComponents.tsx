'use client';

import React from 'react';

export const InputGroup = ({ label, type = "text", required = true, placeholder = "", name }: { label: string, type?: string, required?: boolean, placeholder?: string, name?: string }) => (
    <div className="flex flex-col gap-2">
        <label className="text-[var(--foreground)] text-xs font-bold uppercase tracking-wider">
            {required && '* '}{label}
        </label>
        <input
            type={type}
            name={name}
            required={required}
            placeholder={placeholder}
            className="w-full bg-transparent border border-[var(--foreground)]/20 p-4 text-[var(--foreground)] focus:border-[var(--gold)] outline-none transition-colors rounded-sm"
        />
    </div>
);

export const SelectGroup = ({ label, options, required = true, placeholder = "Select an answer", defaultValue = "", variant = 'box' }: { label: string, options: string[], required?: boolean, placeholder?: string, defaultValue?: string, variant?: 'box' | 'underline' }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selected, setSelected] = React.useState(defaultValue);

    const baseStyles = "w-full bg-transparent text-[var(--foreground)] cursor-pointer flex justify-between items-center transition-all group";
    const boxStyles = `border ${isOpen ? 'border-[var(--gold)]' : 'border-[var(--foreground)]/20'} p-4 rounded-sm`;
    const underlineStyles = `border-b ${isOpen ? 'border-[var(--gold)]' : 'border-[var(--foreground)]/20'} py-3 text-sm`;

    return (
        <div className="flex flex-col gap-2 relative h-full">
            {label && (
                <label className="text-[var(--foreground)] text-xs font-bold uppercase tracking-wider">
                    {required && '* '}{label}
                </label>
            )}
            <div
                className={`${baseStyles} ${variant === 'box' ? boxStyles : underlineStyles}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={`block truncate mr-2 ${selected ? 'text-[var(--foreground)]' : 'text-[var(--foreground)]/50'}`}>
                    {selected || placeholder}
                </span>
                <span className={`text-[var(--foreground)] transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
            </div>

            {/* Dropdown Menu */}
            <div className={`absolute top-full left-0 min-w-full w-max max-w-[300px] mt-1 bg-[var(--background)] border border-[var(--gold)] rounded-sm shadow-xl z-50 transition-all duration-200 origin-top max-h-60 overflow-y-auto ${isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}`}>
                {options.map((opt) => (
                    <div
                        key={opt}
                        className="p-4 text-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)] cursor-pointer transition-colors border-b border-[var(--foreground)]/10 last:border-none"
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
        <label className="text-[var(--foreground)] text-xs font-bold uppercase tracking-wider">
            {required && '* '}{label}
        </label>
        <textarea
            rows={5}
            className="w-full bg-transparent border border-[var(--foreground)]/20 p-4 text-[var(--foreground)] focus:border-[var(--gold)] outline-none transition-colors rounded-sm"
        />
        {subtext && <p className="text-[var(--foreground)]/40 text-xs">{subtext}</p>}
    </div>
);

export const FileUpload = ({ label, subtext, required = true }: { label: string, subtext: string, required?: boolean }) => (
    <div className="flex flex-col gap-2">
        <label className="text-[var(--foreground)] text-xs font-bold uppercase tracking-wider">
            {required && '* '}{label}
        </label>
        <button className="border border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)] p-3 rounded-full w-fit px-8 font-semibold text-sm hover:bg-[var(--gold)] hover:border-[var(--gold)] transition-colors flex items-center gap-2">
            <span>☁</span> click to upload
        </button>
        <p className="text-[var(--foreground)]/60 text-xs mt-1">{subtext}</p>
    </div>
);
