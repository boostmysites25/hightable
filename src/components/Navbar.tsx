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
                    // backgroundColor: '#201B35',
                    backgroundColor: '#0000002D',
                    backdropFilter: 'blur(10px)',
                    duration: 0.3,
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                });
            } else {
                gsap.to(navRef.current, {
                    backgroundColor: 'transparent',
                    duration: 0.3,
                    boxShadow: 'none',
                });
            }
        }
    }, [isScrolled]);

    // Mobile menu animation
    useEffect(() => {
        if (mobileMenuRef.current) {
            if (isOpen) {
                gsap.fromTo(mobileMenuRef.current,
                    {
                        height: 0,
                        opacity: 0,
                    },
                    {
                        height: 'auto',
                        opacity: 1,
                        duration: 0.4,
                        ease: 'power2.out',
                    }
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
            className={`fixed w-full z-50 transition-all duration-300 overflow-x-hidden ${isScrolled ? 'py-4' : 'py-6'
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link href="/" className="text-2xl  font-bold text-white tracking-wide md:tracking-widest">
                    HIGH TABLE
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-8 items-center">
                    {['Membership'].map((item) => (
                        <Link
                            key={item}
                            href={`#${item.toLowerCase().replace(' ', '-')}`}
                            className="text-white/80 hover:text-[#AD986E] transition-colors uppercase text-sm tracking-wider"
                        >
                            {item}
                        </Link>
                    ))}
                    <button className="btn btn-primary btn-md">
                        LOGIN
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white z-50"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                ref={mobileMenuRef}
                className="md:hidden absolute top-full left-0 w-full bg-[#201B35] border-t border-[#AD986E]/20 overflow-hidden"
                style={{ height: 0, opacity: 0 }}
            >
                <div className="flex flex-col p-6 space-y-4">
                    {['Membership'].map((item) => (
                        <Link
                            key={item}
                            href={`#${item.toLowerCase().replace(' ', '-')}`}
                            className="text-white/80 hover:text-[#AD986E] transition-colors uppercase text-sm tracking-wider"
                            onClick={() => setIsOpen(false)}
                        >
                            {item}
                        </Link>
                    ))}
                    <button className="btn btn-primary btn-md w-full">
                        LOGIN
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
