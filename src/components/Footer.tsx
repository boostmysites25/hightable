'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    return (
        <footer className="bg-[#151221] text-white pt-20 pb-10 border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                    <div className="div">
                        <h3 className="text-2xl  font-bold text-white tracking-widest mb-6">HIGH TABLE</h3>
                        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                            The premier digital ecosystem for ultra-high-net-worth individuals, facilitating global connections and exclusive opportunities.
                        </p>
                    </div>

                    <div className='md:justify-self-end'>
                        <h4 className="text-[#AD986E] uppercase tracking-wider text-sm font-semibold mb-6">Platform</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><Link href="#membership" className="hover:text-white transition-colors">Membership</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">The Council</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Deal Rooms</Link></li>
                        </ul>
                    </div>

                    <div className='md:justify-self-end'>
                        <h4 className="text-[#AD986E] uppercase tracking-wider text-sm font-semibold mb-6">Legal</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
                    <p>&copy; {new Date().getFullYear()} High Table. All rights reserved.</p>
                    <p className="mt-2 md:mt-0">Zero-Trust Architecture • Privacy First</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
