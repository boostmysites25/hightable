'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Image Animation
            gsap.fromTo(imageRef.current,
                { y: 50, opacity: 0, clipPath: 'inset(10% 10% 10% 10%)' },
                {
                    y: 0,
                    opacity: 1,
                    clipPath: 'inset(0% 0% 0% 0%)',
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                    }
                }
            );

            // Text Animation
            gsap.fromTo(textRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    delay: 0.3,
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
            {/* Decorational Elements */}

            <div className="container max-w-6xl! mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">

                    {/* Left Column - Arch Image */}
                    <div className="w-full md:w-1/2 relative">
                        <div
                            ref={imageRef}
                            className="relative rounded-tl-full w-full aspect-4/5 md:aspect-3/4 overflow-hidden"
                        >
                            <Image
                                src="/assets/about-interior.png"
                                alt="High Table Atmosphere"
                                fill
                                className="object-cover object-right rounded-tl-full hover:scale-105 transition-transform duration-700 ease-out"
                            />

                        </div>

                        {/* Overlapping Text - "ABOUT" */}
                        <h2 className="absolute -bottom-6 md:-bottom-10 left-1/2 transform -translate-x-1/2 text-5xl md:text-7xl text-[#EFD9F7] z-20 tracking-wide opacity-10 whitespace-nowrap pointer-events-none select-none">
                            ABOUT
                        </h2>
                        <h2 className="absolute -bottom-6 md:-bottom-10 left-1/2 transform -translate-x-1/2 text-5xl md:text-7xl text-[#C78D17] z-20 tracking-wide opacity-100 whitespace-nowrap    ">
                            ABOUT
                        </h2>
                    </div>

                    {/* Right Column - Content */}
                    <div ref={textRef} className="w-full md:w-1/2 text-center md:text-left">
                        <h3 className="text-[#C78D17] uppercase tracking-[0.2em] mb-8 text-sm font-semibold">
                            The Essence
                        </h3>

                        <p className="text-[#EFD9F7]/90 text-lg md:text-xl leading-relaxed font-light mb-10 max-w-lg mx-auto md:mx-0">
                            Founded on the principles of trust and exclusivity, <span className="text-[#EFD9F7] font-normal">High Table</span> is the quintessential gathering space for global leaders and visionaries.
                        </p>

                        <p className="text-[#EFD9F7]/60 text-base leading-relaxed font-light mb-12 max-w-lg mx-auto md:mx-0">
                            Designed for those who shape global industries and drive economic evolution. We are reimagining the legacy of connection in a zero-trust world.
                        </p>

                        <Link
                            href="#membership"
                            className="inline-flex items-center text-[#EFD9F7] hover:text-[#C78D17] uppercase tracking-widest text-sm font-semibold transition-colors group cursor-pointer"
                        >
                            Start Application <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;
