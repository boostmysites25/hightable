import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Application Received - The Silent Accord',
    description: 'Your application has been received.',
};

export default function ThankYouPage() {
    // Style Constants matching ApplicationForm
    const LABEL_CLASS = "text-[#EFD9F7] text-xs font-bold uppercase tracking-wider";

    return (
        <main className="min-h-screen w-full bg-[#3D0066] text-[#EFD9F7] flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-[#000000]/40 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none" />

            {/* Content Container */}
            <div className="max-w-xl w-full text-center space-y-12 relative z-10 animate-in fade-in zoom-in duration-700">

                {/* Icon/Symbol */}
                <div className="mb-8">
                    <div className="w-20 h-20 mx-auto rounded-full border border-[#C78D17] flex items-center justify-center bg-[#C78D17]/10 animate-pulse-slow">
                        <span className="text-4xl text-[#C78D17]">✓</span>
                    </div>
                </div>

                <div className="space-y-6">
                    <h1 className="text-4xl md:text-5xl uppercase tracking-widest text-[#EFD9F7] font-light">
                        Application <span className="block text-[#C78D17] mt-3">Received</span>
                    </h1>

                    <div className="w-24 h-px bg-linear-to-r from-transparent via-[#C78D17] to-transparent mx-auto my-8 opacity-50" />

                    <p className="text-[#EFD9F7]/80 leading-relaxed text-lg font-light">
                        Thank you for submitting your application to <span className="text-[#EFD9F7] font-semibold">The Silent Accord</span>.
                    </p>
                    <p className="text-[#EFD9F7]/60 leading-relaxed text-sm">
                        Your details have been securely received. The Membership Board will review your application and you will be notified of our decision shortly.
                    </p>
                </div>

                <div className="pt-8">
                    <Link
                        href="/"
                        className="inline-block px-12 py-4 border border-[#C78D17] text-[#C78D17] font-semibold uppercase tracking-widest text-sm hover:bg-[#C78D17] hover:text-[#3D0066] transition-all duration-300"
                    >
                        Return to Home
                    </Link>
                </div>

                <div className="pt-12">
                    <p className="text-[#EFD9F7]/20 text-xs uppercase tracking-widest">The Silent Accord &copy; {new Date().getFullYear()}</p>
                </div>
            </div>
        </main>
    );
}
