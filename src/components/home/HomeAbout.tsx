'use client';

import Image from 'next/image';

const HomeAbout = () => {
    return (
        <section id="about" className="h-screen w-full relative snap-start flex items-center justify-center overflow-hidden bg-[#3D0066]">
            <div className="absolute inset-0 opacity-100 brightness-[0.70]">
                <Image
                    src="/assets/feature-1.jpg"
                    alt="The Sanctuary"
                    fill
                    className="object-cover grayscale"
                />
            </div>
            {/* <div className="absolute inset-0 bg-linear-to-b from-[#3D0066] via-transparent to-[#3D0066] opacity-90" /> */}

            <div className="relative z-10 container mx-auto px-6 md:px-24">
                <div className="max-w-4xl">
                    <h2 className="text-4xl md:text-6xl uppercase text-[#EFD9F7] mb-8 leading-tight">
                        Reserved for the <br />
                        <span className="text-[#C78D17]">Few.</span>
                    </h2>
                    <p className="text-[#EFD9F7]/80 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
                        Beyond the commons lies an exclusive domain of discretion. <br />
                        The Silent Accord exists to preserve trust among those who already govern outcomes.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default HomeAbout;
