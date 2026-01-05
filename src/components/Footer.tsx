'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    return (
        <footer className="bg-[#3D0066] text-[#EFD9F7] pt-20 pb-10 border-t border-[#C78D17]/10 relative z-10">
            {/* Darken overlay for footer separation */}
            <div className="absolute inset-0 bg-black/20 z-[-1]" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                    <div className="div">
                        <h3 className="text-2xl font-serif font-bold text-[#EFD9F7] tracking-wide mb-6">HIGH TABLE</h3>
                        <p className="text-[#EFD9F7]/60 text-sm mb-6 leading-relaxed font-light">
                            The premier digital ecosystem for ultra-high-net-worth individuals, facilitating global connections and exclusive opportunities.
                        </p>
                    </div>

                    <div className='md:justify-self-end'>
                        <h4 className="text-[#C78D17] uppercase tracking-wider text-sm font-semibold mb-6">Platform</h4>
                        <ul className="space-y-4 text-sm text-[#EFD9F7]/60">
                            <li><Link href="#membership" className="hover:text-[#C78D17] transition-colors">Membership</Link></li>
                            <li><Link href="#" className="hover:text-[#C78D17] transition-colors">The Council</Link></li>
                            <li><Link href="#" className="hover:text-[#C78D17] transition-colors">Deal Rooms</Link></li>
                        </ul>
                    </div>

                    <div className='md:justify-self-end'>
                        <h4 className="text-[#C78D17] uppercase tracking-wider text-sm font-semibold mb-6">Legal</h4>
                        <ul className="space-y-4 text-sm text-[#EFD9F7]/60">
                            <li><Link href="#" className="hover:text-[#C78D17] transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-[#C78D17] transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-[#C78D17]/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-[#EFD9F7]/40">
                    <p>&copy; {new Date().getFullYear()} High Table. All rights reserved.</p>
                    <p className="mt-2 md:mt-0">Zero-Trust Architecture • Privacy First</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
