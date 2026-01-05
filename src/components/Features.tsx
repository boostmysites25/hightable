'use client';

import React from 'react';
import Image from 'next/image';
import { Briefcase, Users, Shield } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// Feature Data
const baseFeatures = [
    {
        title: "The Deal Room",
        description: "Direct access to off-market opportunities. Venture capital, real estate, and private equity deployments vetted for high-yield potential.",
        icon: Briefcase,
        imageSrc: "/assets/feature-1.png"
    },
    {
        title: "Client Experiences",
        description: "The Inner Circle. Curated gatherings, private galas, and experiential retreats designed to foster deep, high-trust relationships.",
        icon: Users,
        imageSrc: "/assets/feature-2.png"
    },
    {
        title: "Board Meetings",
        description: "Global Governance. A secure, digital boardroom architecture for high-stakes decision making and structured council interactions.",
        icon: Shield,
        imageSrc: "/assets/feature-3.png"
    }
];

// Duplicate for smooth loop
const features = [...baseFeatures, ...baseFeatures, ...baseFeatures];

const Features = () => {
    return (
        <section className="py-24 bg-[#3D0066] relative overflow-hidden flex flex-col justify-center">

            <div className="container mx-auto px-6 mb-12 relative z-20 text-center">
                <h4 className="text-[#C78D17] uppercase tracking-[0.2em] mb-4 text-sm font-semibold">The Utility</h4>
                <h2 className="text-3xl md:text-5xl font-serif text-[#EFD9F7] tracking-wide">
                    Sovereign Systems
                </h2>
            </div>

            {/* Slider Container - Swiper */}
            <div className="w-full relative z-10 flex justify-center">
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    initialSlide={1}
                    loop={true}
                    speed={800}
                    spaceBetween={40}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 200,
                        modifier: 1,
                        slideShadows: false,
                    }}
                    pagination={{ clickable: true, dynamicBullets: true }}
                    modules={[EffectCoverflow, Pagination, Autoplay]}
                    className="swiper_container pb-12! w-full"
                    breakpoints={{
                        640: {
                            slidesPerView: 'auto',
                            spaceBetween: 20
                        },
                        768: {
                            slidesPerView: 'auto',
                            spaceBetween: 30
                        },
                        1024: {
                            slidesPerView: 'auto',
                            spaceBetween: 40
                        },
                    }}
                >
                    {features.map((item, index) => (
                        <SwiperSlide key={index} className="w-[85%]! md:w-[900px]! aspect-video relative transition-all duration-500 rounded-xl overflow-hidden self-center">
                            {({ isActive }) => (
                                <div className={`relative w-full h-full border transition-all duration-500 ${isActive ? 'border-[#C78D17]/40 shadow-2xl shadow-[#C78D17]/10 scale-100 opacity-100' : 'border-[#C78D17]/10 scale-90 opacity-40 grayscale'}`}>
                                    {/* Image */}
                                    <Image
                                        src={item.imageSrc}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                    />

                                    {/* Gradient Overlay */}
                                    <div className={`absolute inset-0 bg-linear-to-t from-[#3D0066] via-[#3D0066]/20 to-transparent ${isActive ? 'opacity-80' : 'opacity-90'}`} />

                                    {/* Content */}
                                    <div className={`absolute bottom-0 left-0 w-full p-6 md:p-10 transition-all duration-500 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                                        <div className="flex items-center gap-4 mb-3 text-[#C78D17]">
                                            <item.icon size={28} strokeWidth={1} />
                                            <div className="h-px w-12 bg-[#C78D17]/50" />
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-serif text-[#EFD9F7] mb-2">{item.title}</h3>
                                        <p className="text-[#EFD9F7]/70 font-light leading-relaxed max-w-2xl text-sm md:text-base">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Custom Styles for Swiper Pagination to match Gold theme */}
            <style jsx global>{`
                .swiper-pagination-bullet {
                    background: #C78D17 !important;
                    opacity: 0.2;
                }
                .swiper-pagination-bullet-active {
                    opacity: 1;
                    width: 24px;
                    border-radius: 4px;
                    transition: all 0.3s ease;
                }
            `}</style>
        </section>
    );
};

export default Features;
