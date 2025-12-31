'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Briefcase, Users, LayoutGrid, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FeatureCard = ({ title, description, icon: Icon, imageSrc, delay }: { title: string, description: string, icon: any, imageSrc: string, delay: number }) => (
    <div className="feature-card relative h-[500px] overflow-hidden border border-[#AD986E]/20 group cursor-pointer">
        {/* Background Image */}
        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
            <Image
                src={imageSrc}
                alt={title}
                fill
                className="object-cover"
            />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-[#151221] via-[#151221]/90 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500" />

        {/* Content */}
        <div className="absolute inset-0 p-8 flex flex-col justify-end">
            <div className="mb-6 text-[#AD986E] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <Icon size={40} strokeWidth={1} />
            </div>

            <h3 className="text-2xl text-white mb-4 uppercase tracking-wider transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                {title}
            </h3>

            <div className="overflow-hidden">
                <p className="text-gray-300 font-light leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    {description}
                </p>
            </div>

            {/* <div className="flex items-center text-[#AD986E] uppercase tracking-wider text-xs font-semibold transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-150">
                Explore <ArrowRight size={14} className="ml-2 group-hover:translate-x-2 transition-transform" />
            </div> */}
        </div>
    </div>
);

const Features = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            const ctx = gsap.context(() => {
                gsap.fromTo('.feature-card',
                    {
                        y: 50,
                        autoAlpha: 0
                    },
                    {
                        y: 0,
                        autoAlpha: 1,
                        duration: 0.8,
                        stagger: 0.2,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse'
                        },
                    }
                );
            }, containerRef);
            return () => ctx.revert();
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="py-24 bg-[#1a162b] relative overflow-hidden" ref={containerRef}>
            <div className="absolute top-0 right-0 w-1/3 h-full bg-[#AD986E]/5 blur-[120px] rounded-full" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <h4 className="text-[#AD986E] uppercase tracking-[0.2em] mb-4 text-sm font-semibold">Our Ecosystem</h4>
                    <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] uppercase tracking-wide leading-tight text-white">The Pillars of High Table</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
                    <FeatureCard
                        title="Strategic Deployments"
                        description="A sanctuary for vetted capital. Discover high-value acquisition and equity opportunities where privacy ensures the integrity of every transaction."
                        icon={Briefcase}
                        imageSrc="/assets/feature-1.png"
                        delay={0}
                    />
                    <FeatureCard
                        title="The Inner Circle"
                        description="Forging alliances with the world's architects. A sovereign network where influence amplifies through trusted, verified connection."
                        icon={Users}
                        imageSrc="/assets/feature-2.png"
                        delay={0.2}
                    />
                    <FeatureCard
                        title="Global Governance"
                        description="Where decisions shape economies. Secure, high-stakes environments designed for the conversations that matter most."
                        icon={LayoutGrid}
                        imageSrc="/assets/feature-3.png"
                        delay={0.4}
                    />
                </div>
            </div>
        </section>
    );
};

export default Features;
