'use client';

import React from 'react';
import Image from 'next/image';
import ReCAPTCHA from 'react-google-recaptcha';
// import { InputGroup } from '../FormComponents';

const HomeMembers = () => {
    const [captchaVerified, setCaptchaVerified] = React.useState(false);
    const recaptchaRef = React.useRef<ReCAPTCHA>(null);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        if (!captchaVerified) {
            alert("Please verify you are not a robot");
            return;
        }

        // Proceed with login logic here
        console.log("Login submitted");
    };

    const onCaptchaChange = (value: string | null) => {
        setCaptchaVerified(!!value);
    };

    // Style Constants
    const LABEL_CLASS = "text-[#EFD9F7] text-xs font-bold uppercase tracking-wider";
    const INPUT_CLASS = "w-full bg-transparent border border-[#EFD9F7]/20 p-4 text-[#EFD9F7] focus:border-[#C78D17] outline-none transition-colors rounded-sm";
    const GROUP_CLASS = "flex flex-col gap-2";

    return (
        <section id="members" className="min-h-screen md:h-screen w-full relative">
            <div className="snap-start w-full min-h-screen md:h-full relative flex items-center justify-center bg-[#3D0066] border-r border-[#C78D17]/10">
                <div className="absolute inset-0 opacity-20">
                    <Image
                        src="/assets/feature-3.png"
                        alt="Board"
                        fill
                        className="object-cover grayscale"
                    />
                </div>
                <div className="relative z-10 text-center max-w-md w-full px-6">
                    <h3 className="text-3xl md:text-4xl uppercase text-[#EFD9F7] mb-8">Members</h3>
                    <form onSubmit={handleLogin} className="space-y-6 text-left p-8 border border-[#EFD9F7]/10 backdrop-blur-sm">

                        <div className={GROUP_CLASS}>
                            <label className={LABEL_CLASS}>* Email</label>
                            <input type="email" placeholder="Enter your email" className={INPUT_CLASS} required />
                        </div>

                        <div className={GROUP_CLASS}>
                            <label className={LABEL_CLASS}>* Password</label>
                            <input type="password" placeholder="Enter your password" className={INPUT_CLASS} required />
                        </div>

                        <div className="flex justify-center my-4">
                            <ReCAPTCHA
                                ref={recaptchaRef}
                                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "YOUR_SITE_KEY"}
                                onChange={onCaptchaChange}
                                theme="dark"
                            />
                        </div>

                        <button type="submit" className="w-full bg-[#C78D17] text-[#3D0066] font-bold uppercase tracking-widest py-4 mt-4 hover:bg-[#EFD9F7] transition-colors text-xs">
                            Portal Login
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default HomeMembers;
