'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const World = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.world-text',
                { y: 30, autoAlpha: 0 },
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 1,
                    stagger: 0.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 md:py-32 bg-[#3D0066] relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] md:w-[800px] h-[400px] bg-[#C78D17]/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="container mx-auto px-6 max-w-4xl text-center">

                <h2 className="world-text text-3xl md:text-4xl lg:text-[2.75rem] font-serif uppercase tracking-wide text-[#EFD9F7] mb-8 font-light">
                    A World For The Few
                </h2>

                {/* Decorative Divider logic: Circle + Line */}
                <div className="world-text flex items-center justify-center gap-4 mb-12 opacity-50">
                    <div className="w-3 h-3 rounded-full border border-[#C78D17]" />
                    <div className="w-24 h-px bg-[#C78D17]" />
                </div>

                <div className="space-y-8 text-[#EFD9F7]/60 font-light leading-relaxed text-lg md:text-xl">
                    <p className="world-text">
                        To belong to High Table is to join a global community of vanguards and visionaries.
                    </p>
                    <p className="world-text">
                        This exclusive private members' club is reserved for the world's most remarkable individuals. Within High Table, you can connect, engage, and create the extraordinary.
                    </p>
                    <p className="world-text">
                        Discover a realm of meticulously curated opportunities, exquisite alliances, and unparalleled networking — with privileged access to peer communities that shape the future.
                    </p>
                </div>

            </div>
        </section>
    );
};

export default World;
