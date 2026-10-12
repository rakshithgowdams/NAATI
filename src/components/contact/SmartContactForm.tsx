'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowUpRight, Loader2, CheckCircle2, AlertCircle, Sprout, ArrowRight } from 'lucide-react';
import {
  ENQUIRY_TYPES,
  CROP_OPTIONS,
  STAGE_OPTIONS,
  type EnquiryCategory,
} from '@/data/contact';
import { cn } from '@/lib/utils/cn';

export interface SmartContactFormProps {
  className?: string;
}

interface ContactFormData {
  fullName: string;
  mobileNumber: string;
  email: string;
  enquiryType: EnquiryCategory;
  location: string;
  crop: string;
  stage: string;
  acreage: string;
  message: string;
  botcheck: string;
}

const INITIAL_FORM_DATA: ContactFormData = {
  fullName: '',
  mobileNumber: '',
  email: '',
  enquiryType: 'general',
  location: '',
  crop: '',
  stage: '',
  acreage: '',
  message: '',
  botcheck: '',
};

/**
 * Inner component reading search params safely inside Suspense
 */
function SmartContactFormInner({ className }: SmartContactFormProps) {
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Sync URL query parameters on initial load
  useEffect(() => {
    const rawType = searchParams.get('type')?.toLowerCase();
    const rawCrop = searchParams.get('crop');

    let matchedType: EnquiryCategory | null = null;

    if (rawType === 'naati-plus' || rawType === 'plus') {
      matchedType = 'naati-plus';
    } else if (rawType === 'naati-pro' || rawType === 'pro') {
      matchedType = 'naati-pro';
    } else if (rawType === 'crop-guidance' || rawType === 'crops' || rawType === 'crop-solutions') {
      matchedType = 'crop-guidance';
    } else if (rawType === 'dealer' || rawType === 'distribution' || rawType === 'dealers') {
      matchedType = 'dealer';
    } else if (rawType === 'general') {
      matchedType = 'general';
    }

    setFormData((prev) => {
      const updated: ContactFormData = { ...prev };
      if (matchedType) {
        updated.enquiryType = matchedType;
      }
      if (rawCrop) {
        const foundCrop = CROP_OPTIONS.find(
          (c) => c.toLowerCase() === rawCrop.toLowerCase() || c.toLowerCase().includes(rawCrop.toLowerCase())
        );
        if (foundCrop) {
          updated.crop = foundCrop;
        }
      }
      return updated;
    });
  }, [searchParams]);

  // Handle Enquiry Type Switching with Clean State Transition
  const handleTypeSwitch = (newType: EnquiryCategory) => {
    setFormData((prev) => {
      // Preserve common fields: fullName, mobileNumber, email, location, message
      // Reset context-specific fields: crop, stage, acreage to avoid stale submission
      return {
        ...prev,
        enquiryType: newType,
        crop: newType === 'crop-guidance' || newType === 'naati-plus' || newType === 'naati-pro' ? prev.crop : '',
        stage: newType === 'naati-pro' ? prev.stage : '',
        acreage: newType === 'naati-plus' ? prev.acreage : '',
      };
    });

    // Clear any context-specific validation errors
    setErrors((prev) => {
      const next = { ...prev };
      delete next.crop;
      delete next.stage;
      delete next.acreage;
      return next;
    });
  };

  // Form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for field
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  // Client-side validation
  const validateForm = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errs.fullName = 'Please enter your full name (at least 2 characters).';
    }

    const cleanMobile = formData.mobileNumber.replace(/\D/g, '');
    if (!cleanMobile || !/^[6-9]\d{9}$/.test(cleanMobile)) {
      errs.mobileNumber = 'Please enter a valid 10-digit Indian mobile number.';
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }

    if (!formData.message.trim() || formData.message.trim().length < 5) {
      errs.message = 'Please provide details about your enquiry (minimum 5 characters).';
    }

    // Context-specific validation if Crop Guidance is selected
    if (formData.enquiryType === 'crop-guidance' && !formData.crop) {
      errs.crop = 'Please select a crop category.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitSuccess(data.referenceId || 'NO-ENQ-CONFIRMED');
        setFormData(INITIAL_FORM_DATA);
      } else {
        setSubmitError(
          data.message || "We couldn't send your enquiry right now. Please try again or use another contact method."
        );
        if (data.errors) {
          setErrors(data.errors);
        }
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      setSubmitError(
        "We couldn't send your enquiry right now. Please try again or use another contact method."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact-form"
      data-nav-theme="light"
      aria-labelledby="contact-form-heading"
      className={cn(
        'relative w-full bg-cream text-text-primary py-16 sm:py-24 lg:py-28 px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 border-b border-forest-deep/10',
        className
      )}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-forest-deep">
              02 / START A CONVERSATION
            </span>
            <span className="h-px w-8 bg-forest-deep/20" aria-hidden="true" />
          </div>

          <h2
            id="contact-form-heading"
            className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl tracking-tight text-forest-deep leading-[1.12]"
          >
            Tell us what <br />
            <span className="italic font-light">you&apos;re looking for.</span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-forest-deep/75 mt-4 leading-relaxed">
            Share a few details and help us understand how we can assist you.
          </p>
        </div>

        {/* Form Container Split (Left Forest Green, Right Cream) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border border-forest-deep/20 overflow-hidden shadow-sm">
          {/* ===================================================================
              LEFT PANEL: FOREST GREEN PHILOSOPHY & ADVISORY GUIDANCE (5 Cols)
              =================================================================== */}
          <div className="lg:col-span-5 bg-forest-deep text-cream p-8 sm:p-10 lg:p-12 flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-harvest font-semibold block mb-4">
                AGRONOMY ADVISORY
              </span>

              <h3 className="font-display font-medium text-3xl sm:text-4xl text-cream tracking-tight leading-tight mb-4">
                Every great growing journey <br />
                <span className="italic font-light text-harvest">begins with understanding.</span>
              </h3>

              <p className="font-sans text-sm sm:text-base text-[#B7C1A9] leading-relaxed mb-6">
                Whether you have an inquiry about enriched vermicompost application, foliar nutrition timing, or specific crop symptoms, our agronomists provide cautious, evidence-backed answers.
              </p>

              {/* Verified Product Distinction */}
              <div className="p-4 bg-white/5 border border-cream/10 space-y-2 mb-6">
                <div className="font-mono text-xs text-harvest uppercase tracking-wider font-semibold">
                  The Two-Product Approach:
                </div>
                <div className="text-xs font-sans text-cream/80 space-y-1">
                  <div>• <strong className="text-cream">Naati Plus:</strong> Builds living soil, organic carbon & roots</div>
                  <div>• <strong className="text-cream">Naati Pro:</strong> Feeds the plant, promotes vegetative vigor & yield</div>
                </div>
              </div>
            </div>

            {/* Botanical Detail Graphic */}
            <div className="relative w-full h-40 sm:h-48 overflow-hidden border border-cream/10 mt-6 z-10">
              <Image
                src="/assets/images/contact/seedling-macro.jpg"
                alt="Agricultural crop seedling thriving in moist organic soil"
                fill
                sizes="(max-width: 1024px) 100vw, 35vw"
                className="object-cover object-center brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-[11px] font-mono text-cream/80 tracking-wider">
                Healthy Roots • Thriving Crops
              </div>
            </div>

            {/* Direct Channel Fallback */}
            <div className="pt-6 mt-6 border-t border-cream/10 text-xs font-sans text-[#B7C1A9]/80 z-10">
              Have an urgent field emergency? Call our hotline directly at{' '}
              <a href="tel:+919900000000" className="text-harvest font-medium underline underline-offset-4">
                +91 99000 00000
              </a>
            </div>
          </div>

          {/* ===================================================================
              RIGHT PANEL: DYNAMIC ADAPTIVE FORM (7 Cols)
              =================================================================== */}
          <div className="lg:col-span-7 bg-white/95 p-8 sm:p-10 lg:p-12">
            {submitSuccess ? (
              /* Success Confirmation Card */
              <div className="py-12 sm:py-16 text-center space-y-5 animate-fadeIn">
                <div className="w-14 h-14 bg-forest-deep text-harvest rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <h3 className="font-display font-medium text-2xl sm:text-3xl text-forest-deep">
                  Enquiry Submitted
                </h3>

                <p className="font-sans text-sm sm:text-base text-forest-deep/80 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. Your enquiry has been submitted successfully. A Naati advisory representative will review your message.
                </p>

                <div className="inline-block p-4 bg-forest-deep/5 border border-forest-deep/10 font-mono text-xs text-forest-deep">
                  Enquiry Reference: <strong className="text-harvest font-semibold">{submitSuccess}</strong>
                </div>

                <div className="pt-6">
                  <button
                    type="button"
                    onClick={() => setSubmitSuccess(null)}
                    className="px-6 py-3 bg-forest-deep text-cream text-xs font-mono uppercase tracking-[0.16em] hover:bg-forest-light hover:text-forest-deep transition-colors"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* Honeypot field */}
                <input
                  type="text"
                  name="botcheck"
                  value={formData.botcheck}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                {submitError && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm font-sans flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span>{submitError}</span>
                  </div>
                )}

                {/* =============================================================
                    STEP A: SELECT ENQUIRY CATEGORY TABS
                    ============================================================= */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-forest-deep mb-2 font-semibold">
                    WHAT CAN WE HELP YOU WITH? <span className="text-red-600">*</span>
                  </label>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2" role="tablist">
                    {ENQUIRY_TYPES.map((typeOption) => {
                      const isSelected = formData.enquiryType === typeOption.id;

                      return (
                        <button
                          key={typeOption.id}
                          type="button"
                          role="tab"
                          aria-selected={isSelected}
                          onClick={() => handleTypeSwitch(typeOption.id)}
                          className={cn(
                            'px-3 py-2.5 text-xs font-mono uppercase tracking-wider border transition-all text-center flex flex-col items-center justify-center gap-0.5 cursor-pointer',
                            isSelected
                              ? 'bg-forest-deep text-cream border-forest-deep shadow-sm'
                              : 'bg-white/60 text-forest-deep/75 border-forest-deep/15 hover:border-forest-deep/35 hover:bg-white'
                          )}
                        >
                          <span className="font-semibold">{typeOption.shortLabel}</span>
                          {typeOption.badge && (
                            <span
                              className={cn(
                                'text-[9px] tracking-normal uppercase',
                                isSelected ? 'text-harvest' : 'text-forest-deep/50'
                              )}
                            >
                              {typeOption.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Contextual Description Banner */}
                {(() => {
                  const currentOpt = ENQUIRY_TYPES.find((t) => t.id === formData.enquiryType);
                  return (
                    <div className="p-3 bg-forest-deep/5 border border-forest-deep/10 text-xs font-sans text-forest-deep/80 flex items-center justify-between">
                      <span>{currentOpt?.description}</span>
                      {formData.enquiryType === 'dealer' && (
                        <Link
                          href="/dealer-network#dealer-enquiry"
                          className="font-mono text-[11px] text-harvest font-semibold uppercase tracking-wider hover:underline flex items-center gap-1 shrink-0 ml-3"
                        >
                          <span>Full Application</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      )}
                    </div>
                  );
                })()}

                {/* Special Dealer Notice If Dealer Selected */}
                {formData.enquiryType === 'dealer' && (
                  <div className="p-4 bg-harvest/15 border border-harvest/40 text-xs font-sans text-forest-deep space-y-2">
                    <p className="font-semibold">
                      For a detailed dealership or distribution partnership application:
                    </p>
                    <p>
                      Our dedicated Dealer Network page includes verified business categories, state-level selection, and commercial requirements.
                    </p>
                    <Link
                      href="/dealer-network#dealer-enquiry"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-forest-deep text-cream text-xs font-mono uppercase tracking-wider hover:bg-forest-light hover:text-forest-deep transition-colors"
                    >
                      <span>OPEN DEALER APPLICATION ↗</span>
                    </Link>
                  </div>
                )}

                {/* =============================================================
                    STEP B: COMMON INFORMATION
                    ============================================================= */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="contact-fullName" className="block text-xs font-mono uppercase tracking-wider text-forest-deep mb-1.5">
                      Full Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="contact-fullName"
                      name="fullName"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Anand Gowda"
                      className={cn(
                        'w-full px-4 py-3 bg-white border font-sans text-sm text-forest-deep focus:outline-none focus:ring-1 transition-all',
                        errors.fullName
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-forest-deep/20 focus:border-forest-deep focus:ring-forest-deep'
                      )}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-[11px] font-sans text-red-600">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label htmlFor="contact-mobileNumber" className="block text-xs font-mono uppercase tracking-wider text-forest-deep mb-1.5">
                      Mobile Number <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="contact-mobileNumber"
                      name="mobileNumber"
                      type="tel"
                      required
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      placeholder="10-digit mobile number"
                      className={cn(
                        'w-full px-4 py-3 bg-white border font-sans text-sm text-forest-deep focus:outline-none focus:ring-1 transition-all',
                        errors.mobileNumber
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-forest-deep/20 focus:border-forest-deep focus:ring-forest-deep'
                      )}
                    />
                    {errors.mobileNumber && (
                      <p className="mt-1 text-[11px] font-sans text-red-600">{errors.mobileNumber}</p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-mono uppercase tracking-wider text-forest-deep mb-1.5">
                      Email Address <span className="text-forest-deep/40 text-[11px]">(Optional)</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. anand@example.com"
                      className={cn(
                        'w-full px-4 py-3 bg-white border font-sans text-sm text-forest-deep focus:outline-none focus:ring-1 transition-all',
                        errors.email
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-forest-deep/20 focus:border-forest-deep focus:ring-forest-deep'
                      )}
                    />
                    {errors.email && (
                      <p className="mt-1 text-[11px] font-sans text-red-600">{errors.email}</p>
                    )}
                  </div>

                  {/* Location / District */}
                  <div>
                    <label htmlFor="contact-location" className="block text-xs font-mono uppercase tracking-wider text-forest-deep mb-1.5">
                      District / Location <span className="text-forest-deep/40 text-[11px]">(Optional)</span>
                    </label>
                    <input
                      id="contact-location"
                      name="location"
                      type="text"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g. Hassan / Shivamogga"
                      className="w-full px-4 py-3 bg-white border border-forest-deep/20 font-sans text-sm text-forest-deep focus:outline-none focus:ring-1 focus:border-forest-deep focus:ring-forest-deep transition-all"
                    />
                  </div>
                </div>

                {/* =============================================================
                    STEP C: CONTEXT-SPECIFIC FIELDS
                    ============================================================= */}
                {/* 1. Naati Plus Context */}
                {formData.enquiryType === 'naati-plus' && (
                  <div className="p-4 bg-forest-deep/5 border border-forest-deep/15 space-y-4 animate-fadeIn">
                    <div className="flex items-center gap-2 text-xs font-mono text-harvest uppercase font-semibold">
                      <Sprout className="w-3.5 h-3.5" />
                      <span>Product Selected: Naati Plus (Enriched Vermicompost)</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-crop-plus" className="block text-xs font-mono uppercase tracking-wider text-forest-deep mb-1">
                          Target Crop <span className="text-forest-deep/40 text-[11px]">(Optional)</span>
                        </label>
                        <select
                          id="contact-crop-plus"
                          name="crop"
                          value={formData.crop}
                          onChange={handleChange}
                          className="w-full px-3 py-2.5 bg-white border border-forest-deep/20 font-sans text-xs sm:text-sm text-forest-deep focus:outline-none focus:ring-1 focus:ring-forest-deep"
                        >
                          <option value="">Select Crop (Optional)</option>
                          {CROP_OPTIONS.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="contact-acreage" className="block text-xs font-mono uppercase tracking-wider text-forest-deep mb-1">
                          Estimated Acreage / Bags <span className="text-forest-deep/40 text-[11px]">(Optional)</span>
                        </label>
                        <input
                          id="contact-acreage"
                          name="acreage"
                          type="text"
                          value={formData.acreage}
                          onChange={handleChange}
                          placeholder="e.g. 5 Acres or 50 Bags"
                          className="w-full px-3 py-2.5 bg-white border border-forest-deep/20 font-sans text-xs sm:text-sm text-forest-deep focus:outline-none focus:ring-1 focus:ring-forest-deep"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Naati Pro Context */}
                {formData.enquiryType === 'naati-pro' && (
                  <div className="p-4 bg-forest-deep/5 border border-forest-deep/15 space-y-4 animate-fadeIn">
                    <div className="flex items-center gap-2 text-xs font-mono text-harvest uppercase font-semibold">
                      <Sprout className="w-3.5 h-3.5" />
                      <span>Product Selected: Naati Pro (Biological Plant Activator)</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-crop-pro" className="block text-xs font-mono uppercase tracking-wider text-forest-deep mb-1">
                          Target Crop <span className="text-forest-deep/40 text-[11px]">(Optional)</span>
                        </label>
                        <select
                          id="contact-crop-pro"
                          name="crop"
                          value={formData.crop}
                          onChange={handleChange}
                          className="w-full px-3 py-2.5 bg-white border border-forest-deep/20 font-sans text-xs sm:text-sm text-forest-deep focus:outline-none focus:ring-1 focus:ring-forest-deep"
                        >
                          <option value="">Select Crop (Optional)</option>
                          {CROP_OPTIONS.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="contact-stage" className="block text-xs font-mono uppercase tracking-wider text-forest-deep mb-1">
                          Application Stage <span className="text-forest-deep/40 text-[11px]">(Optional)</span>
                        </label>
                        <select
                          id="contact-stage"
                          name="stage"
                          value={formData.stage}
                          onChange={handleChange}
                          className="w-full px-3 py-2.5 bg-white border border-forest-deep/20 font-sans text-xs sm:text-sm text-forest-deep focus:outline-none focus:ring-1 focus:ring-forest-deep"
                        >
                          <option value="">Select Stage (Optional)</option>
                          {STAGE_OPTIONS.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. Crop Guidance Context */}
                {formData.enquiryType === 'crop-guidance' && (
                  <div className="p-4 bg-forest-deep/5 border border-forest-deep/15 space-y-3 animate-fadeIn">
                    <div className="flex items-center gap-2 text-xs font-mono text-harvest uppercase font-semibold">
                      <Sprout className="w-3.5 h-3.5" />
                      <span>Agronomy Advisory: Crop-Specific Guidance</span>
                    </div>

                    <div>
                      <label htmlFor="contact-crop-guidance" className="block text-xs font-mono uppercase tracking-wider text-forest-deep mb-1">
                        Select Your Crop Category <span className="text-red-600">*</span>
                      </label>
                      <select
                        id="contact-crop-guidance"
                        name="crop"
                        required
                        value={formData.crop}
                        onChange={handleChange}
                        className={cn(
                          'w-full px-3 py-2.5 bg-white border font-sans text-xs sm:text-sm text-forest-deep focus:outline-none focus:ring-1',
                          errors.crop
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-forest-deep/20 focus:ring-forest-deep'
                        )}
                      >
                        <option value="">Select Crop Category</option>
                        {CROP_OPTIONS.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                      {errors.crop && (
                        <p className="mt-1 text-[11px] font-sans text-red-600">{errors.crop}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Message Field */}
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-mono uppercase tracking-wider text-forest-deep mb-1.5">
                    Your Message / Question <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={
                      formData.enquiryType === 'crop-guidance'
                        ? 'Describe your crop symptoms, soil type, current challenges or dosage query...'
                        : formData.enquiryType === 'dealer'
                        ? 'Share your current business operations, preferred district, or partnership inquiry...'
                        : 'How can our agronomy team help you with soil health and crop nutrition?'
                    }
                    className={cn(
                      'w-full px-4 py-3 bg-white border font-sans text-sm text-forest-deep focus:outline-none focus:ring-1 transition-all',
                      errors.message
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-forest-deep/20 focus:border-forest-deep focus:ring-forest-deep'
                    )}
                  />
                  {errors.message && (
                    <p className="mt-1 text-[11px] font-sans text-red-600">{errors.message}</p>
                  )}
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-forest-deep text-cream text-xs sm:text-sm font-mono uppercase tracking-[0.18em] font-medium hover:bg-forest-light hover:text-forest-deep transition-all duration-300 disabled:opacity-50 cursor-pointer shadow-sm"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-harvest" />
                        <span>SUBMITTING ENQUIRY...</span>
                      </>
                    ) : (
                      <>
                        <span>SEND ENQUIRY</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Exported SmartContactForm wrapped with Suspense boundary for Next.js useSearchParams safety
 */
export function SmartContactForm({ className }: SmartContactFormProps) {
  return (
    <Suspense
      fallback={
        <div className="w-full py-20 text-center font-mono text-xs text-forest-deep/60">
          Loading contact form...
        </div>
      }
    >
      <SmartContactFormInner className={className} />
    </Suspense>
  );
}
