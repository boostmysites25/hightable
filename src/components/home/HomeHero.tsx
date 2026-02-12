'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import Sparkles from '../ui/Sparkles';

const HomeHero = () => {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.fromTo(titleRef.current,
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.5, delay: 0.5 }
        )
            .fromTo(subtitleRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 1 },
                "-=1"
            )
            .fromTo(buttonRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 1 },
                "-=0.5"
            );
    }, []);

    return (
        <section className="h-screen w-full relative snap-start flex items-center justify-center overflow-hidden bg-[var(--background)]">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover brightness-60"
            >
                <source src="/assets/background-video2.mp4" type="video/mp4" />
            </video>

            <Sparkles count={40} minSize={10} maxSize={15} className="z-10 opacity-70" />
            <div className="relative z-20 text-center flex flex-col items-center">
                <h1 ref={titleRef} className="text-[10vw] md:text-[5vw] uppercase text-[var(--foreground)] leading-none opacity-0 will-change-transform tracking-wider drop-shadow-lg">
                    {/* SOVEREIGN */}
                    A World For The Few
                </h1>
                <p ref={subtitleRef} className="my-6 text-[var(--gold)] tracking-[0.4em] text-xs md:text-sm uppercase opacity-0 will-change-transform font-light via-white to-[var(--gold)] bg-[length:200%_auto]">
                    The Inner Circle
                </p>
                <Link href='/application/form' ref={buttonRef} className="group relative px-12 py-4 bg-transparent border border-[var(--gold)]/30 hover:border-[var(--gold)] transition-all duration-500 overflow-hidden cursor-pointer opacity-0 will-change-transform mt-8 rounded-sm">
                    <span className="relative z-10 text-[var(--foreground)] text-sm tracking-widest uppercase group-hover:text-[var(--background)] transition-colors cursor-pointer font-semibold">
                        Request Access
                    </span>
                    <div className="absolute inset-0 bg-[var(--gold)] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                </Link>
            </div>
        </section>
    );
};

export default HomeHero;
