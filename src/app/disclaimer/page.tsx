export default function DisclaimerPage() {
    return (
        <section className="bg-[#050A10] min-h-screen text-[#EFD9F7] py-20 px-4 flex items-center justify-center">
            <div className="max-w-2xl text-center space-y-6">
                <h1 className="text-3xl font-bold text-[var(--gold)] uppercase tracking-widest mb-8">Disclaimer</h1>

                <div className="space-y-4 text-justify leading-relaxed opacity-80">
                    <p>
                        Access to The Silent Accord is granted solely at the organization’s discretion.
                    </p>
                    <p>
                        Submission of information or payment of any processing charge does not guarantee access at any tier.
                    </p>
                    <p>
                        All information is reviewed confidentially and may be retained for internal records.
                    </p>
                    <p>
                        The Silent Accord reserves the right to approve or defer any request without obligation to explanation.
                    </p>
                </div>

                <div className="pt-12">
                    <a href="/" className="text-[var(--gold)] hover:text-[#EFD9F7] uppercase text-sm tracking-widest transition-colors">Return to Home</a>
                </div>
            </div>
        </section>
    );
}
