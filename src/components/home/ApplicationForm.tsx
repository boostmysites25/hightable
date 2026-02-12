'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ReCAPTCHA from 'react-google-recaptcha';
import { countries } from '@/data/countries';
import CustomDropdown from '../ui/CustomDropdown';
import { Camera, CreditCard } from 'lucide-react';

const ApplicationForm = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const initialTier = searchParams.get('tier') || 'tier-1';
    const [step, setStep] = useState(1);
    const [selectedTier, setSelectedTier] = useState(initialTier);
    const [consent, setConsent] = useState(false);
    const [captchaVerified, setCaptchaVerified] = useState(false);
    const recaptchaRef = useRef<ReCAPTCHA>(null);

    const [formData, setFormData] = useState({
        givenName: '', additionalName: '', familyName: '', nameInUse: '',
        primaryAffiliation: '', primaryWebPresence: '', primaryDomain: '',
        industry: '', customIndustry: '',
        professionalOverview: '', statementOfInterest: '',
        primaryPostalCode: '', country: '',
        email: '', code: '+1', phone: '',
        dob: '', gender: '',
        address1: '', suite: '', address2: '', city: '', state: '',
        assistantName: '', assistantEmail: '', assistantPhone: '',
        profilePicture: null as File | null, idDocument: null as File | null,
        cardName: '', cardNumber: '', cardExpiry: '', cardCvc: '',
        consentProcessing: false, consentTerms: false
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [shakeFields, setShakeFields] = useState<string[]>([]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
        setFormData(prev => ({ ...prev, [name]: val }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleDropdownChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>, name: string) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({ ...prev, [name]: e.target.files![0] }));
            if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateField = (name: string, value: any): string => {
        if (!value && name !== 'additionalName' && name !== 'nameInUse' && name !== 'suite' && name !== 'address2' && name !== 'assistantName' && name !== 'assistantEmail' && name !== 'assistantPhone' && name !== 'customIndustry') return 'This field is required';

        if (name === 'customIndustry' && formData.industry === 'Other' && !value) return 'Please specify your industry';

        switch (name) {
            case 'primaryWebPresence':
            case 'primaryDomain':
                if (value && !/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(value)) return 'Invalid URL';
                break;
            case 'email':
            case 'assistantEmail':
                if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email address';
                break;
            case 'phone':
            case 'assistantPhone':
                if (value && !/^\+?[\d\s-]{10,}$/.test(value)) return 'Invalid phone number';
                break;
            case 'professionalOverview':
            case 'statementOfInterest':
                const wordCount = value.trim().split(/\s+/).length;
                if (wordCount < 120) return `Minimum 120 words required. Current: ${value.trim() === '' ? 0 : wordCount}`;
                break;
        }
        return '';
    };

    const triggerShake = (fieldNames: string[]) => {
        setShakeFields(fieldNames);
        setTimeout(() => setShakeFields([]), 500); // Reset after animation duration
    };

    const validateStep = (currentStep: number) => {
        const newErrors: Record<string, string> = {};

        const step1Fields = ['givenName', 'familyName', 'primaryAffiliation', 'primaryWebPresence', 'primaryDomain', 'industry', 'primaryPostalCode', 'country', 'professionalOverview', 'statementOfInterest'];
        if (formData.industry === 'Other') step1Fields.push('customIndustry');
        const step2Fields = ['email', 'code', 'phone', 'dob', 'gender', 'address1', 'city', 'state', 'profilePicture', 'idDocument'];
        const step3Fields = ['cardName', 'cardNumber', 'cardExpiry', 'cardCvc'];

        const fieldsToValidate = currentStep === 1 ? step1Fields : (currentStep === 2 ? step2Fields : (currentStep === 3 ? step3Fields : []));

        const invalidFields: string[] = [];

        fieldsToValidate.forEach(field => {
            const error = validateField(field, formData[field as keyof typeof formData]);
            if (error) {
                newErrors[field] = error;
                invalidFields.push(field);
            }
        });

        if (currentStep === 1 && newErrors['statementOfInterest']) {
            const element = document.getElementById('statement-interest');
            if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        // setErrors(prev => ({ ...prev, ...newErrors }));
        // if (invalidFields.length > 0) triggerShake(invalidFields);
        // return invalidFields.length === 0;
        return true;
    };

    const handleNext = () => {
        if (validateStep(step)) {
            setStep(prev => prev + 1);
            window.scrollTo(0, 0);
        }
    };

    const handlePrev = () => {
        setStep(prev => prev - 1);
        window.scrollTo(0, 0);
    };

    const onCaptchaChange = (value: string | null) => {
        setCaptchaVerified(!!value);
    };

    const handleSubmit = () => {
        const newErrors: Record<string, string> = {};
        const invalidFields: string[] = [];
        let isValid = true;

        ['cardName', 'cardNumber', 'cardExpiry', 'cardCvc'].forEach(field => {
            const error = validateField(field, formData[field as keyof typeof formData]);
            if (error) {
                newErrors[field] = error;
                invalidFields.push(field);
                isValid = false;
            }
        });

        // if (!captchaVerified) {
        //     alert("Please verify you are not a robot");
        //     return;
        // }
        // if (!consent) {
        //     alert("Please agree to the consent form");
        //     return;
        // }

        // if (!isValid) {
        //     setErrors(prev => ({ ...prev, ...newErrors }));
        //     if (invalidFields.length > 0) triggerShake(invalidFields);
        //     return;
        // }
        // return;
        router.push('/thank-you');
    }
    console.log("Application Submitted", formData);

    // Style Constants
    const LABEL_CLASS = "text-[#EFD9F7] text-xs font-bold uppercase tracking-wider";
    const INPUT_CLASS = "w-full bg-transparent border border-[#EFD9F7]/20 p-4 text-[#EFD9F7] focus:border-[#C78D17] outline-none transition-colors rounded-sm";
    const GROUP_CLASS = "flex flex-col gap-2";
    const ERROR_CLASS = "text-red-500 text-xs mt-1 animate-fade-in";

    return (
        <section className="min-h-screen w-full bg-[#3D0066] text-[#EFD9F7] flex flex-col items-center p-6 md:p-24 relative">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-[#000000]/40 to-transparent pointer-events-none" />

            <div className="max-w-5xl w-full relative z-10">

                {/* Header */}
                <div className="mb-12 flex justify-between items-end border-b border-[#C78D17]/30 pb-6">
                    <div>
                        <h1 className="text-3xl uppercase tracking-wide text-[#EFD9F7]">ACCESS — THE SILENT ACCORD</h1>
                    </div>
                    <div className="text-[#C78D17] text-sm font-semibold tracking-widest">
                        {step === 1 ? "Initial Review" : step === 2 ? "Verification" : "Final Review"}
                    </div>
                </div>

                {/* Form Content */}
                <div className="space-y-16 animate-in fade-in duration-700">

                    {/* STEP 1 */}
                    {step === 1 && (
                        <>
                            {/* Priority Information */}
                            <div className="space-y-8">
                                {/* <h2 className="text-[#EFD9F7] text-xl uppercase tracking-wide">Membership Application</h2> */}

                                {/* Name Fields */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className={GROUP_CLASS}>
                                        <label className={LABEL_CLASS}>* Given Name</label>
                                        <input
                                            type="text"
                                            name="givenName"
                                            value={formData.givenName}
                                            onChange={handleChange}
                                            className={`${INPUT_CLASS} ${errors.givenName ? 'border-red-500' : ''} ${shakeFields.includes('givenName') ? 'animate-shake' : ''}`}
                                            required
                                        />
                                        {errors.givenName && <p className={ERROR_CLASS}>{errors.givenName}</p>}
                                    </div>
                                    <div className={GROUP_CLASS}>
                                        <label className={LABEL_CLASS}>Additional Name (Optional)</label>
                                        <input
                                            type="text"
                                            name="additionalName"
                                            value={formData.additionalName}
                                            onChange={handleChange}
                                            className={`${INPUT_CLASS} ${shakeFields.includes('additionalName') ? 'animate-shake' : ''}`}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className={GROUP_CLASS}>
                                        <label className={LABEL_CLASS}>* Family / Last Name</label>
                                        <input
                                            type="text"
                                            name="familyName"
                                            value={formData.familyName}
                                            onChange={handleChange}
                                            className={`${INPUT_CLASS} ${errors.familyName ? 'border-red-500' : ''} ${shakeFields.includes('familyName') ? 'animate-shake' : ''}`}
                                            required
                                        />
                                        {errors.familyName && <p className={ERROR_CLASS}>{errors.familyName}</p>}
                                    </div>
                                    <div className={GROUP_CLASS}>
                                        <label className={LABEL_CLASS}>Name in Use (Optional)</label>
                                        <input
                                            type="text"
                                            name="nameInUse"
                                            value={formData.nameInUse}
                                            onChange={handleChange}
                                            className={`${INPUT_CLASS} ${shakeFields.includes('nameInUse') ? 'animate-shake' : ''}`}
                                        />
                                    </div>
                                </div>

                                {/* Professional Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className={GROUP_CLASS}>
                                        <label className={LABEL_CLASS}>* Primary Affiliation</label>
                                        <input
                                            type="text"
                                            name="primaryAffiliation"
                                            value={formData.primaryAffiliation}
                                            onChange={handleChange}
                                            className={`${INPUT_CLASS} ${errors.primaryAffiliation ? 'border-red-500' : ''} ${shakeFields.includes('primaryAffiliation') ? 'animate-shake' : ''}`}
                                            required
                                        />
                                        <p className="text-[#EFD9F7]/40 text-xs">Organization or principal entity</p>
                                        {errors.primaryAffiliation && <p className={ERROR_CLASS}>{errors.primaryAffiliation}</p>}
                                    </div>
                                    <div className={GROUP_CLASS}>
                                        <label className={LABEL_CLASS}>* Primary Web Presence</label>
                                        <input
                                            type="text"
                                            name="primaryWebPresence"
                                            value={formData.primaryWebPresence}
                                            onChange={handleChange}
                                            className={`${INPUT_CLASS} ${errors.primaryWebPresence ? 'border-red-500' : ''} ${shakeFields.includes('primaryWebPresence') ? 'animate-shake' : ''}`}
                                            required
                                        />
                                        <p className="text-[#EFD9F7]/40 text-xs">Company Website</p>
                                        {errors.primaryWebPresence && <p className={ERROR_CLASS}>{errors.primaryWebPresence}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className={GROUP_CLASS}>
                                        <label className={LABEL_CLASS}>* Primary Domain</label>
                                        <input
                                            type="text"
                                            name="primaryDomain"
                                            value={formData.primaryDomain}
                                            onChange={handleChange}
                                            className={`${INPUT_CLASS} ${errors.primaryDomain ? 'border-red-500' : ''} ${shakeFields.includes('primaryDomain') ? 'animate-shake' : ''}`}
                                            required
                                        />
                                        <p className="text-[#EFD9F7]/40 text-xs">Primary internet domain</p>
                                        {errors.primaryDomain && <p className={ERROR_CLASS}>{errors.primaryDomain}</p>}
                                    </div>
                                    <div className={GROUP_CLASS}>
                                        <label className={LABEL_CLASS}>* Industry</label>
                                        <CustomDropdown
                                            options={[
                                                'Finance & Banking',
                                                'Private Equity / Venture Capital',
                                                'Family Office Management',
                                                'Luxury Goods & Fashion',
                                                'Aviation & Aerospace',
                                                'Shipping & Logistics',
                                                'Energy & Resources',
                                                'Healthcare & Pharmaceuticals',
                                                'Technology & Software',
                                                'Real Estate & Development',
                                                'Art & Collectibles',
                                                'Sports & Entertainment',
                                                'Other'
                                            ]}
                                            value={formData.industry}
                                            onChange={(val) => handleDropdownChange('industry', val)}
                                            placeholder="Select an answer"
                                            error={errors.industry}
                                            className={shakeFields.includes('industry') ? 'animate-shake' : ''}
                                            required
                                        />
                                        <p className="text-[#EFD9F7]/40 text-xs">Sector of professional focus</p>
                                        {errors.industry && <p className={ERROR_CLASS}>{errors.industry}</p>}
                                        {formData.industry === 'Other' && (
                                            <div className="mt-4 animate-fade-in">
                                                <label className={LABEL_CLASS}>* Please specify your industry</label>
                                                <input
                                                    type="text"
                                                    name="customIndustry"
                                                    value={formData.customIndustry}
                                                    onChange={handleChange}
                                                    className={`${INPUT_CLASS} ${errors.customIndustry ? 'border-red-500' : ''} ${shakeFields.includes('customIndustry') ? 'animate-shake' : ''}`}
                                                    required
                                                />
                                                {errors.customIndustry && <p className={ERROR_CLASS}>{errors.customIndustry}</p>}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className={GROUP_CLASS}>
                                        <label className={LABEL_CLASS}>* Country of Residence</label>
                                        <CustomDropdown
                                            options={countries.map(c => ({ label: c.name, value: c.name }))}
                                            value={formData.country}
                                            onChange={(val) => handleDropdownChange('country', val)}
                                            placeholder="Select Country"
                                            error={errors.country}
                                            searchable
                                            className={shakeFields.includes('country') ? 'animate-shake' : ''}
                                            required
                                        />
                                        {errors.country && <p className={ERROR_CLASS}>{errors.country}</p>}
                                    </div>
                                    {/* <div className={GROUP_CLASS}>
                                        <label className={LABEL_CLASS}>* Primary Postal Code</label>
                                        <input
                                            type="text"
                                            name="primaryPostalCode"
                                            value={formData.primaryPostalCode}
                                            onChange={handleChange}
                                            className={`${INPUT_CLASS} ${errors.primaryPostalCode ? 'border-red-500' : ''} ${shakeFields.includes('primaryPostalCode') ? 'animate-shake' : ''}`}
                                            required
                                        />
                                        {errors.primaryPostalCode && <p className={ERROR_CLASS}>{errors.primaryPostalCode}</p>}
                                    </div> */}
                                </div>

                                {/* Text Areas */}
                                <div className={GROUP_CLASS}>
                                    <label className={LABEL_CLASS}>* Professional Overview</label>
                                    <textarea
                                        name="professionalOverview"
                                        value={formData.professionalOverview}
                                        onChange={handleChange}
                                        rows={5}
                                        className={`${INPUT_CLASS} ${errors.professionalOverview ? 'border-red-500' : ''} ${shakeFields.includes('professionalOverview') ? 'animate-shake' : ''}`}
                                        required
                                    />
                                    {errors.professionalOverview && <p className={ERROR_CLASS}>{errors.professionalOverview}</p>}
                                    <p className="text-[#EFD9F7]/40 text-xs">A concise summary of your current scope of work and areas of focus. (Minimum 120 words)</p>
                                </div>

                                <div className={GROUP_CLASS} id="statement-interest">
                                    <label className={LABEL_CLASS}>* Statement of Interest</label>
                                    <textarea
                                        name="statementOfInterest"
                                        rows={5}
                                        className={`${INPUT_CLASS} ${errors.statementOfInterest ? 'border-red-500' : ''} ${shakeFields.includes('statementOfInterest') ? 'animate-shake' : ''}`}
                                        value={formData.statementOfInterest}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.statementOfInterest && <p className={ERROR_CLASS}>{errors.statementOfInterest}</p>}
                                    <p className="text-[#EFD9F7]/40 text-xs">Describe your interest in the Silent Accord and the context in which access is being sought. (Minimum 120 words)</p>
                                </div>
                            </div>
                        </>
                    )}

                    {/* STEP 2 */}
                    {step === 2 && (
                        <>
                            {/* Verification */}
                            <div className="space-y-8">
                                {/* <h2 className="text-[#EFD9F7] text-xl uppercase tracking-wide">Verification</h2> */}

                                {/* Contact Info */}
                                <div className="grid grid-cols-1 md:grid-cols-[2fr_120px_1fr] gap-8">
                                    <div className={GROUP_CLASS}>
                                        <label className={LABEL_CLASS}>* Authorized Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`${INPUT_CLASS} ${errors.email ? 'border-red-500' : ''} ${shakeFields.includes('email') ? 'animate-shake' : ''}`}
                                            required
                                        />
                                        <p className="text-[#EFD9F7]/40 text-xs">As registered</p>
                                        {errors.email && <p className={ERROR_CLASS}>{errors.email}</p>}
                                    </div>
                                    <div className={GROUP_CLASS}>
                                        <label className={LABEL_CLASS}>* Country Code</label>
                                        <CustomDropdown
                                            options={countries.map(c => ({ label: `${c.code} (${c.name})`, value: c.code }))}
                                            value={formData.code}
                                            onChange={(val) => handleDropdownChange('code', val)}
                                            placeholder="+1"
                                            error={errors.code}
                                            searchable
                                            className={shakeFields.includes('code') ? 'animate-shake' : ''}
                                            required
                                        />
                                        {errors.code && <p className={ERROR_CLASS}>{errors.code}</p>}
                                    </div>
                                    <div className={GROUP_CLASS}>
                                        <label className={LABEL_CLASS}>* Direct Contact Number</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className={`${INPUT_CLASS} ${errors.phone ? 'border-red-500' : ''} ${shakeFields.includes('phone') ? 'animate-shake' : ''}`}
                                            required
                                        />
                                        {errors.phone && <p className={ERROR_CLASS}>{errors.phone}</p>}
                                    </div>
                                </div>

                                {/* Personal Demographics */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* <div className={GROUP_CLASS}>
                                        <label className={LABEL_CLASS}>* Date of Birth</label>
                                        <input
                                            type="date"
                                            name="dob"
                                            value={formData.dob}
                                            onChange={handleChange}
                                            onClick={(e) => e.currentTarget.showPicker()}
                                            className={`${INPUT_CLASS} ${errors.dob ? 'border-red-500' : ''} ${shakeFields.includes('dob') ? 'animate-shake' : ''}`}
                                            required
                                        />
                                        <p className="text-[#EFD9F7]/40 text-xs">DD . MM . YYYY (Pull out calendar)</p>
                                        {errors.dob && <p className={ERROR_CLASS}>{errors.dob}</p>}
                                    </div> */}
                                    <div className={GROUP_CLASS}>
                                        <label className={LABEL_CLASS}>* Gender</label>
                                        <CustomDropdown
                                            options={['Male', 'Female', 'Others']}
                                            value={formData.gender}
                                            onChange={(val) => handleDropdownChange('gender', val)}
                                            placeholder="Select option"
                                            error={errors.gender}
                                            className={shakeFields.includes('gender') ? 'animate-shake' : ''}
                                            required
                                        />
                                        {errors.gender && <p className={ERROR_CLASS}>{errors.gender}</p>}
                                    </div>
                                </div>

                                {/* Detailed Address */}
                                {/* <div className="space-y-8 pt-8 border-t border-[#EFD9F7]/10">
                                    <h2 className="text-[#EFD9F7]/80 text-sm uppercase tracking-widest">Primary Residence Details</h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className={GROUP_CLASS}>
                                            <label className={LABEL_CLASS}>* Primary Address</label>
                                            <input
                                                type="text"
                                                name="address1"
                                                value={formData.address1}
                                                onChange={handleChange}
                                                className={`${INPUT_CLASS} ${errors.address1 ? 'border-red-500' : ''} ${shakeFields.includes('address1') ? 'animate-shake' : ''}`}
                                                required
                                            />
                                            {errors.address1 && <p className={ERROR_CLASS}>{errors.address1}</p>}
                                        </div>
                                        <div className={GROUP_CLASS}>
                                            <label className={LABEL_CLASS}>Secondary Address (Optional)</label>
                                            <input
                                                type="text"
                                                name="address2"
                                                value={formData.address2}
                                                onChange={handleChange}
                                                className={INPUT_CLASS}
                                            />
                                        </div>
                                    </div>

                                    <div className={GROUP_CLASS}>
                                        <label className={LABEL_CLASS}>Additional Address Information</label>
                                        <input
                                            type="text"
                                            name="suite"
                                            value={formData.suite}
                                            onChange={handleChange}
                                            className={INPUT_CLASS}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className={GROUP_CLASS}>
                                            <label className={LABEL_CLASS}>* City of Residence</label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleChange}
                                                className={`${INPUT_CLASS} ${errors.city ? 'border-red-500' : ''} ${shakeFields.includes('city') ? 'animate-shake' : ''}`}
                                                required
                                            />
                                            {errors.city && <p className={ERROR_CLASS}>{errors.city}</p>}
                                        </div>
                                        <div className={GROUP_CLASS}>
                                            <label className={LABEL_CLASS}>* State / Region</label>
                                            <input
                                                type="text"
                                                name="state"
                                                value={formData.state}
                                                onChange={handleChange}
                                                className={`${INPUT_CLASS} ${errors.state ? 'border-red-500' : ''} ${shakeFields.includes('state') ? 'animate-shake' : ''}`}
                                                required
                                            />
                                            {errors.state && <p className={ERROR_CLASS}>{errors.state}</p>}
                                        </div>
                                    </div>
                                </div> */}

                                {/* Administrative Contact */}
                                <div className="space-y-8 pt-8 border-t border-[#EFD9F7]/10">
                                    <h2 className="text-[#EFD9F7]/80 text-sm uppercase tracking-widest">Administrative Contact (Optional)</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        <div className={GROUP_CLASS}>
                                            <label className={LABEL_CLASS}>Administrative Contact Name (Optional)</label>
                                            <input
                                                type="text"
                                                name="assistantName"
                                                value={formData.assistantName}
                                                onChange={handleChange}
                                                className={INPUT_CLASS}
                                            />
                                        </div>
                                        <div className={GROUP_CLASS}>
                                            <label className={LABEL_CLASS}>Administrative Contact Email (Optional)</label>
                                            <input
                                                type="email"
                                                name="assistantEmail"
                                                value={formData.assistantEmail}
                                                onChange={handleChange}
                                                className={`${INPUT_CLASS} ${errors.assistantEmail ? 'border-red-500' : ''}`}
                                            />
                                            {errors.assistantEmail && <p className={ERROR_CLASS}>{errors.assistantEmail}</p>}
                                        </div>
                                        <div className={GROUP_CLASS}>
                                            <label className={LABEL_CLASS}>Administrative Contact Number (Optional)</label>
                                            <input
                                                type="tel"
                                                name="assistantPhone"
                                                value={formData.assistantPhone}
                                                onChange={handleChange}
                                                className={`${INPUT_CLASS} ${errors.assistantPhone ? 'border-red-500' : ''}`}
                                            />
                                            {errors.assistantPhone && <p className={ERROR_CLASS}>{errors.assistantPhone}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Documentation */}
                                <div className="space-y-8 pt-8 border-t border-[#EFD9F7]/10">
                                    <h2 className="text-[#EFD9F7] text-xl uppercase tracking-wide">Documentation</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className={GROUP_CLASS}>
                                            <label className={LABEL_CLASS}>* Identification Photograph</label>
                                            <div className={`relative border border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center transition-colors ${errors.profilePicture ? 'border-red-500 bg-red-500/10' : 'border-[#EFD9F7]/30 hover:border-[#C78D17] hover:bg-[#C78D17]/5'} ${shakeFields.includes('profilePicture') ? 'animate-shake' : ''}`}>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleFileChange(e, 'profilePicture')}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                />
                                                <div className="flex flex-col items-center gap-2 pointer-events-none">
                                                    <Camera className="w-8 h-8 text-[#EFD9F7]" />
                                                    <span className="font-semibold text-sm text-[#EFD9F7]">{formData.profilePicture ? formData.profilePicture.name : 'Click to Upload'}</span>
                                                    <span className="text-[#EFD9F7]/50 text-xs">
                                                        Clear, recent photograph for verification purposes only.<br />
                                                        (Maximum size: 5MB)
                                                    </span>
                                                </div>
                                            </div>
                                            {errors.profilePicture && <p className={ERROR_CLASS}>{errors.profilePicture}</p>}
                                        </div>

                                        <div className={GROUP_CLASS}>
                                            <label className={LABEL_CLASS}>* Government-Issued Identification</label>
                                            <div className={`relative border border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center transition-colors ${errors.idDocument ? 'border-red-500 bg-red-500/10' : 'border-[#EFD9F7]/30 hover:border-[#C78D17] hover:bg-[#C78D17]/5'} ${shakeFields.includes('idDocument') ? 'animate-shake' : ''}`}>
                                                <input
                                                    type="file"
                                                    accept="image/*,.pdf"
                                                    onChange={(e) => handleFileChange(e, 'idDocument')}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                />
                                                <div className="flex flex-col items-center gap-2 pointer-events-none">
                                                    <CreditCard className="w-8 h-8 text-[#EFD9F7]" />
                                                    <span className="font-semibold text-sm text-[#EFD9F7]">{formData.idDocument ? formData.idDocument.name : 'Click to Upload'}</span>
                                                    <span className="text-[#EFD9F7]/50 text-xs">
                                                        Clear, recent photograph for verification purposes only.<br />
                                                        (Maximum size: 5MB)
                                                    </span>
                                                </div>
                                            </div>
                                            {errors.idDocument && <p className={ERROR_CLASS}>{errors.idDocument}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* STEP 3 */}
                    {step === 3 && (
                        <>
                            {/* Access Tier Selection */}
                            <div className="space-y-8">
                                <h2 className="text-[#EFD9F7] text-xl uppercase tracking-wide">Access Tier Selection</h2>

                                <div className="grid grid-cols-1 gap-4">
                                    {[
                                        { id: 'tier-1', title: 'AXIS · Tier I Access', price: 'USD 5,000', note: 'Extended upon approval' },
                                        { id: 'tier-2', title: 'VAULT · Tier II Access', price: 'USD 10,000', note: 'Extended upon approval' },
                                        { id: 'tier-3', title: 'COTERIE · Tier III Access', price: 'USD 30,000', note: 'Extended by private invitation' }
                                    ].map((tier) => (
                                        <div
                                            key={tier.id}
                                            onClick={() => setSelectedTier(tier.id)}
                                            className={`border rounded-lg p-6 cursor-pointer transition-all ${selectedTier === tier.id ? 'border-[#C78D17] bg-[#C78D17]/10' : 'border-[#EFD9F7]/30 hover:border-[#EFD9F7]/60'}`}
                                        >
                                            <div className="font-semibold text-lg text-[#EFD9F7]">{tier.title}</div>
                                            <div className="text-sm mt-2">
                                                <span className="text-[#EFD9F7]/80">Annual Consideration: </span>
                                                <span className="font-medium text-[#EFD9F7]">{tier.price} (Excl. Tax)</span>
                                            </div>
                                            <div className="text-[#EFD9F7]/50 text-xs italic mt-1">{tier.note}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="text-[#EFD9F7]/60 text-sm">
                                    Initial Processing: <span className="text-[#EFD9F7]">USD 500</span> (One-time, Non-Refundable, Excl. Tax) *
                                    <br />
                                    <span className="text-xs text-[#EFD9F7]/40 block mt-2 leading-relaxed">
                                        Billing information is collected to facilitate review and verification. Annual consideration is processed only after access has been approved.
                                    </span>
                                </div>

                                {/* Billing Information */}
                                <div className="space-y-6 pt-8 border-t border-[#EFD9F7]/10">
                                    <h2 className="text-[#EFD9F7] text-xl uppercase tracking-wide">Billing Information</h2>

                                    <div className="space-y-2">
                                        <h3 className="font-semibold text-[#EFD9F7]">Payment Method</h3>
                                        <h4 className="font-medium text-[#EFD9F7]">Credit Card</h4>
                                        <p className="text-[#EFD9F7]/40 text-xs">Select the method to be used for processing verification charges.</p>
                                    </div>

                                    <div className={GROUP_CLASS}>
                                        <label className={LABEL_CLASS}>Authorized Cardholder Name</label>
                                        <input
                                            type="text"
                                            name="cardName"
                                            value={formData.cardName}
                                            onChange={handleChange}
                                            className={INPUT_CLASS}
                                            placeholder="Name as it appears on the card"
                                        />
                                        {errors.cardName && <p className={ERROR_CLASS}>{errors.cardName}</p>}
                                    </div>

                                    <div className="grid grid-cols-[2fr_1fr_1fr] gap-4">
                                        <div className={GROUP_CLASS}>
                                            <label className={LABEL_CLASS}>Card Number</label>
                                            <input
                                                type="text"
                                                name="cardNumber"
                                                value={formData.cardNumber}
                                                onChange={handleChange}
                                                className={INPUT_CLASS}
                                                placeholder="0000 0000 0000 0000"
                                            />
                                            {errors.cardNumber && <p className={ERROR_CLASS}>{errors.cardNumber}</p>}
                                        </div>
                                        <div className={GROUP_CLASS}>
                                            <label className={LABEL_CLASS}>Expiry (MM / YY)</label>
                                            <input
                                                type="text"
                                                name="cardExpiry"
                                                value={formData.cardExpiry}
                                                onChange={handleChange}
                                                className={INPUT_CLASS}
                                                placeholder="MM / YY"
                                            />
                                            {errors.cardExpiry && <p className={ERROR_CLASS}>{errors.cardExpiry}</p>}
                                        </div>
                                        <div className={GROUP_CLASS}>
                                            <label className={LABEL_CLASS}>CVV</label>
                                            <input
                                                type="text"
                                                name="cardCvc"
                                                value={formData.cardCvc}
                                                onChange={handleChange}
                                                className={INPUT_CLASS}
                                                placeholder="123"
                                            />
                                            {errors.cardCvc && <p className={ERROR_CLASS}>{errors.cardCvc}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Notices */}
                                <div className="space-y-6 pt-8 border-t border-[#EFD9F7]/10">
                                    <div>
                                        <h3 className="text-[#EFD9F7]/60 text-sm font-semibold mb-2">Authorization Notice </h3>
                                        <p className="text-[#EFD9F7]/50 text-xs leading-relaxed">
                                            By providing billing information, you authorize The Silent Accord to process the non-refundable initial processing charge (Excl. Tax) for review purposes.
                                            <br />
                                            No annual consideration will be processed unless access is approved.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-[#EFD9F7] font-semibold mb-2">Review Notice</h3>
                                        <p className="text-[#EFD9F7]/70 text-sm leading-relaxed">
                                            Please review all details carefully prior to submission.
                                            <br />
                                            Submissions are reviewed privately and without fixed timelines. Not all reviews receive further correspondence.
                                        </p>
                                    </div>
                                </div>

                                {/* Consent */}
                                <div className="space-y-4 pt-8 border-t border-[#EFD9F7]/10">
                                    <h3 className="text-[#EFD9F7] font-semibold">Consent to Review and Processing</h3>

                                    <label className="flex items-start gap-4 cursor-pointer group">
                                        <div className={`mt-1 w-5 h-5 border rounded flex items-center justify-center transition-colors ${formData.consentProcessing ? 'bg-[#C78D17] border-[#C78D17]' : 'border-[#EFD9F7]/50 group-hover:border-[#C78D17]'}`}>
                                            {formData.consentProcessing && <span className="text-white text-xs">✔</span>}
                                        </div>
                                        <input
                                            type="checkbox"
                                            name="consentProcessing"
                                            checked={formData.consentProcessing}
                                            onChange={handleChange}
                                            className="hidden"
                                        />
                                        <span className="text-[#EFD9F7]/80 text-sm flex-1">
                                            I authorize The Silent Accord to review and process the information provided for the purposes of access consideration.
                                        </span>
                                    </label>

                                    <label className="flex items-start gap-4 cursor-pointer group">
                                        <div className={`mt-1 w-5 h-5 border rounded flex items-center justify-center transition-colors ${formData.consentTerms ? 'bg-[#C78D17] border-[#C78D17]' : 'border-[#EFD9F7]/50 group-hover:border-[#C78D17]'}`}>
                                            {formData.consentTerms && <span className="text-white text-xs">✔</span>}
                                        </div>
                                        <input
                                            type="checkbox"
                                            name="consentTerms"
                                            checked={formData.consentTerms}
                                            onChange={handleChange}
                                            className="hidden"
                                        />
                                        <span className="text-[#EFD9F7]/80 text-sm flex-1">
                                            I acknowledge the applicable <a href="/terms-of-service" target="_blank" className="underline hover:text-[#C78D17] transition-colors">Terms of Access</a> and <a href="/privacy-policy" target="_blank" className="underline hover:text-[#C78D17] transition-colors">Privacy Policy</a>.
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Navigation Buttons */}
                    <div className="grid gap-8 pt-12 border-t border-[#C78D17]/30 mt-12">
                        <div className="flex justify-between items-center w-full">
                            {step > 1 ? (
                                <button onClick={handlePrev} className="text-[#EFD9F7]/60 hover:text-[#C78D17] uppercase tracking-widest text-sm transition-colors">
                                    Return
                                </button>
                            ) : (
                                <div />
                            )}

                            {step < 3 ? (
                                <button
                                    onClick={handleNext}
                                    className="px-12 py-4 bg-[#C78D17] text-[#3D0066] font-semibold uppercase tracking-widest text-sm hover:bg-[#EFD9F7] transition-colors"
                                >
                                    Continue Review
                                </button>
                            ) : (
                                <div className="flex flex-col gap-4 items-end">
                                    <div className="flex justify-center my-4">
                                        <ReCAPTCHA
                                            ref={recaptchaRef}
                                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "YOUR_SITE_KEY"}
                                            onChange={onCaptchaChange}
                                            theme="dark"
                                        />
                                    </div>
                                    <button
                                        onClick={handleSubmit}
                                        disabled={!formData.consentProcessing || !formData.consentTerms}
                                        className={`px-12 py-4 font-semibold uppercase tracking-widest text-sm transition-colors w-full md:w-auto ${(!formData.consentProcessing || !formData.consentTerms)
                                            ? 'bg-[#EFD9F7]/10 text-[#EFD9F7]/30 cursor-not-allowed'
                                            : 'bg-[#C78D17] text-[#3D0066] hover:bg-[#EFD9F7]'
                                            }`}
                                    >
                                        Submit For Review
                                    </button>
                                </div>
                            )}
                        </div>

                        {step === 3 && (
                            <div className="flex justify-center pt-8">
                                <a
                                    href="/disclaimer"
                                    target="_blank"
                                    className="text-[#EFD9F7]/40 hover:text-[#C78D17] text-xs uppercase tracking-widest transition-colors"
                                >
                                    Disclaimer
                                </a>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </section >
    );
};

export default ApplicationForm;
