'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';

const tiers = [
    {
        id: 'axis',
        title: 'AXIS',
        subtitle: 'AXIS · Tier I Access',
        description: 'For individuals entering positions of sustained influence.',
        note: 'Extended upon private review',
        price: 'USD 5,000',
        period: 'Annual Consideration',
        benefits: [
            'Limited access to select Silent Accord environments',
            'Invitation to private convenings, extended selectively',
            'Priority consideration at aligned locations',
            'View-only access to curated private listings'
        ],
        cta: 'Request Consideration',
        image: '/assets/about-interior.png'
    },
    {
        id: 'vault',
        title: 'VAULT',
        subtitle: 'VAULT · Tier II Access',
        description: 'For distinguished leaders with established influence and capital responsibility.',
        note: 'Extended selectively',
        price: 'USD 10,000',
        period: 'Annual Consideration',
        benefits: [
            'Broader access to Silent Accord environments',
            'Participatory access to private listings and discussions',
            'Priority access to private meeting environments',
            'Dedicated liaison for logistical coordination'
        ],
        cta: 'Proceed to Review',
        image: '/assets/feature-2.png'
    },
    {
        id: 'coterie',
        title: 'COTERIE',
        subtitle: 'COTERIE · Tier III Access',
        description: 'For a limited number of principals, subject to specific conditions.',
        note: 'Extended by private invitation',
        price: 'USD 30,000',
        period: 'Annual Consideration',
        benefits: [
            'Unrestricted access to Accord environments, by discretion',
            'Closed-door peer councils',
            'Direct alignment with founding principals',
            'Extended status considerations may be reviewed privately'
        ],
        cta: 'Request Access',
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
                        className={`relative flex-1 flex items-center justify-center cursor-pointer group overflow-hidden border-b border-[#C78D17]/10 last:border-b-0 transition-all duration-500 min-h-[200px]`}
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

                    <p className="text-[#EFD9F7]/80 text-sm md:text-base mb-8 leading-relaxed font-light">
                        {activeTier.description}
                    </p>

                    <div className="mb-8 p-6 border border-[#EFD9F7]/20 bg-[#EFD9F7]/5 rounded-sm backdrop-blur-sm">
                        <div className="flex items-baseline gap-2 mb-1">
                            <p className="text-2xl md:text-4xl text-[#EFD9F7]">{activeTier.price}</p>
                        </div>
                        <p className="text-[#EFD9F7]/50 text-xs tracking-wide">{activeTier.period}</p>
                        <p className="text-[#C78D17]/80 text-xs italic mt-2">{activeTier.note}</p>
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
                    {/* <Link href={`/application/intro?tier=${activeTier.id}`} className="group relative w-full py-5 block text-center bg-transparent border border-[#EFD9F7]/30 hover:border-[#C78D17] transition-all duration-500 overflow-hidden cursor-pointer"> */}
                        <span className="relative z-10 text-[#EFD9F7] text-xs md:text-sm tracking-[0.2em] uppercase group-hover:text-[#3D0066] transition-colors font-semibold">
                            {activeTier.cta}
                        </span>
                        <div className="absolute inset-0 bg-[#C78D17] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                    </Link>

                    {/* GLOBAL DISCLAIMER */}
                    <div className="mt-8 pt-8 border-t border-[#EFD9F7]/10 text-center">
                        <p className="text-[#EFD9F7]/40 text-[10px] uppercase tracking-widest leading-relaxed">
                            The Silent Accord does not offer open access.
                            <br />
                            All access tiers function under private review and may be modified or withdrawn without notice.
                        </p>
                        {/* <Link href="/application/form" className="inline-block mt-4 text-[#C78D17] text-[10px] uppercase tracking-widest hover:text-[#EFD9F7] transition-colors border-b border-transparent hover:border-[#EFD9F7]">
                            Request Access
                        </Link> */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeApplication;
