'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import ReCAPTCHA from 'react-google-recaptcha';

type ViewState = 'ACCESS' | 'ASSISTANCE' | 'CONFIRMATION';

const HomeMembers = () => {
    const [view, setView] = useState<ViewState>('ACCESS');
    const [captchaVerified, setCaptchaVerified] = useState(false);
    const [error, setError] = useState('');
    const recaptchaRef = useRef<ReCAPTCHA>(null);

    // Form States
    const [email, setEmail] = useState('');
    const [accessKey, setAccessKey] = useState('');

    const handleAccess = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!captchaVerified) {
            // Quietly return or handle invisible captcha execution
            // For invisible, we usually execute ref.current.execute()
            // But if user wants "Do not expose CAPTCHA visually", standard generic alert is fine or just fail silently
            // For now, let's assume successful verification for flow
        }

        // Mock Validation
        if (email && accessKey) {
            // Simulate failure
            setError('Access not recognised.');
        } else {
            setError('Access is restricted.');
        }
    };

    const handleAssistance = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Mock API call
        if (email) {
            setView('CONFIRMATION');
        } else {
            setError('No matching access record found.');
        }
    };

    const onCaptchaChange = (value: string | null) => {
        setCaptchaVerified(!!value);
    };

    // Shared Styles
    const LABEL_CLASS = "text-[#EFD9F7]/60 text-[12px] uppercase tracking-widest font-semibold mb-2 block";
    const INPUT_CLASS = "w-full bg-[#EFD9F7]/5 border border-[#EFD9F7]/10 p-4 text-[#EFD9F7] placeholder-[#EFD9F7]/50 focus:border-[#C78D17]/50 outline-none transition-colors rounded-sm text-sm";
    const GROUP_CLASS = "flex flex-col mb-6";
    const BUTTON_CLASS = "w-full bg-[#C78D17] text-[#3D0066] font-bold uppercase tracking-widest py-4 hover:bg-[#EFD9F7] transition-colors text-sm";

    return (
        <section id="members" className="min-h-screen md:h-screen w-full relative">
            <div className="snap-start w-full min-h-screen md:h-full relative flex items-center justify-center bg-[#3D0066] brightness-90 border-r border-[#C78D17]/10">
                <div className="absolute inset-0 opacity-15">
                    <Image
                        src="/assets/feature-3.png"
                        alt="Restricted Environment"
                        fill
                        className="object-cover grayscale mix-blend-multiply"
                    />
                </div>

                <div className="relative z-10 text-center max-w-md w-full px-8">

                    {/* VIEW: PRIVATE ACCESS */}
                    {view === 'ACCESS' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <h3 className="text-2xl uppercase text-[#f1f1f1] tracking-widest mb-12">Private Access</h3>

                            <form onSubmit={handleAccess} className="text-left">
                                <div className={GROUP_CLASS}>
                                    <label className={LABEL_CLASS}>Authorized Email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="As registered"
                                        className={INPUT_CLASS}
                                        required
                                    />
                                </div>

                                <div className={GROUP_CLASS}>
                                    <label className={LABEL_CLASS}>Access Key</label>
                                    <input
                                        type="password"
                                        value={accessKey}
                                        onChange={(e) => setAccessKey(e.target.value)}
                                        placeholder="Confidential"
                                        className={INPUT_CLASS}
                                        required
                                    />
                                </div>

                                {error && <p className="text-red-400 text-sm uppercase tracking-wider mb-6 text-center">{error}</p>}

                                <button type="submit" className={BUTTON_CLASS}>
                                    Enter
                                </button>
                            </form>

                            <div className="mt-12 space-y-8">
                                <p className="text-[#EFD9F7]/70 text-sm tracking-widest leading-relaxed">
                                    Access is restricted to authorized participants.
                                    <br />
                                    All activity is monitored discreetly.
                                </p>

                                <button
                                    onClick={() => { setView('ASSISTANCE'); setError(''); }}
                                    className="text-[#EFD9F7]/50 hover:text-[#C78D17] text-[12px] uppercase tracking-widest transition-colors border-b border-[#EFD9F7]/50 hover:border-[#C78D17] pb-0.5 cursor-pointer"
                                >
                                    Access Assistance
                                </button>
                            </div>
                        </div>
                    )}

                    {/* VIEW: ACCESS ASSISTANCE */}
                    {view === 'ASSISTANCE' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <h3 className="text-xl uppercase text-[#EFD9F7] tracking-widest mb-4">Access Assistance</h3>
                            <p className="text-[#EFD9F7]/40 text-sm mb-12 font-light">
                                This process is available only to registered participants.
                            </p>

                            <form onSubmit={handleAssistance} className="text-left">
                                <div className={GROUP_CLASS}>
                                    <label className={LABEL_CLASS}>Authorised Email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="As registered"
                                        className={INPUT_CLASS}
                                        required
                                    />
                                </div>

                                {error && <p className="text-red-400 text-sm uppercase tracking-wider mb-6 text-center">{error}</p>}

                                <button type="submit" className={BUTTON_CLASS}>
                                    Request Assistance
                                </button>
                            </form>

                            <div className="mt-12">
                                <button
                                    onClick={() => { setView('ACCESS'); setError(''); }}
                                    className="text-[#EFD9F7]/60 hover:text-[#EFD9F7] text-sm uppercase tracking-wide mb-8 transition-colors cursor-pointer"
                                >
                                    Return to Access
                                </button>

                                <p className="text-[#EFD9F7]/50 text-[12px] uppercase tracking-widest">
                                    Access credentials are not issued or reset automatically.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* VIEW: CONFIRMATION */}
                    {view === 'CONFIRMATION' && (
                        <div className="animate-in fade-in zoom-in-95 duration-700 py-12">
                            <div className="w-12 h-12 border border-[#C78D17] rounded-full flex items-center justify-center mx-auto mb-8 text-[#C78D17]">
                                ✓
                            </div>
                            <h3 className="text-lg uppercase text-[#EFD9F7] tracking-widest mb-6">Request Received</h3>
                            <p className="text-[#EFD9F7]/60 text-sm leading-relaxed mb-12">
                                Your request has been received.
                                <br />
                                If appropriate, further instructions will be issued privately.
                            </p>

                            <button
                                onClick={() => { setView('ACCESS'); setEmail(''); setAccessKey(''); }}
                                className="text-[#C78D17] hover:text-[#EFD9F7] text-sm uppercase tracking-widest transition-colors"
                            >
                                Return
                            </button>
                        </div>
                    )}

                    {/* Invisible ReCAPTCHA */}
                    <div className="absolute opacity-0 pointer-events-none">
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "YOUR_SITE_KEY"}
                            onChange={onCaptchaChange}
                            theme="dark"
                            size="invisible"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeMembers;
