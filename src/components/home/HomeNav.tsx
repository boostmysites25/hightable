'use client';

import Link from 'next/link';

const HomeNav = () => {
    return (
        <nav className="fixed inset-0 z-50 pointer-events-none p-6 md:p-12 mix-blend-difference text-[#EFD9F7]">
            {/* Top Left - Logo/Home */}
            <div className="absolute top-6 left-6 md:top-12 md:left-12 pointer-events-auto">
                <a href="/home" className="text-sm md:text-base tracking-[0.2em] hover:opacity-70 transition-opacity">
                    HIGH TABLE
                </a>
            </div>

            {/* Top Right - Members */}
            <div className="absolute top-6 right-6 md:top-12 md:right-12 pointer-events-auto">
                <Link href="#members" className="text-xs md:text-sm uppercase tracking-widest hover:text-[#C78D17] transition-colors">
                    Members
                </Link>
            </div>

            {/* Bottom Left - Application */}
            <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 pointer-events-auto">
                <Link href="#application" className="text-xs md:text-sm uppercase tracking-widest hover:text-[#C78D17] transition-colors">
                    Application
                </Link>
            </div>

            {/* Bottom Right - Contact */}
            <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 pointer-events-auto">
                <Link href="#contact" className="text-xs md:text-sm uppercase tracking-widest hover:text-[#C78D17] transition-colors">
                    Contact
                </Link>
            </div>
        </nav>
    );
};

export default HomeNav;
