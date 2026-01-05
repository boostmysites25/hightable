'use client';

import Image from 'next/image';

const HomeApplication = () => {
    return (
        <section id="application" className="h-screen w-full relative snap-start flex items-center justify-center overflow-hidden bg-[#24003d]">
            <div className="absolute inset-0 opacity-30">
                <Image
                    src="/assets/feature-2.png"
                    alt="The Gate"
                    fill
                    className="object-cover"
                />
            </div>

            <div className="relative z-10 text-center px-6">
                <h2 className="text-[#C78D17] text-xs uppercase tracking-[0.4em] mb-6">The Gate</h2>
                <h3 className="text-5xl md:text-7xl uppercase text-[#EFD9F7] mb-12">
                    Evaluation
                </h3>
                <button className="group relative px-12 py-4 bg-transparent border border-[#C78D17]/30 hover:border-[#C78D17] transition-all duration-500 overflow-hidden">
                    <span className="relative z-10 text-[#EFD9F7] text-sm tracking-widest uppercase group-hover:text-[#3D0066] transition-colors cursor-pointer">
                        Request Access
                    </span>
                    <div className="absolute inset-0 bg-[#C78D17] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                </button>
            </div>
        </section>
    );
};

export default HomeApplication;
