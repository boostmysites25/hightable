'use client';

import React, { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TierCard = ({ name, price, netWorth, features, isHighligted }: { name: string, price: string, netWorth: string, features: string[], isHighligted?: boolean }) => (
    <div className={`p-10 border transition-all duration-300 flex flex-col items-center text-center h-full ${isHighligted ? 'bg-[#C78D17] border-[#C78D17] transform md:-translate-y-6 shadow-2xl shadow-[#C78D17]/20 text-[#3D0066]' : 'bg-[#3D0066] border-[#C78D17]/20 hover:border-[#C78D17]/50 text-[#EFD9F7]'}`}>
        <h3 className={`text-xl font-serif tracking-widest uppercase mb-2 ${isHighligted ? 'text-[#3D0066]' : 'text-[#C78D17]'}`}>{name}</h3>
        <div className={`text-sm mb-8 font-light ${isHighligted ? 'text-[#3D0066]/80' : 'text-[#EFD9F7]/60'}`}>Target Net Worth: {netWorth}</div>

        <div className={`text-4xl font-serif mb-10 ${isHighligted ? 'text-[#3D0066]' : 'text-[#EFD9F7]'}`}>
            {price} <span className="text-lg font-sans font-light opacity-60">/ year</span>
        </div>

        <ul className="flex-1 space-y-4 mb-10 w-full text-left">
            {features.map((feature, idx) => (
                <li key={idx} className={`flex items-start text-sm font-light ${isHighligted ? 'text-[#3D0066]' : 'text-[#EFD9F7]/80'}`}>
                    <Check size={16} className={`mr-3 mt-1 shrink-0 ${isHighligted ? 'text-[#3D0066]' : 'text-[#C78D17]'}`} />
                    {feature}
                </li>
            ))}
        </ul>

        <button className={`w-full py-4 text-xs uppercase tracking-widest font-semibold border transition-all duration-300 ${isHighligted ? 'border-[#3D0066] text-[#3D0066] hover:bg-[#3D0066] hover:text-[#C78D17]' : 'border-[#C78D17] text-[#C78D17] hover:bg-[#C78D17] hover:text-[#3D0066]'}`}>
            Request Evaluation
        </button>
    </div>
);

const Membership = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            const ctx = gsap.context(() => {
                gsap.fromTo('.tier-card',
                    {
                        y: 50,
                        autoAlpha: 0
                    },
                    {
                        y: 0,
                        autoAlpha: 1,
                        duration: 0.8,
                        stagger: 0.2,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse'
                        },
                    }
                );
            }, sectionRef);
            return () => ctx.revert();
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <section id="membership" className="py-24 bg-[#3D0066] relative overflow-hidden" ref={sectionRef}>
            <div className="container mx-auto px-6">
                <div className="text-center mb-20 max-w-2xl mx-auto">
                    <h4 className="text-[#C78D17] uppercase tracking-[0.2em] mb-4 text-sm font-semibold">Selection Process</h4>
                    <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-serif uppercase tracking-wide leading-tight text-[#EFD9F7] mb-6">Access Levels</h2>
                    <p className="text-[#EFD9F7]/70 font-light">
                        Membership is by invitation or verified application only. We maintain strict ratios to ensure the quality of the Sovereign Network.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="tier-card opacity-0">
                        <TierCard
                            name="Private"
                            netWorth="$1M – $10M"
                            price="$5,000"
                            features={[
                                "Access to Deal Room (View Only)",
                                "Quarterly Market Reports",
                                "Digital Concierge",
                                "Standard Verification"
                            ]}
                        />
                    </div>
                    <div className="tier-card opacity-0">
                        <TierCard
                            name="Sovereign"
                            netWorth="$10M – $50M"
                            price="$15,000"
                            isHighligted={true}
                            features={[
                                "Full Deal Room Access",
                                "Monthly Board Meetings",
                                "Sovereign Travel Perks",
                                "Priority Verification",
                                "Personal Account Manager"
                            ]}
                        />
                    </div>
                    <div className="tier-card opacity-0">
                        <TierCard
                            name="Legacy"
                            netWorth="$50M+"
                            price="$50,000"
                            features={[
                                "Global Governance Voting",
                                "Unlimited Board Access",
                                "Deal Room Syndication Rights",
                                "Family Office Structuring",
                                "Anonymous Status Option",
                                "Private Wealth Audit"
                            ]}
                        />
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-[#EFD9F7]/40 text-xs tracking-wide">
                        * Initiation fees apply. All memberships subject to Board approval.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Membership;
