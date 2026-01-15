import Link from 'next/link';
import HomeNav from '@/components/home/HomeNav';

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen bg-[#3D0066] text-[#EFD9F7]">
            <HomeNav />
            <div className="max-w-4xl mx-auto px-6 pt-32 pb-24">
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-medium uppercase mb-4 text-[#EFD9F7] tracking-wider">Privacy Policy</h1>
                    <div className="w-24 h-0.5 bg-[#C78D17]" />
                    <p className="mt-4 text-[#EFD9F7]/60 italic">Last Updated: January 15, 2026</p>
                </div>

                <div className="space-y-12 text-[#EFD9F7]/80 leading-relaxed font-light">
                    <section>
                        <h2 className="text-[#C78D17] text-xl font-medium uppercase tracking-wider mb-4">1. Introduction</h2>
                        <p className="mb-4">
                            High Table ("we," "our," or "us") is dedicated to protecting the privacy and security of our members ("you"). This Privacy Policy outlines how we collect, use, and safeguard your personal information within our exclusive network. We operate in strict adherence to global privacy standards, ensuring your data is treated with the highest level of confidentiality suitable for a High Net Worth ecosystem.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-[#C78D17] text-xl font-medium uppercase tracking-wider mb-4">2. Data We Collect</h2>
                        <p className="mb-4">To provide our bespoke services, verification, and networking opportunities, we may collect the following categories of data:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong className="text-[#EFD9F7]">Identity Information:</strong> Name, age, gender, and government-issued identification for verification.</li>
                            <li><strong className="text-[#EFD9F7]">Professional & Financial Data:</strong> Net worth accreditation, company details, professional background, and industry affiliations.</li>
                            <li><strong className="text-[#EFD9F7]">Contact Details:</strong> Email specific to your primary residence or office, phone numbers, and physical addresses.</li>
                            <li><strong className="text-[#EFD9F7]">Lifestyle Preferences:</strong> Interests, dietary requirements, and travel preferences to tailor your membership experience.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-[#C78D17] text-xl font-medium uppercase tracking-wider mb-4">3. How We Use Your Information</h2>
                        <p className="mb-4">We do not sell your data. Your information is used strictly for:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Verifying your eligibility for specific membership tiers (Axis, Vault, Coterie).</li>
                            <li>Facilitating secure introductions to other members and partner organizations.</li>
                            <li>Processing membership dues and registration fees.</li>
                            <li>Compliance with legal obligations and "Sovereign Code" standards.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-[#C78D17] text-xl font-medium uppercase tracking-wider mb-4">4. Compliance & Security Certifications</h2>
                        <p className="mb-4">
                            We employ state-of-the-art security measures to protect your data. Our infrastructure and operations are aligned with top-tier international standards. We are confident in our compliance posture and hold ourselves to the highest benchmarks of data sovereignty.
                        </p>
                        <div className="mt-8 flex justify-center">
                            <img
                                src="/assets/security-badges.png"
                                alt="Security Certifications: GDPR Ready, SOC 1 Type II, SOC 2 Type II, AWS Powered"
                                className="w-full max-w-2xl rounded-lg shadow-2xl border border-[#C78D17]/20 bg-[#3D0066]"
                            />
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 mt-8 text-sm text-[#EFD9F7]/60">
                            <p className="border-l-2 border-[#C78D17] pl-4">Standardized compliance with GDPR ensuring EU-verified privacy rights.</p>
                            <p className="border-l-2 border-[#C78D17] pl-4">Audited controls for financial reporting (SOC 1) and security/privacy (SOC 2).</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-[#C78D17] text-xl font-medium uppercase tracking-wider mb-4">5. Your Data Rights</h2>
                        <p className="mb-4">You have the right to request access to your personal data, correction of inaccuracies, or deletion of your account/data, subject to legal retention requirements. To exercise these rights, please contact our Membership Concierge.</p>
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
