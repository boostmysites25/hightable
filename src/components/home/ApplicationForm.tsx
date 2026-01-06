'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { InputGroup, SelectGroup, TextAreaGroup, FileUpload } from '../FormComponents';
import { countries } from '@/data/countries';

const ApplicationForm = () => {
    const searchParams = useSearchParams();
    const initialTier = searchParams.get('tier') || 'tier-1';
    const [step, setStep] = useState(1);
    const [selectedTier, setSelectedTier] = useState(initialTier);
    const [consent, setConsent] = useState(false);

    const handleNext = () => setStep(prev => prev + 1);
    const handlePrev = () => setStep(prev => prev - 1);

    return (
        <section className="min-h-screen w-full bg-[#3D0066] text-[#EFD9F7] flex flex-col items-center p-6 md:p-24 relative">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-[#000000]/40 to-transparent pointer-events-none" />

            <div className="max-w-5xl w-full relative z-10">

                {/* Header */}
                <div className="mb-12 flex justify-between items-end border-b border-[#C78D17]/30 pb-6">
                    <div>
                        <h1 className="text-3xl uppercase tracking-wide text-[#EFD9F7]">Membership Application - High Table</h1>
                    </div>
                    <div className="text-[#C78D17] text-sm font-semibold tracking-widest">
                        Step {step} of 3
                    </div>
                </div>

                {/* Form Content */}
                <div className="space-y-16 animate-in fade-in duration-700">

                    {/* STEP 1 */}
                    {step === 1 && (
                        <>
                            {/* Personal Information */}
                            <div className="space-y-8">
                                <h2 className="text-[#EFD9F7] text-xl uppercase tracking-wide">Membership Application</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <InputGroup label="First Name" />
                                    <InputGroup label="Middle Name" required={false} />
                                    <InputGroup label="Last Name" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <InputGroup label="Date of Birth" type="date" />
                                    <SelectGroup label="Gender" options={['Male', 'Female', 'Other', 'Prefer not to say']} />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <InputGroup label="Instagram" required={false} />
                                    <InputGroup label="Email Address" type="email" />
                                    <div className="grid grid-cols-[140px_1fr] gap-2">
                                        <SelectGroup label="Code" options={countries.map(c => `${c.code} (${c.name})`)} placeholder="Code" />
                                        <InputGroup label="Phone Number" type="tel" placeholder="" />
                                    </div>
                                </div>
                            </div>


                            {/* Profile Photo */}
                            <div className="space-y-8 pt-8 border-t border-[#EFD9F7]/10">
                                <h2 className="text-[#EFD9F7] text-xl uppercase tracking-wide">Your Profile Photo</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <FileUpload label="Profile Picture" subtext="Please provide a clear, recent headshot in high-resolution" />
                                    <FileUpload label="Driver License or Govt Issued ID" subtext="Please provide a clear photo of your ID" />
                                </div>
                            </div>

                            {/* Address */}
                            <div className="space-y-8 pt-8 border-t border-[#EFD9F7]/10">
                                <h2 className="text-[#EFD9F7]/80 text-sm uppercase tracking-widest">Primary Residence</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <InputGroup label="Address Line 1" />
                                    <InputGroup label="Suite / Apt" required={false} />
                                </div>
                                <InputGroup label="Address Line 2" required={false} />
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <InputGroup label="City" />
                                    <InputGroup label="State or County" />
                                    <InputGroup label="Zip / Postal Code" />
                                </div>
                                <SelectGroup label="Country" options={countries.map(c => c.name)} />
                            </div>
                        </>
                    )}

                    {/* STEP 2 */}
                    {step === 2 && (
                        <>
                            {/* About You */}
                            <div className="space-y-8">
                                <h2 className="text-[#EFD9F7] text-xl uppercase tracking-wide">About You</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <InputGroup label="Company" />
                                    <InputGroup label="Title" />
                                    <InputGroup label="Company Website" required={false} />
                                </div>
                                <InputGroup label="LinkedIn" />
                                <SelectGroup label="Which industry do you work in?" options={['Finance', 'Technology', 'Real Estate', 'Art', 'Other']} />

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <InputGroup label="Assistant Name" required={false} />
                                    <InputGroup label="Assistant Email" type="email" required={false} />
                                    <InputGroup label="Assistant Telephone" type="tel" required={false} />
                                </div>

                                <TextAreaGroup label="Tell us about your professional work & passions" subtext="50 words minimum" />
                                <TextAreaGroup label="Why would you like to join High Table?" subtext="50 words minimum" />
                            </div>
                        </>
                    )}

                    {/* STEP 3 - Membership & Payment */}
                    {step === 3 && (
                        <div className="space-y-12">
                            <div>
                                <h1 className="text-3xl uppercase tracking-wide text-[#EFD9F7] mb-2">Membership & Payment</h1>
                            </div>

                            {/* Pricing Options */}
                            <div className="space-y-6">
                                <label className="text-[#EFD9F7] text-xs font-bold uppercase tracking-wider block">* Pricing Options</label>

                                <div className="space-y-4">
                                    {/* Tier 1 */}
                                    <div
                                        onClick={() => setSelectedTier('tier-1')}
                                        className={`border ${selectedTier === 'tier-1' ? 'border-[#C78D17] bg-[#C78D17]/10' : 'border-[#EFD9F7]/20'} rounded-lg p-6 cursor-pointer hover:border-[#C78D17] transition-all flex items-start gap-4`}
                                    >
                                        <div className={`w-6 h-6 rounded-full border border-[#EFD9F7] flex items-center justify-center shrink-0 ${selectedTier === 'tier-1' ? 'border-[#C78D17]' : ''}`}>
                                            {selectedTier === 'tier-1' && <div className="w-3 h-3 rounded-full bg-[#C78D17]" />}
                                        </div>
                                        <div>
                                            <h3 className="text-[#EFD9F7] text-sm font-bold uppercase underline decoration-[#C78D17] underline-offset-4 mb-2">Elite Membership</h3>
                                            <p className="text-[#C78D17] text-3xl  mb-1">$5,000</p>
                                            <p className="text-[#EFD9F7] text-sm">per annum</p>
                                            <p className="text-[#EFD9F7]/60 text-sm italic">$1,500 Initiation Fee</p>
                                        </div>
                                    </div>

                                    {/* Tier 2 */}
                                    <div
                                        onClick={() => setSelectedTier('tier-2')}
                                        className={`border ${selectedTier === 'tier-2' ? 'border-[#C78D17] bg-[#C78D17]/10' : 'border-[#EFD9F7]/20'} rounded-lg p-6 cursor-pointer hover:border-[#C78D17] transition-all flex items-start gap-4`}
                                    >
                                        <div className={`w-6 h-6 rounded-full border border-[#EFD9F7] flex items-center justify-center shrink-0 ${selectedTier === 'tier-2' ? 'border-[#C78D17]' : ''}`}>
                                            {selectedTier === 'tier-2' && <div className="w-3 h-3 rounded-full bg-[#C78D17]" />}
                                        </div>
                                        <div>
                                            <h3 className="text-[#EFD9F7] text-sm font-bold uppercase underline decoration-[#C78D17] underline-offset-4 mb-2">Sovereign Membership</h3>
                                            <p className="text-[#C78D17] text-3xl  mb-1">$10,000</p>
                                            <p className="text-[#EFD9F7] text-sm">per annum</p>
                                            <p className="text-[#EFD9F7]/60 text-sm italic">$3,000 Initiation Fee</p>
                                        </div>
                                    </div>

                                    {/* Tier 3 */}
                                    <div
                                        onClick={() => setSelectedTier('tier-3')}
                                        className={`border ${selectedTier === 'tier-3' ? 'border-[#C78D17] bg-[#C78D17]/10' : 'border-[#EFD9F7]/20'} rounded-lg p-6 cursor-pointer hover:border-[#C78D17] transition-all flex items-start gap-4`}
                                    >
                                        <div className={`w-6 h-6 rounded-full border border-[#EFD9F7] flex items-center justify-center shrink-0 ${selectedTier === 'tier-3' ? 'border-[#C78D17]' : ''}`}>
                                            {selectedTier === 'tier-3' && <div className="w-3 h-3 rounded-full bg-[#C78D17]" />}
                                        </div>
                                        <div>
                                            <h3 className="text-[#EFD9F7] text-sm font-bold uppercase underline decoration-[#C78D17] underline-offset-4 mb-2">Tycoon Membership</h3>
                                            <p className="text-[#C78D17] text-3xl  mb-1">$30,000</p>
                                            <p className="text-[#EFD9F7] text-sm">per annum (Year 2+)</p>
                                            <p className="text-[#EFD9F7]/60 text-sm italic">$10,000 Initiation Fee</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Section */}
                            <div className="space-y-8 pt-8 border-t border-[#EFD9F7]/10">
                                <div className="space-y-4">
                                    <p className="text-[#EFD9F7]/80 text-sm leading-relaxed">
                                        Your provided billing details will not be charged until your membership application has been reviewed and accepted by our Membership Committee. At which point you will be notified via Email and have 48 Hours to confirm your membership.
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[#EFD9F7] text-xs font-bold uppercase tracking-wider">* Payment Details</label>
                                        <label className="text-[#EFD9F7] text-xs font-bold uppercase tracking-wider block">* Select Payment Type:</label>
                                        <button className="flex items-center gap-2 px-6 py-3 bg-[#EFD9F7] text-[#3D0066] font-semibold rounded-sm">
                                            <span>✓</span> Credit Card
                                        </button>
                                        <p className="text-[#EFD9F7]/60 text-xs mt-2">Select which payment method you'd like to use.</p>
                                    </div>

                                    <InputGroup label="Name on Credit Card" placeholder="Enter Name on Card" />

                                    <div className="space-y-2">
                                        <label className="text-[#EFD9F7] text-xs font-bold uppercase tracking-wider">* Payment Details</label>
                                        <input
                                            type="text"
                                            placeholder="Card number"
                                            className="w-full bg-white text-black p-4 outline-none rounded-sm placeholder-gray-400"
                                        />
                                        <div className="grid grid-cols-2 gap-4 mt-4">
                                            <input
                                                type="text"
                                                placeholder="MM / YY"
                                                className="w-full bg-white text-black p-4 outline-none rounded-sm placeholder-gray-400"
                                            />
                                            <input
                                                type="text"
                                                placeholder="CVC"
                                                className="w-full bg-white text-black p-4 outline-none rounded-sm placeholder-gray-400"
                                            />
                                        </div>
                                    </div>

                                    <SelectGroup label="Country" options={countries.map(c => c.name)} />

                                    <p className="text-[#EFD9F7]/60 text-xs">
                                        By providing your card information, you allow High Table to charge your card for future payments in accordance with their terms.
                                    </p>
                                </div>
                            </div>

                            {/* Submit Section */}
                            <div className="space-y-8 pt-8 border-t border-[#EFD9F7]/10">
                                <h1 className="text-3xl  text-[#EFD9F7] uppercase mb-2">Submit</h1>
                                <p className="text-[#EFD9F7]/80 text-sm leading-relaxed">
                                    Please review all of the details before submitting the application. Upon submitting a formal application, the Membership Committee will review and render a decision on acceptance after taking into account all aspects of a person's application.
                                </p>

                                <div className="flex flex-col gap-2">
                                    <label className="text-[#C78D17] text-xs font-bold uppercase tracking-wider">* Consent</label>
                                    <label
                                        className="flex items-start gap-4 cursor-pointer group"
                                        onClick={() => setConsent(!consent)}
                                    >
                                        <div className={`w-6 h-6 rounded-full border border-[#EFD9F7] flex items-center justify-center shrink-0 group-hover:border-[#C78D17] transition-colors mt-px ${consent ? 'bg-[#C78D17] border-[#C78D17]' : ''}`}>
                                            {consent && <span className="text-[#3D0066] text-sm font-bold">✓</span>}
                                        </div>
                                        <span className="text-[#EFD9F7] text-sm group-hover:text-[#C78D17] transition-colors">
                                            I give my consent for High Table to use my provided information. See our <span className="underline">Privacy Policy</span>
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between pt-12 border-t border-[#C78D17]/30 mt-12">
                        {step > 1 ? (
                            <button onClick={handlePrev} className="text-[#EFD9F7]/60 hover:text-[#C78D17] uppercase tracking-widest text-sm transition-colors">
                                Back
                            </button>
                        ) : (
                            <div /> /* Spacer */
                        )}

                        {step < 3 ? (
                            <button
                                onClick={handleNext}
                                className="px-12 py-4 bg-[#C78D17] text-[#3D0066] font-semibold uppercase tracking-widest text-sm hover:bg-[#EFD9F7] transition-colors"
                            >
                                Next Step
                            </button>
                        ) : (
                            <button className="px-12 py-4 bg-[#C78D17] text-[#3D0066] font-semibold uppercase tracking-widest text-sm hover:bg-[#EFD9F7] transition-colors">
                                Submit Application
                            </button>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ApplicationForm;
