'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

const appTiers: Record<string, { title: string; annual: string; processing: string; points: string[] }> = {
    'axis': {
        title: 'AXIS · Tier I Access',
        annual: 'Annual Consideration: USD 5,000 (Excl. Tax) *',
        processing: 'Initial Processing: USD 500 (Non-Refundable, Excl. Tax) **',
        points: [
            'Axis access is intended for individuals entering positions of sustained influence.',
            'Submission of this review does not guarantee access at any level.',
            'All information provided is reviewed confidentially and without attribution.',
            'An initial processing fee is required to initiate review and is non-refundable.',
            'Financial consideration is extended only upon approval.',
            'Reviews that do not meet alignment criteria may conclude without further notice.'
        ]
    },
    'vault': {
        title: 'VAULT · Tier II Access',
        annual: 'Annual Consideration: USD 10,000 (Excl. Tax) *',
        processing: 'Initial Processing: USD 500 (Non-Refundable, Excl. Tax) **',
        points: [
            'Vault access is reserved for principals operating at established scale and responsibility.',
            'Submission of this review does not guarantee access.',
            'All materials are reviewed discreetly and treated as confidential.',
            'An initial, non-refundable processing fee is required to commence review.',
            'Additional verification may be requested at this level.',
            'Reviews may conclude without response where alignment is not established.'
        ]
    },
    'coterie': {
        title: 'COTERIE · Tier III Access',
        annual: 'Annual Consideration: USD 30,000 (Excl. Tax) *',
        processing: 'Initial Processing: USD 500 (Non-Refundable, Excl. Tax) **',
        points: [
            'Coterie access is extended to a limited number of principals, subject to specific conditions.',
            'Submission of this review does not imply eligibility or invitation.',
            'All information is reviewed privately and handled with strict discretion.',
            'A non-refundable processing fee is required to initiate consideration.',
            'Further consideration or sponsorship may be sought where appropriate.',
            'Any advancement in standing is granted solely at the discretion of THE SILENT ACCORD.',
            'Reviews may conclude without correspondence.'
        ]
    }
};

const Content = () => {
    const searchParams = useSearchParams();
    const tierId = searchParams.get('tier') || 'axis';
    const selectedTier = appTiers[tierId] || appTiers['axis'];

    return (
        <section className="min-h-screen w-full bg-[#3D0066] text-[#EFD9F7] flex items-center justify-center p-6 md:p-24 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-[#000000]/40 to-transparent pointer-events-none" />

            <div className="max-w-5xl w-full relative z-10">
                <div className="text-center mb-16">
                    <h1 className="text-3xl md:text-5xl uppercase text-[#EFD9F7] mb-6">The Silent Accord Membership Application</h1>
                    <div className="w-24 h-0.5 bg-[var(--gold)]/50 mx-auto" />
                </div>

                <div className="space-y-12">

                    {/* Selected Membership Plan */}
                    <div>
                        {/* <h2 className="text-[var(--gold)] text-sm tracking-[0.2em] font-semibold uppercase mb-6">Selected Membership Plan</h2> */}
                        <div className="bg-[#EFD9F7]/5 border border-[#EFD9F7]/10 p-8 rounded-sm backdrop-blur-sm space-y-2">
                            <div className="border-l-2 border-[var(--gold)] pl-6">
                                <h3 className="text-[#EFD9F7] text-xl mb-4">{selectedTier.title}</h3>
                                <p className="text-[#EFD9F7]/80 text-sm mb-1">{selectedTier.annual}</p>
                                <p className="text-[#EFD9F7]/60 text-sm">{selectedTier.processing}</p>
                            </div>
                        </div>
                        {/* Global Footnotes */}
                        <div className="mt-4 pl-8 space-y-1">
                            <p className="text-[#EFD9F7]/40 text-xs italic">* Financial details are processed only following approval.</p>
                            <p className="text-[#EFD9F7]/40 text-xs italic">** All fees are exclusive of applicable taxes.</p>
                        </div>
                    </div>

                    {/* Before Proceeding - Dynamic */}
                    <div>
                        <h2 className="text-[var(--gold)] text-sm tracking-[0.2em] font-semibold uppercase mb-6">Before Proceeding</h2>
                        <ul className="space-y-4 text-sm md:text-base font-light text-[#EFD9F7]/80 leading-relaxed">
                            {selectedTier.points.map((point, index) => (
                                <li key={index} className="flex gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] mt-2 shrink-0" />
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Disclaimer */}
                    <div className="space-y-2 text-sm text-[#EFD9F7]/50 italic text-center">
                        <p>Financial information is collected for verification purposes only and is processed following approval.</p>
                    </div>

                    {/* CTA */}
                    <div className="pt-8 flex flex-col items-center gap-4">
                        <Link
                            href={`/application/form?tier=${tierId}`}
                            className="group relative px-12 py-4 bg-transparent border border-[var(--gold)] hover:bg-[var(--gold)] transition-all duration-300"
                        >
                            <span className="relative z-10 text-[var(--gold)] group-hover:text-[#3D0066] font-semibold tracking-[0.2em] uppercase text-sm">
                                Proceed to Review
                            </span>
                        </Link>
                        {/* Microcopy */}
                        <div className="text-center space-y-1">
                            <p className="text-[#EFD9F7]/30 text-[10px] uppercase tracking-widest">Access reviews are conducted periodically.</p>
                            <p className="text-[#EFD9F7]/30 text-[10px] uppercase tracking-widest">No specific timeline is guaranteed.</p>
                        </div>
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
