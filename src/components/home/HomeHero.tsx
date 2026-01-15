'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';

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
        <section className="h-screen w-full relative snap-start flex items-center justify-center overflow-hidden bg-black">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-60"
            >
                <source src="/assets/background-video2.mp4" type="video/mp4" />
            </video>
            {/* <div className="absolute inset-0 bg-[#3D0066]/40" /> */}

            <div className="relative z-10 text-center mix-blend-plus-lighter flex flex-col items-center">
                <h1 ref={titleRef} className="text-[12vw] md:text-[5vw] uppercase text-[#EFD9F7] leading-none opacity-0 will-change-transform">
                    {/* SOVEREIGN */}
                    A World For The Few
                </h1>
                <p ref={subtitleRef} className="my-4 text-[#C78D17] tracking-[0.3em] text-xs md:text-sm uppercase opacity-0 will-change-transform font-light">
                    {/* Territory */}
                    The Elite Club
                </p>
                <Link href='/application/form' ref={buttonRef} className="group relative px-12 py-4 bg-transparent border border-[#C78D17]/30 hover:border-[#C78D17] transition-all duration-500 overflow-hidden cursor-pointer opacity-0 will-change-transform mt-8">
                    <span className="relative z-10 text-[#EFD9F7] text-sm tracking-widest uppercase group-hover:text-[#3D0066] transition-colors cursor-pointer">
                        Request Access
                    </span>
                    <div className="absolute inset-0 bg-[#C78D17] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                </Link>
            </div>
        </section>
    );
};

export default HomeHero;
