'use client';

import React, { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TierCard = ({ name, price, netWorth, features, isHighligted }: { name: string, price: string, netWorth: string, features: string[], isHighligted?: boolean }) => (
    <div className={`p-10 border transition-all duration-300 flex flex-col items-center text-center h-full ${isHighligted ? 'bg-[#AD986E] border-[#AD986E] transform md:-translate-y-6 shadow-2xl shadow-[#AD986E]/20' : 'bg-[#201B35] border-[#AD986E]/20 hover:border-[#AD986E]/60'}`}>
        <h3 className={`text-xl tracking-widest uppercase mb-2 ${isHighligted ? 'text-[#201B35]' : 'text-[#AD986E]'}`}>{name}</h3>
        <div className={`text-sm mb-8 font-light ${isHighligted ? 'text-[#201B35]/80' : 'text-gray-400'}`}>Target Net Worth: {netWorth}</div>

        <div className={`text-4xl  mb-10 ${isHighligted ? 'text-[#201B35]' : 'text-white'}`}>
            {price} <span className="text-lg  font-light opacity-60">/ year</span>
        </div>

        <ul className="flex-1 space-y-4 mb-10 w-full text-left">
            {features.map((feature, idx) => (
                <li key={idx} className={`flex items-start text-sm ${isHighligted ? 'text-[#201B35]' : 'text-gray-300'}`}>
                    <Check size={16} className={`mr-3 mt-1 shrink-0 ${isHighligted ? 'text-[#201B35]' : 'text-[#AD986E]'}`} />
                    {feature}
                </li>
            ))}
        </ul>

        <button className={`btn w-full py-4 text-sm font-semibold ${isHighligted ? 'btn-dark-gold' : 'btn-outline-gold'}`}>
            Request Access
        </button>
    </div>
);

const Membership = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.tier-card',
                {
                    y: 100,
                    autoAlpha: 0
                },
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 1,
                    stagger: 0.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="membership" className="py-24 bg-[#201B35] relative" ref={sectionRef}>
            <div className="container mx-auto px-6">
                <div className="text-center mb-20 max-w-2xl mx-auto">
                    <h4 className="text-[#AD986E] uppercase tracking-[0.2em] mb-4 text-sm font-semibold">Exclusivity Defined</h4>
                    <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] uppercase tracking-wide leading-tight text-white mb-6">Membership Tiers</h2>
                    <p className="text-gray-400 font-light">
                        Designed for those who shape the world. Select the tier that matches your global footprint and asset portfolio.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="tier-card opacity-0">
                        <TierCard
                            name="Elite (Tier 1)"
                            netWorth="$250,000 – $600,000"
                            price="$5,000"
                            features={[
                                "Access to Private Deal Rooms (View Only)",
                                "Basic Council Networking",
                                "1 Boardroom Seat / Month",
                                "Standard Identity Verification"
                            ]}
                        />
                    </div>
                    <div className="tier-card opacity-0">
                        <TierCard
                            name="Sovereign (Tier 2)"
                            netWorth="$600,000 – $12M"
                            price="$10,000"
                            isHighligted={true}
                            features={[
                                "Full Access to Deal Rooms (Create & View)",
                                "Priority Council Access",
                                "Unlimited Boardroom Seats",
                                "Global KYC & Enhanced Due Diligence",
                                "Concierge Onboarding"
                            ]}
                        />
                    </div>
                    <div className="tier-card opacity-0">
                        <TierCard
                            name="Tycoon (Tier 3)"
                            netWorth="$12M+"
                            price="$30,000"
                            features={[
                                "All Sovereign Privileges",
                                "Anonymous Inner Circle Access",
                                "Admin-Level Deal Approval Priority",
                                "First Year Free (Invitation Only)",
                                "Dedicated Account Manager",
                                "Private Wealth Audit"
                            ]}
                        />
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-gray-500 text-sm">
                        * All pricing is exclusive of local taxes (GST/VAT). Registration fee of $250 USD applies to all applicants.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Membership;
