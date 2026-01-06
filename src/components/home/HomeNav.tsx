'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

const HomeNav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        if (isMenuOpen) {
            // Open Animation
            const tl = gsap.timeline();

            tl.fromTo(menuRef.current,
                { clipPath: 'circle(0% at 100% 0%)' },
                {
                    clipPath: 'circle(150% at 100% 0%)',
                    duration: 1,
                    ease: 'power4.inOut'
                }
            );

            tl.fromTo(linksRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out' },
                "-=0.5"
            );
        } else {
            // Close Animation
            const tl = gsap.timeline();

            tl.to(linksRef.current, {
                y: -50,
                opacity: 0,
                duration: 0.3,
                stagger: 0.05,
                ease: 'power3.in'
            });

            tl.to(menuRef.current, {
                clipPath: 'circle(0% at 100% 0%)',
                duration: 0.8,
                ease: 'power4.inOut'
            }, "-=0.2");
        }
    }, [isMenuOpen]);

    const addToRefs = (el: HTMLAnchorElement | null) => {
        if (el && !linksRef.current.includes(el)) {
            linksRef.current.push(el);
        }
    };

    // Reset refs on render to avoid duplication
    linksRef.current = [];

    return (
        <>
            {/* Fixed Nav Overlay */}
            <nav className="fixed inset-0 z-50 pointer-events-none p-6 md:p-12 mix-blend-difference text-[#EFD9F7]">

                {/* Top Left - Logo/Home */}
                <div className="absolute top-6 left-6 md:top-12 md:left-12 pointer-events-auto z-60">
                    <Link href="/" className="text-sm md:text-base tracking-[0.2em] hover:opacity-70 transition-opacity font-serif">
                        HIGH TABLE
                    </Link>
                </div>

                {/* Top Right - Menu Trigger */}
                <div className="absolute top-6 right-6 md:top-12 md:right-12 pointer-events-auto z-60">
                    <button
                        onClick={toggleMenu}
                        className="w-12 h-12 flex flex-col justify-center items-end gap-1.5 group cursor-pointer"
                        aria-label="Toggle Menu"
                    >
                        <span className={`block h-0.5 bg-[#C78D17] transition-all duration-500 ease-out ${isMenuOpen ? 'w-6 rotate-45 translate-y-[3.5px]' : 'w-8 group-hover:w-6'}`} />
                        <span className={`block h-0.5 bg-[#C78D17] transition-all duration-500 ease-out ${isMenuOpen ? 'w-6 -rotate-45 -translate-y-[3.5px]' : 'w-5 group-hover:w-8'}`} />
                    </button>
                </div>
            </nav>

            {/* Offcanvas Menu */}
            <div
                ref={menuRef}
                className="fixed inset-0 bg-[#24003d] z-40 flex items-center justify-center pointer-events-auto"
                style={{ clipPath: 'circle(0% at 100% 0%)' }}
            >
                <div className="flex flex-col items-center gap-8 md:gap-12 text-center pointer-events-auto">
                    {[
                        { name: 'Home', href: '/' },
                        { name: 'About', href: '/about' },
                        { name: 'Application', href: '/application' },
                        { name: 'Members', href: '/members' },
                        { name: 'Contact', href: '/contact' }
                    ].map((item, _index) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            ref={addToRefs}
                            onClick={() => setIsMenuOpen(false)}
                            className="group relative text-4xl md:text-6xl uppercase text-[#EFD9F7] hover:text-[#C78D17] transition-colors tracking-widest opacity-0"
                        >
                            <span className="relative z-10">{item.name}</span>
                            <span className="absolute left-0 -bottom-2 w-full h-0.5 bg-[#C78D17] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-center" />
                        </Link>
                    ))}
                </div>


            </div>
        </>
    );
};

export default HomeNav;
