'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

const appTiers: Record<string, { title: string; dues: string; initiation: string }> = {
    'tier1': {
        title: 'Elite Membership (AXIS)',
        dues: 'Annual Dues: $5,000 (Excl. Tax)',
        initiation: 'Registration Fee: $1,500 (One-time, Excl. Tax)'
    },
    'tier2': {
        title: 'Sovereign Membership (VAULT)',
        dues: 'Annual Dues: $10,000 (Excl. Tax)',
        initiation: 'Registration Fee: $3,000 (One-time, Excl. Tax)'
    },
    'tier3': {
        title: 'Tycoon Membership (COTERIE)',
        dues: 'Annual Dues: $30,000 (Excl. Tax)',
        initiation: 'Registration Fee: $10,000 (One-time, Excl. Tax)'
    }
};

const Content = () => {
    const searchParams = useSearchParams();
    const tierId = searchParams.get('tier') || 'tier1';
    const selectedTier = appTiers[tierId] || appTiers['tier1'];

    return (
        <section className="min-h-screen w-full bg-[#3D0066] text-[#EFD9F7] flex items-center justify-center p-6 md:p-24 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-[#000000]/40 to-transparent pointer-events-none" />

            <div className="max-w-5xl w-full relative z-10">
                <div className="text-center mb-16">
                    <h1 className="text-3xl md:text-5xl uppercase text-[#EFD9F7] mb-6">High Table Membership Application</h1>
                    <div className="w-24 h-0.5 bg-[#C78D17]/50 mx-auto" />
                </div>

                <div className="space-y-12">
                    <div>
                        <h2 className="text-[#C78D17] text-sm tracking-[0.2em] font-semibold uppercase mb-6">Before We Start</h2>
                        <ul className="space-y-4 text-sm md:text-base font-light text-[#EFD9F7]/80 leading-relaxed">
                            <li className="flex gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#C78D17] mt-2 shrink-0" />
                                <span>I hereby apply for membership to The High Table. If accepted, I agree to be bound by the Sovereign Code of the territory.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#C78D17] mt-2 shrink-0" />
                                <span>Please note that all sections must be completed in full for this application to be submitted to the Selection Committee.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#C78D17] mt-2 shrink-0" />
                                <span>All information gathered here is treated with the highest level of cryptographic confidentiality.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#C78D17] mt-2 shrink-0" />
                                <span>A clear and recent headshot is required for your Sovereign Profile.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#C78D17] mt-2 shrink-0" />
                                <span>A nomination from a current Founding Member is highly encouraged. Applicants without a nomination may be subject to a secondary vetting interview.</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-[#C78D17] text-sm tracking-[0.2em] font-semibold uppercase mb-6">Selected Membership Plan</h2>
                        <div className="bg-[#EFD9F7]/5 border border-[#EFD9F7]/10 p-8 rounded-sm backdrop-blur-sm space-y-6">
                            <div className="border-l-2 border-[#C78D17] pl-6">
                                <h3 className="text-[#EFD9F7] text-lg mb-1">{selectedTier.title}</h3>
                                <p className="text-[#EFD9F7]/60 text-sm">{selectedTier.dues}</p>
                                <p className="text-[#EFD9F7]/60 text-sm">{selectedTier.initiation}</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2 text-sm text-[#EFD9F7]/50 italic">
                        {/* {tierId === 'tier1' && <p>* Applicants for Elite Membership must possess a Net Worth between $250k - $600k.</p>}
                        {tierId === 'tier2' && <p>* Applicants for Sovereign Membership must possess a Net Worth between $600k - $12M.</p>}
                        {tierId === 'tier3' && <p>* Applicants for Tycoon Membership must demonstrate a Net Worth of $12M+.</p>} */}
                        <p>* Your billing details will not be charged until your application has been formally accepted by the Committee.</p>
                    </div>

                    <div className="pt-8 flex justify-center">
                        <Link
                            href={`/application/form?tier=${tierId}`}
                            className="group relative px-12 py-4 bg-transparent border border-[#C78D17] hover:bg-[#C78D17] transition-all duration-300"
                        >
                            <span className="relative z-10 text-[#C78D17] group-hover:text-[#3D0066] font-semibold tracking-[0.2em] uppercase text-sm">
                                Proceed to Application
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

const ApplicationIntro = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Content />
        </Suspense>
    )
}

export default ApplicationIntro;
