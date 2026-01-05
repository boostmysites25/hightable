'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { gsap } from 'gsap';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navRef = useRef<HTMLElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (navRef.current) {
            if (isScrolled) {
                gsap.to(navRef.current, {
                    backgroundColor: 'rgba(61, 0, 102, 0.8)', // Deep Purple with opacity
                    backdropFilter: 'blur(12px)',
                    borderBottom: '1px solid rgba(199, 141, 23, 0.1)', // Subtle Gold border
                    duration: 0.4,
                });
            } else {
                gsap.to(navRef.current, {
                    backgroundColor: 'transparent',
                    backdropFilter: 'blur(0px)',
                    borderBottom: '1px solid transparent',
                    duration: 0.4,
                });
            }
        }
    }, [isScrolled]);

    // Mobile menu animation
    useEffect(() => {
        if (mobileMenuRef.current) {
            if (isOpen) {
                gsap.fromTo(mobileMenuRef.current,
                    { height: 0, opacity: 0 },
                    { height: 'auto', opacity: 1, duration: 0.4, ease: 'power2.out' }
                );
            } else {
                gsap.to(mobileMenuRef.current, {
                    height: 0,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.in',
                });
            }
        }
    }, [isOpen]);

    return (
        <nav
            ref={navRef}
            className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'py-4' : 'py-6'}`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link href="/" className="text-2xl font-serif font-bold text-[#EFD9F7] tracking-widest hover:text-white transition-colors">
                    HIGH TABLE
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-12 items-center">
                    {['Purpose', 'High Table', 'Membership'].map((item) => (
                        <Link
                            key={item}
                            href={`#${item.toLowerCase().replace(' ', '-')}`}
                            className="text-[#EFD9F7]/70 hover:text-[#C78D17] transition-colors uppercase text-xs tracking-[0.2em] font-medium"
                        >
                            {item}
                        </Link>
                    ))}
                    <button className="text-[#C78D17] border border-[#C78D17]/30 px-6 py-2 text-xs uppercase tracking-widest hover:bg-[#C78D17] hover:text-[#3D0066] transition-all duration-300">
                        Login
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-[#EFD9F7] z-50"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                ref={mobileMenuRef}
                className="md:hidden absolute top-full left-0 w-full bg-[#3D0066] border-t border-[#C78D17]/20 overflow-hidden"
                style={{ height: 0, opacity: 0 }}
            >
                <div className="flex flex-col p-8 space-y-6 items-center">
                    {['Purpose', 'High Table', 'Membership'].map((item) => (
                        <Link
                            key={item}
                            href={`#${item.toLowerCase().replace(' ', '-')}`}
                            className="text-[#EFD9F7] hover:text-[#C78D17] transition-colors uppercase text-sm tracking-widest"
                            onClick={() => setIsOpen(false)}
                        >
                            {item}
                        </Link>
                    ))}
                    <button className="text-[#C78D17] border border-[#C78D17] px-8 py-3 w-full text-sm uppercase tracking-widest mt-4">
                        Login
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
