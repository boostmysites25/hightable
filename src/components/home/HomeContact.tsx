'use client';
import { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { SelectGroup } from '../FormComponents';
import { countries } from '@/data/countries';

const HomeContact = () => {
    const [captchaVerified, setCaptchaVerified] = useState(false);
    const recaptchaRef = useRef<ReCAPTCHA>(null);

    const onCaptchaChange = (value: string | null) => {
        setCaptchaVerified(!!value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!captchaVerified) {
            alert("Please verify you are not a robot");
            return;
        }

        console.log("Contact form submitted");
    };
    return (
        <div id="contact" className="snap-start w-full min-h-screen md:h-full relative flex items-center justify-center bg-[var(--background)] p-8" >
            <div className="relative z-10 w-full max-w-2xl">
                <h3 className="text-3xl md:text-4xl uppercase text-[var(--foreground)] mb-8 text-center">Contact</h3>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-1">
                        <input
                            type="text"
                            name="name"
                            required
                            autoComplete="name"
                            placeholder="FULL NAME *"
                            className="w-full bg-transparent border-b border-[var(--foreground)]/20 text-[var(--foreground)] placeholder-[var(--foreground)]/40 py-3 text-sm focus:outline-none focus:border-[var(--gold)] transition-colors"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <input
                            type="email"
                            name="email"
                            required
                            autoComplete="email"
                            placeholder="EMAIL *"
                            className="bg-transparent border-b border-[var(--foreground)]/20 text-[var(--foreground)] placeholder-[var(--foreground)]/40 py-3 text-sm focus:outline-none focus:border-[var(--gold)] transition-colors col-span-2 md:col-span-1"
                        />
                        <div className="col-span-2 md:col-span-1 grid grid-cols-[110px_1fr] gap-2">
                            <div className="">
                                <SelectGroup label="" options={countries.map(c => `${c.code}`)} placeholder="Code" required={false} defaultValue="+1" variant="underline" />
                            </div>
                            <input
                                type="tel"
                                name="phone"
                                required
                                autoComplete="tel"
                                placeholder="PHONE *"
                                className="w-full bg-transparent border-b border-[var(--foreground)]/20 text-[var(--foreground)] placeholder-[var(--foreground)]/40 py-3 text-sm focus:outline-none focus:border-[var(--gold)] transition-colors h-full"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <textarea
                            name="message"
                            required
                            rows={3}
                            placeholder="MESSAGE *"
                            className="w-full bg-transparent border-b border-[var(--foreground)]/20 text-[var(--foreground)] placeholder-[var(--foreground)]/40 py-3 text-sm focus:outline-none focus:border-[var(--gold)] transition-colors resize-none"
                        />
                    </div>

                    {/* Captcha Placeholder */}
                    <div className="flex justify-center my-4">
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "YOUR_SITE_KEY"}
                            onChange={onCaptchaChange}
                            theme="dark"
                        />
                    </div>

                    <button type="submit" className="w-full py-4 bg-[var(--gold)] text-[var(--background)] text-sm uppercase tracking-[0.2em] font-semibold hover:bg-[var(--foreground)] transition-colors cursor-pointer">
                        Send Message
                    </button>

                    <div className="pt-6 text-center border-t border-[var(--foreground)]/10 mt-8">
                        <p className="text-[var(--foreground)]/50 text-xs tracking-widest mb-2">DIRECT INQUIRIES</p>
                        <a href="mailto:office@thesilentaccord.com" className="text-[var(--foreground)] hover:text-[var(--gold)] transition-colors text-sm tracking-wide">
                            office@thesilentaccord.com
                        </a>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default HomeContact
