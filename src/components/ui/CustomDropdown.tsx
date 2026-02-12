'use client';

import { useState, useRef, useEffect } from 'react';

interface CustomDropdownProps {
    label?: string; // Optional label for accessibility/debugging
    options: (string | { label: string; value: string })[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    error?: string;
    searchable?: boolean;
    className?: string; // To support external classes like 'animate-shake'
    required?: boolean;
}

const CustomDropdown = ({
    label,
    options,
    value,
    onChange,
    placeholder = "Select an option",
    error,
    searchable = false,
    className = "",
    required = false
}: CustomDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Normalize options to { label, value } format
    const normalizedOptions = options.map(opt =>
        typeof opt === 'string' ? { label: opt, value: opt } : opt
    );

    // Filter options based on search term
    const filteredOptions = searchable
        ? normalizedOptions.filter(opt =>
            opt.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
            opt.value.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : normalizedOptions;

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Get current label for display
    const selectedOption = normalizedOptions.find(opt => opt.value === value);
    const displayValue = selectedOption ? selectedOption.label : '';

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            <div
                className={`w-full bg-[#3D0066] border border-[#EFD9F7]/20 p-4 text-[#EFD9F7] cursor-pointer rounded-sm flex justify-between items-center transition-colors ${isOpen ? 'border-[var(--gold)]' : 'hover:border-[var(--gold)]'} ${error ? 'border-red-500' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={`block truncate ${!value && 'text-[#EFD9F7]/50'}`}>
                    {value ? displayValue : placeholder}
                </span>
                <span className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} text-[#EFD9F7]/50`}>
                    ▼
                </span>
            </div>

            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-[#3D0066] border border-[var(--gold)] rounded-sm max-h-60 overflow-y-auto shadow-xl">
                    {searchable && (
                        <div className="sticky top-0 bg-[#3D0066] p-2 border-b border-[#EFD9F7]/10">
                            <input
                                type="text"
                                className="w-full bg-[#3D0066] text-[#EFD9F7] p-2 border border-[#EFD9F7]/20 rounded-sm text-sm focus:border-[var(--gold)] outline-none placeholder-[#EFD9F7]/30"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking input
                                autoFocus
                            />
                        </div>
                    )}
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((opt) => (
                            <div
                                key={opt.value}
                                className={`p-3 cursor-pointer hover:bg-[var(--gold)]/20 text-[#EFD9F7] transition-colors ${value === opt.value ? 'bg-[var(--gold)]/10 text-[var(--gold)]' : ''}`}
                                onClick={() => {
                                    onChange(opt.value);
                                    setIsOpen(false);
                                    setSearchTerm('');
                                }}
                            >
                                {opt.label}
                            </div>
                        ))
                    ) : (
                        <div className="p-3 text-[#EFD9F7]/50 text-center text-sm">
                            No options found
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;
