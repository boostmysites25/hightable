import Link from 'next/link';
import HomeNav from '@/components/home/HomeNav';

export default function TermsOfService() {
    return (
        <main className="min-h-screen bg-[#3D0066] text-[#EFD9F7]">
            <HomeNav />
            <div className="max-w-4xl mx-auto px-6 pt-32 pb-24">
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-medium uppercase mb-4 text-[#EFD9F7] tracking-wider">Terms of Service</h1>
                    <div className="w-24 h-0.5 bg-[#C78D17]" />
                    <p className="mt-4 text-[#EFD9F7]/60 italic">Last Updated: January 15, 2026</p>
                </div>

                <div className="space-y-12 text-[#EFD9F7]/80 leading-relaxed font-light">
                    <section>
                        <h2 className="text-[#C78D17] text-xl font-medium uppercase tracking-wider mb-4">1. Acceptance of Terms</h2>
                        <p className="mb-4">
                            By accessing or using the High Table platform and services, you agree to be bound by these Terms of Service and our "Sovereign Code" of conduct. If you do not agree to these terms, you may not access the services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-[#C78D17] text-xl font-medium uppercase tracking-wider mb-4">2. Membership Eligibility & Conduct</h2>
                        <p className="mb-4">
                            Membership is by invitation or application only and is subject to strict vetting. You agree to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Provide accurate, current, and complete information during the verified registration process.</li>
                            <li>Maintain the confidentiality of your account credentials and the identities of other members.</li>
                            <li>Adhere to the "Sovereign Code," treating all members and staff with dignity and respect.</li>
                            <li>Use the platform for lawful purposes only, refraining from solicitation or harassment.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-[#C78D17] text-xl font-medium uppercase tracking-wider mb-4">3. Fees and Payments</h2>
                        <p className="mb-4">
                            **Registration Fees**: As stated in your application, Registration Fees are non-refundable and exclude applicable taxes. This fee covers the administrative cost of vetting and onboarding.
                        </p>
                        <p className="mb-4">
                            **Annual Dues**: Membership dues are payable annually or as otherwise agreed. Failure to pay dues may result in suspension or termination of membership.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-[#C78D17] text-xl font-medium uppercase tracking-wider mb-4">4. Termination</h2>
                        <p className="mb-4">
                            High Table reserves the right to terminate or suspend your membership immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms or the Sovereign Code.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-[#C78D17] text-xl font-medium uppercase tracking-wider mb-4">5. Limitation of Liability</h2>
                        <p className="mb-4">
                            In no event shall High Table, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                        </p>
                    </section>

                    {/* <div className="pt-8 border-t border-[#EFD9F7]/20">
                        <Link href="/application/form" className="text-[#C78D17] hover:text-[#EFD9F7] transition-colors underline underline-offset-4">
                            &larr; Return to Application
                        </Link>
                    </div> */}
                </div>
            </div>
        </main>
    );
}
