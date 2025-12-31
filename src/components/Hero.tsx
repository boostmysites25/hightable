'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Hero = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline();

        if (textRef.current) {
            tl.fromTo(
                textRef.current.children,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out', delay: 0.5 }
            );
        }
    }, []);

    return (
        <div ref={heroRef} className="relative h-screen w-full overflow-hidden overflow-x-hidden">
            {/* Background Video/Image */}
            <div className="absolute inset-0 w-full h-full">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover scale-105"
                >
                    <source src="/assets/background-video.mp4" type="video/mp4" />
                </video>
            </div>

            {/* Content */}
            <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-center items-center text-center">
                <div ref={textRef} className="max-w-4xl">
                    {/* <h2 className="text-[#AD986E] text-sm md:text-base uppercase tracking-[0.3em] mb-4">
                        Exclusive Ecosystem for UHNI
                    </h2> */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl text-white mb-8 tracking-wide leading-tight uppercase">
                        Unlock The
                        <span className=""> Exceptional</span>
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed">
                        The High Table is the world's most exclusive circle for ultra-high-net-worth individuals, offering private deal rooms, strategic alliances, and elite networking.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <button className="btn btn-primary btn-lg">
                            Request Invitation
                        </button>
                        <button className="btn btn-secondary btn-lg">
                            Explore Whispers
                        </button>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
                <div className="w-px h-16 bg-white/20 relative">
                    <div className="absolute top-0 w-full h-1/2 bg-[#AD986E] animate-scroll-down"></div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
