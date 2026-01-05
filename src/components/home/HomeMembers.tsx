'use client';

import Image from 'next/image';

const HomeMembers = () => {
    return (
        <section id="members" className="min-h-screen md:h-screen w-full relative flex flex-col md:flex-row">
            {/* Members Half */}
            <div className="snap-start w-full md:w-1/2 h-screen md:h-full relative flex items-center justify-center bg-[#3D0066] border-r border-[#C78D17]/10">
                <div className="absolute inset-0 opacity-20">
                    <Image
                        src="/assets/feature-3.png"
                        alt="Board"
                        fill
                        className="object-cover grayscale"
                    />
                </div>
                <div className="relative z-10 text-center">
                    <h3 className="text-3xl md:text-4xl uppercase text-[#EFD9F7] mb-6">Members</h3>
                    <button className="text-[#C78D17] text-sm uppercase tracking-widest border-b border-[#C78D17]/50 hover:border-[#C78D17] pb-1 transition-all cursor-pointer">
                        Portal Login
                    </button>
                </div>
            </div>

            {/* Contact Half */}
            <div id="contact" className="snap-start w-full md:w-1/2 h-screen md:h-full relative flex items-center justify-center bg-[#2a0046] p-8">
                <div className="relative z-10 w-full max-w-md">
                    <h3 className="text-3xl md:text-4xl uppercase text-[#EFD9F7] mb-8 text-center">Contact</h3>

                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-1">
                            <input
                                type="text"
                                placeholder="FULL NAME"
                                className="w-full bg-transparent border-b border-[#EFD9F7]/20 text-[#EFD9F7] placeholder-[#EFD9F7]/40 py-3 text-sm focus:outline-none focus:border-[#C78D17] transition-colors"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <input
                                type="email"
                                placeholder="EMAIL"
                                className="w-full bg-transparent border-b border-[#EFD9F7]/20 text-[#EFD9F7] placeholder-[#EFD9F7]/40 py-3 text-sm focus:outline-none focus:border-[#C78D17] transition-colors"
                            />
                            <input
                                type="tel"
                                placeholder="PHONE"
                                className="w-full bg-transparent border-b border-[#EFD9F7]/20 text-[#EFD9F7] placeholder-[#EFD9F7]/40 py-3 text-sm focus:outline-none focus:border-[#C78D17] transition-colors"
                            />
                        </div>

                        <div className="space-y-1">
                            <textarea
                                rows={3}
                                placeholder="MESSAGE"
                                className="w-full bg-transparent border-b border-[#EFD9F7]/20 text-[#EFD9F7] placeholder-[#EFD9F7]/40 py-3 text-sm focus:outline-none focus:border-[#C78D17] transition-colors resize-none"
                            />
                        </div>

                        {/* Captcha Placeholder */}
                        {/* <div className="flex items-center gap-3 p-3 border border-[#EFD9F7]/10 bg-[#EFD9F7]/5 rounded">
                            <div className="w-5 h-5 border border-[#C78D17] rounded-sm cursor-pointer hover:bg-[#C78D17]/20" />
                            <span className="text-[#EFD9F7]/60 text-xs tracking-wider">I AM NOT A ROBOT</span>
                        </div> */}

                        <button type="submit" className="w-full py-4 bg-[#C78D17] text-[#3D0066] text-sm uppercase tracking-[0.2em] font-semibold hover:bg-[#EFD9F7] transition-colors cursor-pointer">
                            Send Message
                        </button>

                        <div className="pt-6 text-center border-t border-[#EFD9F7]/10 mt-8">
                            <p className="text-[#EFD9F7]/50 text-xs tracking-widest mb-2">DIRECT INQUIRIES</p>
                            <a href="mailto:office@hightable.com" className="text-[#EFD9F7] hover:text-[#C78D17] transition-colors text-sm tracking-wide">
                                office@hightable.com
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default HomeMembers;
