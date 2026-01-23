'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ReCAPTCHA from 'react-google-recaptcha';
import { countries } from '@/data/countries';
import CustomDropdown from '../ui/CustomDropdown';

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
        firstName: '', middleName: '', lastName: '', preferredName: '',
        companyWebsite: '', industry: '', customIndustry: '', professionalBackground: '',
        membershipInterest: '',
        zipCode: '', country: '',
        email: '', code: '+1', phone: '',
        dob: '', gender: '',
        address1: '', suite: '', address2: '', city: '', state: '',
        company: '',
        assistantName: '', assistantEmail: '', assistantPhone: '',
        profilePicture: null as File | null, idDocument: null as File | null,
        cardName: '', cardNumber: '', cardExpiry: '', cardCvc: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [shakeFields, setShakeFields] = useState<string[]>([]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
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
        if (!value && name !== 'middleName' && name !== 'preferredName' && name !== 'suite' && name !== 'address2' && name !== 'assistantName' && name !== 'assistantEmail' && name !== 'assistantPhone' && name !== 'customIndustry') return 'This field is required';

        if (name === 'customIndustry' && formData.industry === 'Other' && !value) return 'Please specify your industry';

        switch (name) {
            case 'companyWebsite':
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
            case 'membershipInterest':
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
        let isValid = true;

        const step1Fields = ['firstName', 'lastName', 'companyWebsite', 'company', 'industry', 'professionalBackground', 'membershipInterest', 'zipCode', 'country'];
        if (formData.industry === 'Other') step1Fields.push('customIndustry');
        const step2Fields = ['email', 'code', 'phone', 'dob', 'gender', 'address1', 'city', 'state', 'profilePicture', 'idDocument'];

        const fieldsToValidate = currentStep === 1 ? step1Fields : (currentStep === 2 ? step2Fields : []);

        const invalidFields: string[] = [];

        fieldsToValidate.forEach(field => {
            const error = validateField(field, formData[field as keyof typeof formData]);
            if (error) {
                newErrors[field] = error;
                invalidFields.push(field);
                isValid = false;
            }
        });

        if (currentStep === 1 && newErrors['membershipInterest']) {
            // specific logic handled in validateField but ensure UI scroll
            const element = document.getElementById('membership-interest');
            if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        // setErrors(prev => ({ ...prev, ...newErrors }));
        // if (invalidFields.length > 0) triggerShake(invalidFields);
        // return isValid;
        return true; // Temporary validation bypass
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
                        <h1 className="text-3xl uppercase tracking-wide text-[#EFD9F7]">Membership Application - The Silent Accord</h1>
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
                            {/* Priority Information */}
                            <div className="space-y-8">
                                <h2 className="text-[#EFD9F7] text-xl uppercase tracking-wide">Membership Application</h2>

                                {/* 2. Full Name */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className={GROUP_CLASS}>
                                        <label className={LABEL_CLASS}>* First Name</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className={`${INPUT_CLASS} ${errors.firstName ? 'border-red-500' : ''} ${shakeFields.includes('firstName') ? 'animate-shake' : ''}`}
                                            required
                                        />
                                        {errors.firstName && <p className={ERROR_CLASS}>{errors.firstName}</p>}
                                    </div>
                                    <div className={GROUP_CLASS}>
                                        <label className={LABEL_CLASS}>Middle Name</label>
                                        <input
                                            type="text"
                                            name="middleName"
                                            value={formData.middleName}
                                            onChange={handleChange}
                                            className={`${INPUT_CLASS} ${shakeFields.includes('middleName') ? 'animate-shake' : ''}`}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className={GROUP_CLASS}>
                                        <label className={LABEL_CLASS}>* Last Name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className={`${INPUT_CLASS} ${errors.lastName ? 'border-red-500' : ''} ${shakeFields.includes('lastName') ? 'animate-shake' : ''}`}
                                            required
                                        />
                                        {errors.lastName && <p className={ERROR_CLASS}>{errors.lastName}</p>}
                                    </div>
                                    <div className={GROUP_CLASS}>
                                        <label className={LABEL_CLASS}>Preferred Name</label>
                                        <input
                                            type="text"
                                            name="preferredName"
                                            value={formData.preferredName}
                                            onChange={handleChange}
                                            placeholder="e.g. Magic Johnson"
                                            className={`${INPUT_CLASS} ${shakeFields.includes('preferredName') ? 'animate-shake' : ''}`}
                                        />
                                    </div>
                                </div>

                                {/* 4 & 5. Company Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className={GROUP_CLASS}>
                                        <label className={LABEL_CLASS}>* Company Name</label>
                                        <input
                                            type="text"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            className={`${INPUT_CLASS} ${errors.company ? 'border-red-500' : ''} ${shakeFields.includes('company') ? 'animate-shake' : ''}`}
                                            required
                                        />
                                        {errors.company && <p className={ERROR_CLASS}>{errors.company}</p>}
                                    </div>
                                    <div className={GROUP_CLASS}>
                                        <label className={LABEL_CLASS}>* Company Website</label>
                                        <input
                                            type="text"
                                            name="companyWebsite"
                                            value={formData.companyWebsite}
                                            onChange={handleChange}
                                            className={`${INPUT_CLASS} ${errors.companyWebsite ? 'border-red-500' : ''} ${shakeFields.includes('companyWebsite') ? 'animate-shake' : ''}`}
                                            required
                                        />
                                        {errors.companyWebsite && <p className={ERROR_CLASS}>{errors.companyWebsite}</p>}
                                    </div>
                                </div>

                                {/* 6. Industry */}
                                <div className={GROUP_CLASS}>
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

                                {/* 7. Professional Background */}
                                <div className={GROUP_CLASS}>
                                    <label className={LABEL_CLASS}>* Professional Background</label>
                                    <textarea
                                        name="professionalBackground"
                                        value={formData.professionalBackground}
                                        onChange={handleChange}
                                        rows={5}
                                        className={`${INPUT_CLASS} ${errors.professionalBackground ? 'border-red-500' : ''} ${shakeFields.includes('professionalBackground') ? 'animate-shake' : ''}`}
                                        required
                                    />
                                    {errors.professionalBackground && <p className={ERROR_CLASS}>{errors.professionalBackground}</p>}
                                    <p className="text-[#EFD9F7]/40 text-xs">Tell us about your professional work and passions</p>
                                </div>

                                {/* 9. Membership Interest */}
                                <div className={GROUP_CLASS} id="membership-interest">
                                    <label className={LABEL_CLASS}>* Membership Interest</label>
                                    <textarea
                                        name="membershipInterest"
                                        rows={5}
                                        className={`${INPUT_CLASS} ${errors.membershipInterest ? 'border-red-500' : ''} ${shakeFields.includes('membershipInterest') ? 'animate-shake' : ''}`}
                                        value={formData.membershipInterest}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.membershipInterest && <p className={ERROR_CLASS}>{errors.membershipInterest}</p>}
                                    <p className="text-[#EFD9F7]/40 text-xs">Why do you like to join The Silent Accord? (Minimum 120 words)</p>
                                </div>

                                {/* 1. Zip & Country */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className={GROUP_CLASS}>
                                        <label className={LABEL_CLASS}>* Zip / Postal Code</label>
                                        <input
                                            type="text"
                                            name="zipCode"
                                            value={formData.zipCode}
                                            onChange={handleChange}
                                            className={`${INPUT_CLASS} ${errors.zipCode ? 'border-red-500' : ''} ${shakeFields.includes('zipCode') ? 'animate-shake' : ''}`}
                                            required
                                        />
                                        {errors.zipCode && <p className={ERROR_CLASS}>{errors.zipCode}</p>}
                                    </div>
                                    <div className={GROUP_CLASS}>
                                        <label className={LABEL_CLASS}>* Country</label>
                                        <CustomDropdown
                                            options={countries.map(c => ({ label: c.name, value: c.name }))}
                                            value={formData.country}
                                            onChange={(val) => handleDropdownChange('country', val)}
                                            placeholder="Select an answer"
                                            error={errors.country}
                                            searchable
                                            className={shakeFields.includes('country') ? 'animate-shake' : ''}
                                            required
                                        />
                                        {errors.country && <p className={ERROR_CLASS}>{errors.country}</p>}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* STEP 2 */}
                    {step === 2 && (
                        <>
                            {/* Contact & Personal Details */}
                            <div className="space-y-8">
                                <h2 className="text-[#EFD9F7] text-xl uppercase tracking-wide">Additional Details</h2>

                                {/* Contact Info (Moved from Step 1) */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className={GROUP_CLASS}>
                                        <label className={LABEL_CLASS}>* Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`${INPUT_CLASS} ${errors.email ? 'border-red-500' : ''} ${shakeFields.includes('email') ? 'animate-shake' : ''}`}
                                            required
                                        />
                                        {errors.email && <p className={ERROR_CLASS}>{errors.email}</p>}
                                    </div>
                                    <div className="grid grid-cols-[140px_1fr] gap-2">
                                        <div className={GROUP_CLASS}>
                                            <label className={LABEL_CLASS}>* Code</label>
                                            <CustomDropdown
                                                options={countries.map(c => ({ label: `${c.code} (${c.name})`, value: c.code }))}
                                                value={formData.code}
                                                onChange={(val) => handleDropdownChange('code', val)}
                                                placeholder="Code"
                                                error={errors.code}
                                                searchable
                                                className={shakeFields.includes('code') ? 'animate-shake' : ''}
                                                required
                                            />
                                            {errors.code && <p className={ERROR_CLASS}>{errors.code}</p>}
                                        </div>
                                        <div className={GROUP_CLASS}>
                                            <label className={LABEL_CLASS}>* Phone Number</label>
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
                                </div>

                                {/* Personal Demographics (Moved from Step 1) */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className={GROUP_CLASS}>
                                        <label className={LABEL_CLASS}>* Date of Birth</label>
                                        <input
                                            type="date"
                                            name="dob"
                                            value={formData.dob}
                                            onChange={handleChange}
                                            className={`${INPUT_CLASS} ${errors.dob ? 'border-red-500' : ''} ${shakeFields.includes('dob') ? 'animate-shake' : ''}`}
                                            required
                                        />
                                        {errors.dob && <p className={ERROR_CLASS}>{errors.dob}</p>}
                                    </div>
                                    <div className={GROUP_CLASS}>
                                        <label className={LABEL_CLASS}>* Gender</label>
                                        <CustomDropdown
                                            options={['Male', 'Female', 'Others']}
                                            value={formData.gender}
                                            onChange={(val) => handleDropdownChange('gender', val)}
                                            placeholder="Select an answer"
                                            error={errors.gender}
                                            className={shakeFields.includes('gender') ? 'animate-shake' : ''}
                                            required
                                        />
                                        {errors.gender && <p className={ERROR_CLASS}>{errors.gender}</p>}
                                    </div>
                                </div>

                                {/* Detailed Address (Remaining fields from Step 1's Address section) */}
                                <div className="space-y-8 pt-8 border-t border-[#EFD9F7]/10">
                                    <h2 className="text-[#EFD9F7]/80 text-sm uppercase tracking-widest">Primary Residence Details</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className={GROUP_CLASS}>
                                            <label className={LABEL_CLASS}>* Address Line 1</label>
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
                                            <label className={LABEL_CLASS}>Suite / Apt / Villa </label>
                                            <input
                                                type="text"
                                                name="suite"
                                                value={formData.suite}
                                                onChange={handleChange}
                                                className={INPUT_CLASS}
                                            />
                                        </div>
                                    </div>
                                    <div className={GROUP_CLASS}>
                                        <label className={LABEL_CLASS}>Address Line 2</label>
                                        <input
                                            type="text"
                                            name="address2"
                                            value={formData.address2}
                                            onChange={handleChange}
                                            className={INPUT_CLASS}
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className={GROUP_CLASS}>
                                            <label className={LABEL_CLASS}>* City</label>
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
                                            <label className={LABEL_CLASS}>* State or County or province</label>
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
                                </div>

                                {/* Social & Assistant (From Step 2) */}
                                <div className="space-y-8 pt-8 border-t border-[#EFD9F7]/10">
                                    {/* Company Name moved to Step 1 */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        <div className={GROUP_CLASS}>
                                            <label className={LABEL_CLASS}>Assistant Name</label>
                                            <input
                                                type="text"
                                                name="assistantName"
                                                value={formData.assistantName}
                                                onChange={handleChange}
                                                className={INPUT_CLASS}
                                            />
                                        </div>
                                        <div className={GROUP_CLASS}>
                                            <label className={LABEL_CLASS}>Assistant Email</label>
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
                                            <label className={LABEL_CLASS}>Assistant Telephone</label>
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

                                {/* Documents (Moved from Step 1) */}
                                <div className="space-y-8 pt-8 border-t border-[#EFD9F7]/10">
                                    <h2 className="text-[#EFD9F7] text-xl uppercase tracking-wide">Documentation</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className={GROUP_CLASS}>
                                            <label className={LABEL_CLASS}>* Profile Picture</label>
                                            <div className={`relative border border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center transition-colors ${errors.profilePicture ? 'border-red-500 bg-red-500/10' : 'border-[#EFD9F7]/30 hover:border-[#C78D17] hover:bg-[#C78D17]/5'} ${shakeFields.includes('profilePicture') ? 'animate-shake' : ''}`}>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleFileChange(e, 'profilePicture')}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                />
                                                <div className="flex flex-col items-center gap-2 pointer-events-none">
                                                    <span className="text-2xl">☁</span>
                                                    <span className="font-semibold text-sm text-[#EFD9F7]">{formData.profilePicture ? formData.profilePicture.name : 'Click to Upload'}</span>
                                                    <span className="text-[#EFD9F7]/50 text-xs">Please provide a clear, recent headshot in high-resolution (Max 5MB)</span>
                                                </div>
                                            </div>
                                            {errors.profilePicture && <p className={ERROR_CLASS}>{errors.profilePicture}</p>}
                                        </div>

                                        <div className={GROUP_CLASS}>
                                            <label className={LABEL_CLASS}>* Driver License or Govt Issued ID</label>
                                            <div className={`relative border border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center transition-colors ${errors.idDocument ? 'border-red-500 bg-red-500/10' : 'border-[#EFD9F7]/30 hover:border-[#C78D17] hover:bg-[#C78D17]/5'} ${shakeFields.includes('idDocument') ? 'animate-shake' : ''}`}>
                                                <input
                                                    type="file"
                                                    accept="image/*,.pdf"
                                                    onChange={(e) => handleFileChange(e, 'idDocument')}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                />
                                                <div className="flex flex-col items-center gap-2 pointer-events-none">
                                                    <span className="text-2xl">☁</span>
                                                    <span className="font-semibold text-sm text-[#EFD9F7]">{formData.idDocument ? formData.idDocument.name : 'Click to Upload'}</span>
                                                    <span className="text-[#EFD9F7]/50 text-xs">Please provide a clear photo of your ID (Max 5MB)</span>
                                                </div>
                                            </div>
                                            {errors.idDocument && <p className={ERROR_CLASS}>{errors.idDocument}</p>}
                                        </div>
                                    </div>
                                </div>
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
                                    {/* AXIS */}
                                    <div
                                        onClick={() => setSelectedTier('tier-1')}
                                        className={`border ${selectedTier === 'tier-1' ? 'border-[#C78D17] bg-[#C78D17]/10' : 'border-[#EFD9F7]/20'} rounded-lg p-6 cursor-pointer hover:border-[#C78D17] transition-all flex items-start gap-4`}
                                    >
                                        <div className={`w-6 h-6 rounded-full border border-[#EFD9F7] flex items-center justify-center shrink-0 ${selectedTier === 'tier-1' ? 'border-[#C78D17]' : ''}`}>
                                            {selectedTier === 'tier-1' && <div className="w-3 h-3 rounded-full bg-[#C78D17]" />}
                                        </div>
                                        <div>
                                            <h3 className="text-[#EFD9F7] text-sm font-bold uppercase underline decoration-[#C78D17] underline-offset-4 mb-2">AXIS Membership</h3>
                                            <p className="text-[#EFD9F7] text-xl mb-1">Registration Fee: $5,000 <span className="text-sm">(Excl. Tax)</span></p>
                                            <p className="text-[#EFD9F7]/60 text-xs italic">Annual access payment applicable upon acceptance.</p>
                                        </div>
                                    </div>

                                    {/* VAULT */}
                                    <div
                                        onClick={() => setSelectedTier('tier-2')}
                                        className={`border ${selectedTier === 'tier-2' ? 'border-[#C78D17] bg-[#C78D17]/10' : 'border-[#EFD9F7]/20'} rounded-lg p-6 cursor-pointer hover:border-[#C78D17] transition-all flex items-start gap-4`}
                                    >
                                        <div className={`w-6 h-6 rounded-full border border-[#EFD9F7] flex items-center justify-center shrink-0 ${selectedTier === 'tier-2' ? 'border-[#C78D17]' : ''}`}>
                                            {selectedTier === 'tier-2' && <div className="w-3 h-3 rounded-full bg-[#C78D17]" />}
                                        </div>
                                        <div>
                                            <h3 className="text-[#EFD9F7] text-sm font-bold uppercase underline decoration-[#C78D17] underline-offset-4 mb-2">VAULT Membership</h3>
                                            <p className="text-[#EFD9F7] text-xl mb-1">Registration Fee: $10,000 <span className="text-sm">(Excl. Tax)</span></p>
                                            <p className="text-[#EFD9F7]/60 text-xs italic">Annual access payment applicable upon acceptance.</p>
                                        </div>
                                    </div>

                                    {/* COTERIE */}
                                    <div
                                        onClick={() => setSelectedTier('tier-3')}
                                        className={`border ${selectedTier === 'tier-3' ? 'border-[#C78D17] bg-[#C78D17]/10' : 'border-[#EFD9F7]/20'} rounded-lg p-6 cursor-pointer hover:border-[#C78D17] transition-all flex items-start gap-4`}
                                    >
                                        <div className={`w-6 h-6 rounded-full border border-[#EFD9F7] flex items-center justify-center shrink-0 ${selectedTier === 'tier-3' ? 'border-[#C78D17]' : ''}`}>
                                            {selectedTier === 'tier-3' && <div className="w-3 h-3 rounded-full bg-[#C78D17]" />}
                                        </div>
                                        <div>
                                            <h3 className="text-[#EFD9F7] text-sm font-bold uppercase underline decoration-[#C78D17] underline-offset-4 mb-2">COTERIE Membership</h3>
                                            <p className="text-[#EFD9F7] text-xl mb-1">Registration Fee: $30,000 <span className="text-sm">(Excl. Tax)</span></p>
                                            <p className="text-[#EFD9F7]/60 text-xs italic">Annual access payment applicable upon acceptance.</p>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-[#C78D17] text-xs italic mt-2">
                                    * Registration charges are non-refundable.
                                </p>
                            </div>

                            {/* Payment Section */}
                            <div className="space-y-8 pt-8 border-t border-[#EFD9F7]/10">
                                <div className="space-y-4">
                                    <p className="text-[#EFD9F7]/80 text-sm leading-relaxed">
                                        Your provided billing details will not be charged until your membership application has been reviewed and accepted by our Board. At which point you will be notified via Email and have 2 working days to confirm your membership.
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

                                    <div className={GROUP_CLASS}>
                                        <label className={LABEL_CLASS}>* Name on Credit Card</label>
                                        <input
                                            type="text"
                                            name="cardName"
                                            value={formData.cardName}
                                            onChange={handleChange}
                                            placeholder="Enter Name on Card"
                                            className={`${INPUT_CLASS} ${errors.cardName ? 'border-red-500' : ''} ${shakeFields.includes('cardName') ? 'animate-shake' : ''}`}
                                            required
                                        />
                                        {errors.cardName && <p className={ERROR_CLASS}>{errors.cardName}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[#EFD9F7] text-xs font-bold uppercase tracking-wider">* Payment Details</label>
                                        <input
                                            type="text"
                                            name="cardNumber"
                                            value={formData.cardNumber}
                                            onChange={handleChange}
                                            placeholder="Card number"
                                            className={`w-full bg-white text-black p-4 outline-none rounded-sm placeholder-gray-400 ${errors.cardNumber ? 'border-2 border-red-500' : ''} ${shakeFields.includes('cardNumber') ? 'animate-shake' : ''}`}
                                            required
                                        />
                                        {errors.cardNumber && <p className={ERROR_CLASS}>{errors.cardNumber}</p>}
                                        <div className="grid grid-cols-2 gap-4 mt-4">
                                            <div>
                                                <input
                                                    type="text"
                                                    name="cardExpiry"
                                                    value={formData.cardExpiry}
                                                    onChange={handleChange}
                                                    placeholder="MM / YY"
                                                    className={`w-full bg-white text-black p-4 outline-none rounded-sm placeholder-gray-400 ${errors.cardExpiry ? 'border-2 border-red-500' : ''} ${shakeFields.includes('cardExpiry') ? 'animate-shake' : ''}`}
                                                    required
                                                />
                                                {errors.cardExpiry && <p className={ERROR_CLASS}>{errors.cardExpiry}</p>}
                                            </div>
                                            <div>
                                                <input
                                                    type="text"
                                                    name="cardCvc"
                                                    value={formData.cardCvc}
                                                    onChange={handleChange}
                                                    placeholder="CVC"
                                                    className={`w-full bg-white text-black p-4 outline-none rounded-sm placeholder-gray-400 ${errors.cardCvc ? 'border-2 border-red-500' : ''} ${shakeFields.includes('cardCvc') ? 'animate-shake' : ''}`}
                                                    required
                                                />
                                                {errors.cardCvc && <p className={ERROR_CLASS}>{errors.cardCvc}</p>}
                                            </div>
                                        </div>
                                    </div>



                                    <p className="text-[#EFD9F7]/60 text-xs text-justify">
                                        By providing your card information, you allow The Silent Accord to charge your card for the <span className="text-[#C78D17]">Non-Refundable Registration Fee (Excl. Tax)</span> upon submission/acceptance, and future payments in accordance with membership terms.
                                    </p>
                                </div>
                            </div>

                            {/* Submit Section */}
                            <div className="space-y-8 pt-8 border-t border-[#EFD9F7]/10">
                                <h1 className="text-3xl  text-[#EFD9F7] uppercase mb-2">Submit</h1>
                                <p className="text-[#EFD9F7]/80 text-sm leading-relaxed">
                                    Please review all of the details before submitting the application. Upon submitting a formal application, the Board will review and render a decision on acceptance after taking into account all aspects of a individual's application.
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
                                            I give my consent for The Silent Accord to process my application data. I agree to the <a href="/terms-of-service" target="_blank" className="underline hover:text-[#C78D17]">Terms of Service</a> and acknowledge the <a href="/privacy-policy" target="_blank" className="underline hover:text-[#C78D17]">Privacy Policy</a>.
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
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-center my-4">
                                    <ReCAPTCHA
                                        ref={recaptchaRef}
                                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "YOUR_SITE_KEY"}
                                        onChange={onCaptchaChange}
                                        theme="dark"
                                    />
                                </div>
                                <button onClick={handleSubmit} className="px-12 py-4 bg-[#C78D17] text-[#3D0066] font-semibold uppercase tracking-widest text-sm hover:bg-[#EFD9F7] transition-colors w-full md:w-auto self-end">
                                    Submit Application
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </section >
    );
};

export default ApplicationForm;
