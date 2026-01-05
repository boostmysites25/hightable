'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MemberRow = ({ category, entity, location, since }: { category: string, entity: string, location: string, since: string }) => (
    <div className="member-row flex flex-col md:flex-row items-start md:items-center justify-between py-6 border-b border-[#C78D17]/10 group hover:bg-[#C78D17]/5 transition-colors px-4">
        <div className="w-full md:w-1/4 mb-2 md:mb-0">
            <span className="text-xs uppercase tracking-widest text-[#C78D17]/60 group-hover:text-[#C78D17] transition-colors">{category}</span>
        </div>
        <div className="w-full md:w-1/3 mb-2 md:mb-0">
            <span className="text-lg md:text-xl font-serif text-[#EFD9F7] group-hover:tracking-wide transition-all duration-300">{entity}</span>
        </div>
        <div className="w-full md:w-1/4 mb-2 md:mb-0">
            <span className="text-sm font-light text-[#EFD9F7]/60">{location}</span>
        </div>
        <div className="w-full md:w-auto text-right">
            <div className="inline-flex items-center space-x-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs uppercase tracking-wider text-[#EFD9F7]/40">Active Now</span>
            </div>
        </div>
    </div>
);

const MembersOverview = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            const ctx = gsap.context(() => {
                gsap.fromTo('.member-row',
                    {
                        x: -20,
                        opacity: 0
                    },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 75%',
                        },
                    }
                );
            }, sectionRef);
            return () => ctx.revert();
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section id="members-overview" className="py-24 bg-[#3D0066] relative overflow-hidden" ref={sectionRef}>
            {/* Ambient Light */}
            <div className="absolute bottom-0 left-0 w-1/2 h-full bg-[#C78D17]/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="max-w-xl">
                        <h4 className="text-[#C78D17] uppercase tracking-[0.2em] mb-4 text-sm font-semibold">The Table</h4>
                        <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-serif uppercase tracking-wide leading-tight text-[#EFD9F7] mb-6">
                            Verified Presence
                        </h2>
                        <p className="text-[#EFD9F7]/70 font-light text-lg">
                            We do not disclose names. We confirm caliber. <br />
                            A glimpse into the active Sovereign Network.
                        </p>
                    </div>

                    <div className="text-right">
                        <div className="text-5xl font-serif text-[#C78D17] mb-2">412</div>
                        <div className="text-xs uppercase tracking-widest text-[#EFD9F7]/60">Members Online</div>
                    </div>
                </div>

                <div className="relative border-t border-[#C78D17]/20 backdrop-blur-sm bg-[#3D0066]/50">
                    <MemberRow
                        category="Family Office"
                        entity="Royal Family Office (Undisclosed)"
                        location="Geneva, Switzerland"
                        since="2019"
                    />
                    <MemberRow
                        category="Venture Capital"
                        entity="Tier 1 Tech Vision Fund IV"
                        location="San Francisco, USA"
                        since="2021"
                    />
                    <MemberRow
                        category="Private Equity"
                        entity="Sovereign Infrastructure Grp."
                        location="Dubai, UAE"
                        since="2020"
                    />
                    <MemberRow
                        category="Founder"
                        entity="Unicorn Fintech (Post-IPO)"
                        location="London, UK"
                        since="2022"
                    />
                    <MemberRow
                        category="Real Estate"
                        entity="Global Hospitality Conglomerate"
                        location="Singapore"
                        since="2018"
                    />
                    <MemberRow
                        category="Art & Collectibles"
                        entity="Private Museum Trust"
                        location="Paris, France"
                        since="None"
                    />
                </div>

                <div className="mt-8 flex justify-center">
                    <div className="inline-flex items-center px-4 py-2 bg-[#C78D17]/10 border border-[#C78D17]/20 rounded-full text-xs text-[#C78D17] tracking-widest">
                        <span className="w-2 h-2 rounded-full bg-[#C78D17] mr-3 animate-pulse"></span>
                        LIVE NETWORK ACTIVITY
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MembersOverview;
