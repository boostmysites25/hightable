'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';

const tiers = [
    {
        id: 'tier1',
        title: 'Elite',
        subtitle: 'Tier 1 Membership',
        description: 'For emerging leaders with high-growth trajectories.',
        netWorth: 'Target Net Worth: $250k – $600k',
        price: '$5,000',
        period: 'Annual Subscription (Excl. Tax)',
        benefits: [
            'Global Access to High Table properties',
            'Quarterly industry networking mixers',
            'Priority reservations at partner venues',
            'Digital "Deal Room" access (View Only)'
        ],
        image: '/assets/about-interior.png'
    },
    {
        id: 'tier2',
        title: 'Sovereign',
        subtitle: 'Tier 2 Membership',
        description: 'The standard for established visionaries and capital allocators.',
        netWorth: 'Target Net Worth: $600k – $12M',
        price: '$10,000',
        period: 'Annual Subscription (Excl. Tax)',
        benefits: [
            'Global Access to High Table properties',
            'Full "Deal Room" participation',
            'Private boardroom booking privileges',
            'Concierge liaison for travel & lifestyle'
        ],
        image: '/assets/feature-2.png'
    },
    {
        id: 'tier3',
        title: 'Tycoon',
        subtitle: 'Tier 3 Membership',
        description: 'For industry titans who shape markets and build empires.',
        netWorth: 'Target Net Worth: $12M+',
        price: 'Free',
        period: 'Year 1 (Year 2+: $30,000)',
        benefits: [
            'Global Access with +1 Guest privileges',
            'Exclusive "Tycoon" mentorship circles',
            'Direct access to Founding Members',
            'Lifetime status options available'
        ],
        image: '/assets/feature-3.png'
    }
];

const HomeApplication = () => {
    const [activeTier, setActiveTier] = useState(tiers[0]);
    const detailsRef = useRef(null);

    const handleTierChange = (tier: typeof tiers[0]) => {
        if (tier.id === activeTier.id) return;

        // Simple GSAP transition
        const tl = gsap.timeline();

        tl.to(detailsRef.current, {
            opacity: 0,
            y: 10,
            duration: 0.2,
            onComplete: () => setActiveTier(tier)
        })
            .to(detailsRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: 'power2.out'
            });
    };

    return (
        <section id="application" className="min-h-screen w-full relative snap-start flex flex-col md:flex-row bg-[#3D0066] overflow-hidden">

            {/* Left Panel - Selection */}
            <div className="w-full md:w-3/5 relative flex flex-col border-b md:border-b-0 md:border-r border-[#C78D17]/20">
                {tiers.map((tier) => (
                    <div
                        key={tier.id}
                        onClick={() => handleTierChange(tier)}
                        className={`relative flex-1 flex items-center justify-center cursor-pointer group overflow-hidden border-b border-[#C78D17]/10 last:border-b-0 transition-all duration-500`}
                    >
                        {/* Background Texture (Preserved) */}
                        <div className={`absolute inset-0 transition-opacity duration-500 ${activeTier.id === tier.id ? 'opacity-40' : 'opacity-20 group-hover:opacity-30'}`}>
                            <Image
                                src={tier.image}
                                alt="Texture"
                                fill
                                className="object-cover grayscale"
                            />
                            <div className={`absolute inset-0 mix-blend-multiply transition-colors duration-500 ${activeTier.id === tier.id ? 'bg-[#EFD9F7]/20' : 'bg-[#3D0066]/60'}`} />
                        </div>

                        {/* Active Selection Indicator */}
                        {activeTier.id === tier.id && (
                            <>
                                <div className="absolute inset-0 bg-linear-to-r from-[#EFD9F7]/10 to-transparent opacity-50" />
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#C78D17]" />
                            </>
                        )}

                        <h3 className={`relative z-10 text-2xl md:text-3xl uppercase tracking-widest transition-colors duration-300 ${activeTier.id === tier.id ? 'text-[#C78D17]' : 'text-[#EFD9F7]/60 group-hover:text-[#EFD9F7]'}`}>
                            {tier.title}
                        </h3>
                    </div>
                ))}
            </div>

            {/* Right Panel - Details */}
            <div className="w-full md:w-2/5 relative bg-[#3D0066] flex flex-col justify-center p-8 md:p-16">
                <div ref={detailsRef} className="relative z-10 w-full opacity-100">
                    <h4 className="text-[#C78D17] text-xs md:text-sm uppercase tracking-[0.2em] mb-2">{activeTier.subtitle}</h4>
                    <p className="text-[#EFD9F7]/50 text-xs tracking-wider mb-6">{activeTier.netWorth}</p>

                    <p className="text-[#EFD9F7]/80 text-sm md:text-base mb-8 leading-relaxed font-light">
                        {activeTier.description}
                    </p>

                    <div className="mb-8 p-6 border border-[#EFD9F7]/20 bg-[#EFD9F7]/5 rounded-sm backdrop-blur-sm">
                        <div className="flex items-baseline gap-2 mb-1">
                            <p className="text-2xl md:text-4xl text-[#EFD9F7]">{activeTier.price}</p>
                        </div>
                        <p className="text-[#EFD9F7]/50 text-xs tracking-wide">{activeTier.period}</p>
                    </div>

                    <ul className="space-y-4 mb-12">
                        {activeTier.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start gap-4 text-[#EFD9F7]/70 text-sm font-light">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#EFD9F7] shrink-0 opacity-60" />
                                {benefit}
                            </li>
                        ))}
                    </ul>

                    <Link href={`/application/intro?tier=${activeTier.id}`} className="group relative w-full py-5 block text-center bg-transparent border border-[#EFD9F7]/30 hover:border-[#C78D17] transition-all duration-500 overflow-hidden cursor-pointer">
                        <span className="relative z-10 text-[#EFD9F7] text-xs md:text-sm tracking-[0.2em] uppercase group-hover:text-[#3D0066] transition-colors font-semibold">
                            Start Your Journey
                        </span>
                        <div className="absolute inset-0 bg-[#C78D17] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HomeApplication;
