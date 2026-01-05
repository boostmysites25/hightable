'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial reveal sequence
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            // 1. Reveal video container (fade in from black)
            tl.fromTo(videoRef.current,
                { opacity: 0, scale: 1.1 },
                { opacity: 1, scale: 1, duration: 2 }
            );

            // 2. Reveal text elements
            tl.fromTo('.hero-text',
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.5, stagger: 0.2 },
                '-=1.0'
            );

            // 3. Subtle continuous movement for the background (parallax feel)
            gsap.to(videoRef.current, {
                y: 50,
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });

        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#3D0066]">
            {/* Background Video/Image Container */}
            <div ref={videoRef} className="absolute inset-0 w-full h-full z-0 opacity-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover z-0"
                >
                    <source src="/assets/background-video.mp4" type="video/mp4" />
                </video>

                {/* Cinematic Overlay/Vignette */}
                <div className="absolute inset-0 bg-black/50 z-10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] opacity-60 z-10" />
            </div>

            {/* Content */}
            <div ref={textRef} className="relative z-20 text-center px-4 max-w-4xl mx-auto">
                <div className="overflow-hidden mb-6">
                    <div className="hero-text text-[#C78D17] text-xs md:text-sm tracking-[0.3em] uppercase font-medium">
                        The Sovereign Territory
                    </div>
                </div>

                <div className="overflow-hidden mb-8">
                    <h1 className="hero-text text-5xl md:text-7xl lg:text-8xl font-serif text-[#EFD9F7] tracking-tight leading-[1.1]">
                        HIGH TABLE
                    </h1>
                </div>

                <div className="overflow-hidden mb-12">
                    <p className="hero-text text-white/70 text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto">
                        An exclusive sanctuary for the architects of the future. <br className="hidden md:block" />
                        Invitation only.
                    </p>
                </div>

                <div className="hero-text">
                    <button className="group relative px-8 py-4 bg-transparent border border-[#C78D17]/50 text-[#C78D17] text-sm tracking-[0.2em] uppercase transition-all duration-500 hover:bg-[#C78D17] hover:text-[#3D0066]">
                        <span className="relative z-10 flex items-center gap-4">
                            Request Access
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                    </button>

                    <div className="mt-8 text-white/30 text-[10px] tracking-widest uppercase">
                        Membership Selection In Progress
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 opacity-50">
                <div className="w-px h-16 bg-linear-to-b from-transparent via-[#EFD9F7] to-transparent" />
            </div>
        </section>
    );
};

export default Hero;
