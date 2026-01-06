'use client';

import { useEffect } from 'react';
import Hero from '@/components/Hero';
import Membership from '@/components/Membership';
import About from '@/components/About';
import World from '@/components/World';
import MembersOverview from '@/components/MembersOverview';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Note: MembersOverview might be missing on disk, skipping import for now or will add later.

export default function Home() {

    useEffect(() => {
        // Force scroll to top on load
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="bg-[#3D0066] min-h-screen text-[#EFD9F7] selection:bg-[#C78D17] selection:text-[#3D0066]">
            <Navbar />
            {/* 1. The Entrance */}
            <Hero />

            {/* 5. The Profile (Who is here) */}
            <About />

            {/* 3. The Global Context */}
            <World />


            {/* 4.5 The Table (Members Overview) */}
            <MembersOverview />


            {/* 6. The Gate (Access) */}
            <Membership />
            <Footer />
        </main>
    );
}