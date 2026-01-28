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
                    <p className="mt-4 text-[#EFD9F7]/60 italic">Last Updated: January 27, 2026</p>
                </div>

                <div className="space-y-12 text-[#EFD9F7]/80 leading-relaxed font-light">
                    <section>
                        <h2 className="text-[#C78D17] text-xl font-medium uppercase tracking-wider mb-4">1. Purpose and Scope</h2>
                        <p className="mb-4">
                            This Privacy Policy describes how The Silent Accord collects, uses, retains, and protects information submitted in connection with access review, approved participation, and related private correspondence.
                            <br />
                            The Silent Accord operates as a discretionary, controlled-access environment. Information is collected and processed only where reasonably necessary to evaluate, verify, administer, and safeguard access, or to comply with applicable legal and regulatory obligations.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-[#C78D17] text-xl font-medium uppercase tracking-wider mb-4">2. Categories of Information Collected</h2>
                        <p className="mb-4">Information may include, but is not limited to, the following categories:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Identity and Contact Information submitted during access review or correspondence</li>
                            <li>Professional and Affiliation Information voluntarily provided for contextual evaluation</li>
                            <li>Verification Documentation required for review, compliance, or risk management</li>
                            <li>Billing Information provided for processing authorized review or access-related charges</li>
                            <li>Technical and Security Data generated through secure access systems</li>
                        </ul>
                        <p className="mt-4">Information is collected directly from individuals or their authorized representatives.</p>
                    </section>

                    <section>
                        <h2 className="text-[#C78D17] text-xl font-medium uppercase tracking-wider mb-4">3. Use of Information</h2>
                        <p className="mb-4">Information is used solely for the following purposes:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Conducting access review and eligibility verification</li>
                            <li>Administering approved access tiers and related operations</li>
                            <li>Maintaining security, integrity, and operational continuity</li>
                            <li>Fulfilling applicable legal, regulatory, and compliance obligations</li>
                        </ul>
                        <p className="mt-4">The Silent Accord does not sell, rent, or disclose personal information for advertising or marketing purposes.</p>
                    </section>

                    <section>
                        <h2 className="text-[#C78D17] text-xl font-medium uppercase tracking-wider mb-4">4. Confidentiality and Limited Disclosure</h2>
                        <p className="mb-4">
                            All information is treated as confidential and accessed only by authorized personnel acting within the scope of their responsibilities.
                            <br />
                            Information may be disclosed only where reasonably necessary:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>To comply with applicable law, regulation, or lawful process</li>
                            <li>To trusted service providers operating under binding confidentiality obligations</li>
                            <li>To protect the integrity, security, or lawful operation of The Silent Accord</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-[#C78D17] text-xl font-medium uppercase tracking-wider mb-4">5. Data Retention</h2>
                        <p className="mb-4">
                            Information may be retained for internal records, compliance, audit, security, and risk-management purposes, including where access is not granted or is later withdrawn.
                            <br />
                            Retention periods are determined at the discretion of The Silent Accord, taking into account operational requirements and applicable legal obligations.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-[#C78D17] text-xl font-medium uppercase tracking-wider mb-4">6. Data Security and Compliance Framework</h2>
                        <p className="mb-4">
                            The Silent Accord implements reasonable administrative, technical, and organizational safeguards designed to protect information against unauthorized access, misuse, or disclosure.
                            <br />
                            Operational practices and infrastructure are aligned with recognized international security and data-protection standards, including:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>GDPR-aligned data protection practices, supporting applicable EU privacy requirements</li>
                            <li>SOC 1 Type II controls relating to financial and operational integrity</li>
                            <li>SOC 2 Type II controls addressing security, availability, and confidentiality</li>
                            <li>AWS-based infrastructure, leveraging enterprise-grade security controls</li>
                        </ul>
                        <p className="mt-4">
                            These frameworks inform internal controls and risk management practices. While no system can be guaranteed to be entirely secure, discretion, confidentiality, and data protection are treated as operational priorities.
                        </p>
                        {/* Optional Badge Re-inclusion or Removal depending on strictness - keeping pure text per prompt unless user wants image */}
                        <div className="mt-8 flex justify-center">
                            <img
                                src="/assets/security-badges.png"
                                alt="Security Certifications"
                                className="w-full max-w-xs rounded-lg shadow-2xl border border-[#C78D17]/20 bg-[#3D0066]"
                            />
                        </div>
                    </section>

                    <section>
                        <h2 className="text-[#C78D17] text-xl font-medium uppercase tracking-wider mb-4">7. Rights and Inquiries</h2>
                        <p className="mb-4">
                            Requests regarding information handling may be submitted through private correspondence.
                            <br />
                            Such requests are evaluated on a case-by-case basis and may be subject to verification of identity, authority, and applicable legal or retention requirements. Responses are issued at discretion.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-[#C78D17] text-xl font-medium uppercase tracking-wider mb-4">8. Amendments</h2>
                        <p className="mb-4">
                            This Privacy Policy may be updated periodically to reflect legal, regulatory, or operational changes.
                            <br />
                            Continued engagement with The Silent Accord constitutes acknowledgement of any revisions.
                        </p>
                    </section>

                    <div className="w-full h-px bg-[#EFD9F7]/20 my-12" />

                    {/* Jurisdictional Alignment */}
                    <section>
                        <h2 className="text-[#C78D17] text-lg font-medium uppercase tracking-wider mb-8">Jurisdictional Alignment and Regulatory Notices</h2>
                        <p className="italic text-sm mb-8">The Silent Accord operates across multiple jurisdictions and processes personal data in accordance with applicable data protection laws, where required.</p>

                        <div className="space-y-8">
                            <div>
                                <h3 className="text-[#EFD9F7] font-semibold mb-2">European Union & United Kingdom (GDPR / UK GDPR)</h3>
                                <p className="text-sm mb-2">Where applicable, personal data is processed in accordance with Regulation (EU) 2016/679 (GDPR) and the UK GDPR.</p>
                                <p className="text-sm mb-2">Processing may be conducted on one or more lawful bases, including:</p>
                                <ul className="list-disc pl-6 space-y-1 text-sm mb-4">
                                    <li>Legitimate interests in conducting access review, verification, security, and institutional operations</li>
                                    <li>Compliance with legal or regulatory obligations</li>
                                    <li>Consent, where expressly obtained and required</li>
                                </ul>
                                <p className="text-sm mb-2">Subject to applicable law and lawful exceptions, individuals may have rights including access, rectification, erasure, or restriction of processing.</p>
                                <p className="text-sm">Requests may be submitted through private correspondence and are handled in accordance with applicable law and institutional operating requirements.</p>
                            </div>

                            <div>
                                <h3 className="text-[#EFD9F7] font-semibold mb-2">Dubai International Financial Centre (DIFC)</h3>
                                <p className="text-sm mb-2">Where applicable, personal data is processed in accordance with DIFC Data Protection Law No. 5 of 2020.</p>
                                <p className="text-sm mb-2">Personal data is collected and processed for specified, explicit, and legitimate purposes related to access review, verification, administration, and institutional security.</p>
                                <p className="text-sm">Rights of access, correction, or objection may apply, subject to lawful exceptions and operational requirements.</p>
                            </div>

                            <div>
                                <h3 className="text-[#EFD9F7] font-semibold mb-2">Singapore (PDPA)</h3>
                                <p className="text-sm mb-2">Where applicable, personal data is processed in accordance with the Singapore Personal Data Protection Act (PDPA).</p>
                                <p className="text-sm mb-2">Personal data is collected, used, and disclosed for purposes that a reasonable person would consider appropriate in the context of access review, verification, and administration.</p>
                                <p className="text-sm">Reasonable security arrangements are implemented to protect personal data against unauthorized access or disclosure.</p>
                            </div>

                            <div>
                                <h3 className="text-[#EFD9F7] font-semibold mb-2">Cross-Border Data Transfers</h3>
                                <p className="text-sm">Where personal data is transferred across jurisdictions, appropriate safeguards are implemented to ensure a level of protection consistent with applicable legal requirements.</p>
                            </div>

                            <div>
                                <h3 className="text-[#EFD9F7] font-semibold mb-2">Regulatory Notice (Short Form)</h3>
                                <p className="text-sm">Jurisdiction-specific rights may apply depending on location and applicable law. Requests are handled in accordance with legal obligations and institutional requirements.</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
