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
        <section ref={containerRef} className="py-32 bg-[#1a162b] relative overflow-hidden">
            {/* Background ambience */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#AD986E]/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row gap-12 md:gap-24">
                    {/* Visual Anchor - Vertical Line */}
                    <div className="hidden md:flex flex-col items-center w-12 pt-4 relative">
                        <div className="w-3 h-3 rounded-full bg-[#AD986E] mb-4" />
                        <div ref={lineRef} className="w-px bg-linear-to-b from-[#AD986E] to-transparent opacity-50 grow" />
                    </div>

                    <div className="flex-1">
                        <div className="purpose-text">
                            <h4 className="text-[#AD986E] uppercase tracking-[0.2em] mb-6 text-sm font-semibold">The Purpose</h4>
                            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] uppercase tracking-wide text-white mb-8 leading-tight">
                                Connection Without <br />
                                <span className="text-[#AD986E]">Compromise</span>
                            </h2>
                        </div>

                        <div className="purpose-text space-y-8 text-lg font-light leading-relaxed text-gray-300 max-w-2xl">
                            <p>
                                At the pinnacle of success, the world becomes paradoxically smaller. True peers are few, and spaces for genuine, unguarded collaboration are rare.
                            </p>
                            <p>
                                High Table exists to solve the isolation of excellence. We are not just a platform; we are a sovereign digital territory where trust is the currency and discretion is the law.
                            </p>
                            <div className="pl-6 border-l-2 border-[#AD986E]/30 italic text-white/80">
                                "To empower the world's architects to build the future, together, in absolute confidence."
                            </div>
                        </div>
                    </div>

                    {/* Right side stats or abstract element */}
                    <div className="md:w-1/3 flex items-center justify-center purpose-text">
                        <div className="grid grid-cols-1 gap-12 text-center md:text-left">
                            <div>
                                <div className="text-4xl md:text-5xl uppercase text-white mb-2">Zero</div>
                                <div className="text-xs uppercase tracking-widest text-[#AD986E]">Trust Architecture</div>
                            </div>
                            <div>
                                <div className="text-4xl md:text-5xl text-white mb-2">100%</div>
                                <div className="text-xs uppercase tracking-widest text-[#AD986E]">Verified Members</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Purpose;
