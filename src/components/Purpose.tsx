'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Purpose = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate the vertical line expanding
            gsap.fromTo(lineRef.current,
                { height: 0 },
                {
                    height: '100%',
                    duration: 1.5,
                    ease: 'power3.inOut',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 80%',
                        end: 'bottom 80%',
                        scrub: 0.5
                    }
                }
            );

            // Fade in text blocks
            gsap.fromTo('.purpose-text',
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.3,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 70%',
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} id="purpose" className="py-32 bg-[#3D0066] relative overflow-hidden">
            {/* Background ambience */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] md:w-[800px] h-[400px] bg-[#C78D17]/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row gap-12 md:gap-24">
                    {/* Visual Anchor - Vertical Line */}
                    <div className="hidden md:flex flex-col items-center w-12 pt-4 relative">
                        <div className="w-3 h-3 rounded-full bg-[#C78D17] mb-4" />
                        <div ref={lineRef} className="w-px bg-linear-to-b from-[#C78D17] to-transparent opacity-50 grow" />
                    </div>

                    <div className="flex-1">
                        <div className="purpose-text">
                            <h4 className="text-[#C78D17] uppercase tracking-[0.2em] mb-6 text-sm font-semibold">The Mission</h4>
                            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-serif text-[#EFD9F7] mb-8 leading-tight">
                                A Sovereign <br />
                                <span className="text-[#C78D17]">Digital Territory</span>
                            </h2>
                        </div>

                        <div className="purpose-text space-y-8 text-lg font-light leading-relaxed text-[#EFD9F7]/80 max-w-2xl">
                            <p>
                                At the highest levels of influence, privacy is the ultimate luxury. The world is noisy, open, and exposed. High Table is the antidote.
                            </p>
                            <p>
                                We have constructed a closed ecosystem for those who shape the future. No noise. No exposure. Just pure, verified connection in a zero-trust environment.
                            </p>
                            <div className="pl-6 border-l-2 border-[#C78D17]/30 italic text-white/90">
                                "The only space where the world's architects can speak freely."
                            </div>
                        </div>
                    </div>

                    {/* Right side stats or abstract element */}
                    <div className="md:w-1/3 flex items-center justify-center purpose-text">
                        <div className="grid grid-cols-1 gap-12 text-center md:text-left">
                            <div className="p-8 border border-[#C78D17]/10 bg-[#C78D17]/5 backdrop-blur-sm">
                                <div className="text-4xl md:text-5xl font-serif text-[#EFD9F7] mb-2">Zero</div>
                                <div className="text-xs uppercase tracking-widest text-[#C78D17]">Trust Architecture</div>
                            </div>
                            <div className="p-8 border border-[#C78D17]/10 bg-[#C78D17]/5 backdrop-blur-sm">
                                <div className="text-4xl md:text-5xl font-serif text-[#EFD9F7] mb-2">100%</div>
                                <div className="text-xs uppercase tracking-widest text-[#C78D17]">Verified Access</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Purpose;
