import Link from 'next/link';
import HomeNav from '@/components/home/HomeNav';

export default function TermsOfService() {
    return (
        <main className="min-h-screen bg-[#3D0066] text-[#EFD9F7]">
            <HomeNav />
            <div className="max-w-4xl mx-auto px-6 pt-32 pb-24">
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-medium uppercase mb-4 text-[#EFD9F7] tracking-wider">Terms of Access</h1>
                    <div className="w-24 h-0.5 bg-[#C78D17]" />
                    <p className="mt-4 text-[#EFD9F7]/60 italic">Last Updated: January 27, 2026</p>
                </div>

                <div className="space-y-12 text-[#EFD9F7]/80 leading-relaxed font-light">
                    <section>
                        <h2 className="text-[#C78D17] text-xl font-medium uppercase tracking-wider mb-4">1. Scope and Acceptance</h2>
                        <p className="mb-4">
                            Access to The Silent Accord and its associated environments is governed by these Terms of Access (“Terms”).
                            <br />
                            By requesting, receiving, or using access, you acknowledge and agree to be bound by these Terms and any related policies referenced herein.
                            <br />
                            Failure to agree to these Terms prohibits any access or participation.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-[#C78D17] text-xl font-medium uppercase tracking-wider mb-4">2. Eligibility and Access Conduct</h2>
                        <p className="mb-4">
                            Access to The Silent Accord is limited and granted through private review and discretion.
                            <br />
                            By participating, you acknowledge and agree to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Provide information that is accurate, current, and complete for the purposes of review and verification.</li>
                            <li>Maintain the confidentiality of your access credentials and respect the privacy of other participants.</li>
                            <li>Conduct yourself in a manner consistent with discretion, professionalism, and lawful purpose.</li>
                            <li>Refrain from solicitation, harassment, misuse of information, or any activity that may compromise the integrity of the Accord or its participants.</li>
                        </ul>
                        <p className="mt-4">
                            Access is personal, non-transferable, and subject to ongoing review.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-[#C78D17] text-xl font-medium uppercase tracking-wider mb-4">3. Processing Charges and Annual Consideration</h2>
                        <h3 className="text-[#EFD9F7] font-semibold mb-2">Initial Processing</h3>
                        <p className="mb-4">
                            A non-refundable processing charge is required to initiate access review.
                            <br />
                            Processing charges are applied solely for administrative and verification purposes and are exclusive of applicable taxes.
                        </p>
                        <h3 className="text-[#EFD9F7] font-semibold mb-2">Annual Consideration</h3>
                        <p className="mb-4">
                            Where access is approved, annual consideration is payable as communicated privately.
                            <br />
                            Failure to maintain applicable financial obligations may result in suspension or withdrawal of access.
                            <br />
                            Payment terms are subject to change and are communicated at the discretion of The Silent Accord.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-[#C78D17] text-xl font-medium uppercase tracking-wider mb-4">4. Suspension or Withdrawal of Access</h2>
                        <p className="mb-4">
                            The Silent Accord reserves the right to approve, defer, suspend, or withdraw access at any time, with or without notice, and without obligation to provide explanation.
                            <br />
                            Withdrawal of access may occur, including but not limited to, instances where these Terms are breached, alignment is no longer present, or continued participation is deemed inappropriate.
                            <br />
                            No liability shall arise from the exercise of this discretion.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-[#C78D17] text-xl font-medium uppercase tracking-wider mb-4">5. Confidentiality and Use of Information</h2>
                        <p className="mb-4">
                            All information exchanged within The Silent Accord is considered confidential unless expressly stated otherwise.
                            <br />
                            Participants agree not to disclose, reproduce, or misuse any non-public information obtained through access, including the identities, activities, or communications of other participants.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-[#C78D17] text-xl font-medium uppercase tracking-wider mb-4">6. Limitation of Liability</h2>
                        <p className="mb-4">
                            To the fullest extent permitted by law, The Silent Accord and its affiliates shall not be liable for any indirect, incidental, consequential, special, or punitive damages arising out of or related to access, participation, or inability to access the Accord or its environments.
                            <br />
                            This includes, without limitation, loss of data, opportunity, reputation, or anticipated benefit.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-[#C78D17] text-xl font-medium uppercase tracking-wider mb-4">7. Amendments</h2>
                        <p className="mb-4">
                            These Terms may be amended from time to time.
                            <br />
                            Continued access following any amendment constitutes acknowledgment of the revised Terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-[#C78D17] text-xl font-medium uppercase tracking-wider mb-4">8. Governing Principles</h2>
                        <p className="mb-4">
                            These Terms are governed by applicable laws as determined by The Silent Accord.
                            <br />
                            Any disputes arising in connection with access shall be handled in accordance with procedures determined at the discretion of the organization.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
