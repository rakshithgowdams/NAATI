'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import {
  PARTNERSHIP_INTEREST_OPTIONS,
  STATE_OPTIONS,
  EXPERIENCE_OPTIONS,
} from '@/data/dealerNetwork';
import { cn } from '@/lib/utils/cn';

export interface DealerEnquiryFormProps {
  className?: string;
}

interface FormDataState {
  fullName: string;
  businessName: string;
  mobileNumber: string;
  email: string;
  state: string;
  district: string;
  areaOfOperation: string;
  businessExperience: string;
  interestedIn: string;
  currentPortfolio: string;
  expectedRequirement: string;
  message: string;
  consent: boolean;
  botcheck: string; // Honeypot
}

const INITIAL_FORM_STATE: FormDataState = {
  fullName: '',
  businessName: '',
  mobileNumber: '',
  email: '',
  state: '',
  district: '',
  areaOfOperation: '',
  businessExperience: '',
  interestedIn: '',
  currentPortfolio: '',
  expectedRequirement: '',
  message: '',
  consent: false,
  botcheck: '',
};

/**
 * DEALER & DISTRIBUTOR NETWORK — SECTION 05: PARTNERSHIP ENQUIRY FORM
 *
 * Eyebrow: 04 / PARTNERSHIP ENQUIRY
 * Headline: "Tell us about your business."
 *
 * Asymmetric Split Layout:
 * - Left Panel: Deep forest-green narrative card with botanical imagery & partnership statement
 * - Right Panel: Editorial cream form card with complete validation, accessible states & real API submission
 */
export function DealerEnquiryForm({ className }: DealerEnquiryFormProps) {
  const [formData, setFormData] = useState<FormDataState>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Validate form client-side
  const validateForm = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errs.fullName = 'Full name is required (minimum 2 characters).';
    }

    const cleanMobile = formData.mobileNumber.replace(/\D/g, '');
    if (!cleanMobile || !/^[6-9]\d{9}$/.test(cleanMobile)) {
      errs.mobileNumber = 'Please enter a valid 10-digit Indian mobile number.';
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }

    if (!formData.state) {
      errs.state = 'Please select your operating state.';
    }

    if (!formData.district.trim()) {
      errs.district = 'District or city is required.';
    }

    if (!formData.areaOfOperation.trim()) {
      errs.areaOfOperation = 'Please specify your primary area of operation.';
    }

    if (!formData.interestedIn) {
      errs.interestedIn = 'Please select a partnership category.';
    }

    if (!formData.consent) {
      errs.consent = 'Consent is required to submit your partnership inquiry.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear error for field on edit
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/dealer-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitSuccess(data.referenceId || 'NO-ENQUIRY-CONFIRMED');
        setFormData(INITIAL_FORM_STATE);
      } else {
        setSubmitError(data.message || 'Unable to submit enquiry. Please verify your details.');
        if (data.errors) {
          setErrors(data.errors);
        }
      }
    } catch (err) {
      console.error('Submission network error:', err);
      setSubmitError('Network communication error. Please check your connection or contact our desk directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="dealer-enquiry"
      data-nav-theme="light"
      aria-labelledby="dealer-enquiry-heading"
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
              04 / PARTNERSHIP ENQUIRY
            </span>
            <span className="h-px w-8 bg-forest-deep/20" aria-hidden="true" />
          </div>

          <h2
            id="dealer-enquiry-heading"
            className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl tracking-tight text-forest-deep leading-[1.12]"
          >
            Tell us about <br />
            <span className="italic font-light">your business.</span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-forest-deep/75 mt-4 leading-relaxed">
            Share a few details so the Naati team can understand your interest in a potential dealership or distribution partnership.
          </p>
        </div>

        {/* Asymmetric Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border border-forest-deep/20 overflow-hidden shadow-sm">
          {/* ===================================================================
              LEFT PANEL: DEEP FOREST-GREEN PARTNERSHIP STATEMENT (5 Cols)
              =================================================================== */}
          <div className="lg:col-span-5 bg-forest-deep text-cream p-8 sm:p-10 lg:p-12 flex flex-col justify-between relative overflow-hidden">
            {/* Ambient Background Accent */}
            <div className="relative z-10">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-harvest font-semibold block mb-4">
                JOIN THE NETWORK
              </span>

              <h3 className="font-display font-medium text-3xl sm:text-4xl lg:text-4xl text-cream tracking-tight leading-tight mb-4">
                Let&apos;s grow <br />
                <span className="italic font-light text-harvest">together.</span>
              </h3>

              <p className="font-sans text-sm sm:text-base text-[#B7C1A9] leading-relaxed mb-8">
                Good partnerships begin with a clear understanding of one another. We review every commercial enquiry with careful consideration of geographic coverage and agricultural fit.
              </p>

              {/* Verified Product System Mention */}
              <div className="p-4 bg-white/5 border border-cream/10 space-y-2 mb-8">
                <div className="font-mono text-xs text-harvest uppercase tracking-wider font-semibold">
                  Core Partnership Products:
                </div>
                <div className="text-xs font-sans text-cream/80 space-y-1">
                  <div>• <strong className="text-cream">Naati Plus:</strong> Enriched Vermicompost (Soil Nutrition)</div>
                  <div>• <strong className="text-cream">Naati Pro:</strong> Biological Plant Activator (Plant Nutrition)</div>
                </div>
              </div>
            </div>

            {/* Botanical Visual Anchor */}
            <div className="relative w-full h-44 sm:h-52 overflow-hidden border border-cream/10 mt-6 z-10">
              <Image
                src="/assets/images/dealers/enquiry-botanical.jpg"
                alt="Farmer hands examining living soil and agricultural seedlings"
                fill
                sizes="(max-width: 1024px) 100vw, 35vw"
                className="object-cover object-center brightness-90 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-[11px] font-mono text-cream/80 tracking-wider">
                Living Soil • Sustainable Harvests
              </div>
            </div>

            {/* Direct Contact Alternative */}
            <div className="pt-6 mt-6 border-t border-cream/10 text-xs font-sans text-[#B7C1A9]/80 z-10">
              Prefer speaking directly? Email our team at{' '}
              <a
                href="mailto:info@naatiorganics.com"
                className="text-harvest underline underline-offset-4 hover:text-cream"
              >
                info@naatiorganics.com
              </a>
            </div>
          </div>

          {/* ===================================================================
              RIGHT PANEL: FORM INTERFACE (7 Cols)
              =================================================================== */}
          <div className="lg:col-span-7 bg-white/90 p-8 sm:p-10 lg:p-12">
            {submitSuccess ? (
              /* Success State */
              <div className="py-12 sm:py-16 text-center space-y-5 animate-fadeIn">
                <div className="w-14 h-14 bg-forest-deep text-harvest rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <h3 className="font-display font-medium text-2xl sm:text-3xl text-forest-deep">
                  Enquiry Registered
                </h3>

                <p className="font-sans text-sm sm:text-base text-forest-deep/80 max-w-md mx-auto leading-relaxed">
                  Thank you for expressing interest in partnering with Naati Organics. Our commercial team will review your location and business profile.
                </p>

                <div className="inline-block p-4 bg-forest-deep/5 border border-forest-deep/10 font-mono text-xs text-forest-deep">
                  Reference ID: <strong className="text-harvest font-semibold">{submitSuccess}</strong>
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
              /* Form Interface */
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* Anti-spam honeypot */}
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

                {/* Subheading: Basic Information */}
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-[0.18em] text-forest-deep/60 pb-2 border-b border-forest-deep/10">
                    01. Basic Contact Information
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-xs font-mono uppercase tracking-wider text-forest-deep mb-1.5">
                      Full Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Ramesh Gowda"
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

                  {/* Business Name */}
                  <div>
                    <label htmlFor="businessName" className="block text-xs font-mono uppercase tracking-wider text-forest-deep mb-1.5">
                      Business Name <span className="text-forest-deep/40 text-[11px]">(Optional)</span>
                    </label>
                    <input
                      id="businessName"
                      name="businessName"
                      type="text"
                      value={formData.businessName}
                      onChange={handleChange}
                      placeholder="e.g. Kaveri Agro Agencies"
                      className="w-full px-4 py-3 bg-white border border-forest-deep/20 font-sans text-sm text-forest-deep focus:outline-none focus:ring-1 focus:border-forest-deep focus:ring-forest-deep transition-all"
                    />
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label htmlFor="mobileNumber" className="block text-xs font-mono uppercase tracking-wider text-forest-deep mb-1.5">
                      Mobile Number <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="mobileNumber"
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
                    <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-forest-deep mb-1.5">
                      Email Address <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. contact@kaveriagro.com"
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
                </div>

                {/* Subheading: Location & Experience */}
                <div className="pt-2">
                  <h4 className="font-mono text-xs uppercase tracking-[0.18em] text-forest-deep/60 pb-2 border-b border-forest-deep/10">
                    02. Location & Business Profile
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* State Select */}
                  <div>
                    <label htmlFor="state" className="block text-xs font-mono uppercase tracking-wider text-forest-deep mb-1.5">
                      State <span className="text-red-600">*</span>
                    </label>
                    <select
                      id="state"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleChange}
                      className={cn(
                        'w-full px-4 py-3 bg-white border font-sans text-sm text-forest-deep focus:outline-none focus:ring-1 transition-all',
                        errors.state
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-forest-deep/20 focus:border-forest-deep focus:ring-forest-deep'
                      )}
                    >
                      <option value="">Select State</option>
                      {STATE_OPTIONS.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                    {errors.state && (
                      <p className="mt-1 text-[11px] font-sans text-red-600">{errors.state}</p>
                    )}
                  </div>

                  {/* District / City */}
                  <div>
                    <label htmlFor="district" className="block text-xs font-mono uppercase tracking-wider text-forest-deep mb-1.5">
                      District / City <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="district"
                      name="district"
                      type="text"
                      required
                      value={formData.district}
                      onChange={handleChange}
                      placeholder="e.g. Shivamogga / Hassan"
                      className={cn(
                        'w-full px-4 py-3 bg-white border font-sans text-sm text-forest-deep focus:outline-none focus:ring-1 transition-all',
                        errors.district
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-forest-deep/20 focus:border-forest-deep focus:ring-forest-deep'
                      )}
                    />
                    {errors.district && (
                      <p className="mt-1 text-[11px] font-sans text-red-600">{errors.district}</p>
                    )}
                  </div>

                  {/* Area of Operation */}
                  <div>
                    <label htmlFor="areaOfOperation" className="block text-xs font-mono uppercase tracking-wider text-forest-deep mb-1.5">
                      Area / Taluk of Operation <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="areaOfOperation"
                      name="areaOfOperation"
                      type="text"
                      required
                      value={formData.areaOfOperation}
                      onChange={handleChange}
                      placeholder="e.g. Thirthahalli & Sagar Taluks"
                      className={cn(
                        'w-full px-4 py-3 bg-white border font-sans text-sm text-forest-deep focus:outline-none focus:ring-1 transition-all',
                        errors.areaOfOperation
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-forest-deep/20 focus:border-forest-deep focus:ring-forest-deep'
                      )}
                    />
                    {errors.areaOfOperation && (
                      <p className="mt-1 text-[11px] font-sans text-red-600">{errors.areaOfOperation}</p>
                    )}
                  </div>

                  {/* Business Experience */}
                  <div>
                    <label htmlFor="businessExperience" className="block text-xs font-mono uppercase tracking-wider text-forest-deep mb-1.5">
                      Business Experience <span className="text-forest-deep/40 text-[11px]">(Optional)</span>
                    </label>
                    <select
                      id="businessExperience"
                      name="businessExperience"
                      value={formData.businessExperience}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-forest-deep/20 font-sans text-sm text-forest-deep focus:outline-none focus:ring-1 focus:border-forest-deep focus:ring-forest-deep transition-all"
                    >
                      <option value="">Select Experience Range</option>
                      {EXPERIENCE_OPTIONS.map((exp) => (
                        <option key={exp} value={exp}>
                          {exp}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Subheading: Partnership Specifics */}
                <div className="pt-2">
                  <h4 className="font-mono text-xs uppercase tracking-[0.18em] text-forest-deep/60 pb-2 border-b border-forest-deep/10">
                    03. Partnership Details
                  </h4>
                </div>

                <div className="space-y-5">
                  {/* Interested In */}
                  <div>
                    <label htmlFor="interestedIn" className="block text-xs font-mono uppercase tracking-wider text-forest-deep mb-1.5">
                      Interested In <span className="text-red-600">*</span>
                    </label>
                    <select
                      id="interestedIn"
                      name="interestedIn"
                      required
                      value={formData.interestedIn}
                      onChange={handleChange}
                      className={cn(
                        'w-full px-4 py-3 bg-white border font-sans text-sm text-forest-deep focus:outline-none focus:ring-1 transition-all',
                        errors.interestedIn
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-forest-deep/20 focus:border-forest-deep focus:ring-forest-deep'
                      )}
                    >
                      <option value="">Select Partnership Type</option>
                      {PARTNERSHIP_INTEREST_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {errors.interestedIn && (
                      <p className="mt-1 text-[11px] font-sans text-red-600">{errors.interestedIn}</p>
                    )}
                  </div>

                  {/* Current Portfolio */}
                  <div>
                    <label htmlFor="currentPortfolio" className="block text-xs font-mono uppercase tracking-wider text-forest-deep mb-1.5">
                      Current Product Portfolio <span className="text-forest-deep/40 text-[11px]">(Optional)</span>
                    </label>
                    <input
                      id="currentPortfolio"
                      name="currentPortfolio"
                      type="text"
                      value={formData.currentPortfolio}
                      onChange={handleChange}
                      placeholder="e.g. Fertilizers, bio-pesticides, organic inputs, seeds"
                      className="w-full px-4 py-3 bg-white border border-forest-deep/20 font-sans text-sm text-forest-deep focus:outline-none focus:ring-1 focus:border-forest-deep focus:ring-forest-deep transition-all"
                    />
                  </div>

                  {/* Expected Monthly Requirement */}
                  <div>
                    <label htmlFor="expectedRequirement" className="block text-xs font-mono uppercase tracking-wider text-forest-deep mb-1.5">
                      Expected Monthly Requirement / Volume <span className="text-forest-deep/40 text-[11px]">(Optional)</span>
                    </label>
                    <input
                      id="expectedRequirement"
                      name="expectedRequirement"
                      type="text"
                      value={formData.expectedRequirement}
                      onChange={handleChange}
                      placeholder="e.g. 5–10 MT vermicompost, 100–200 L foliar activator"
                      className="w-full px-4 py-3 bg-white border border-forest-deep/20 font-sans text-sm text-forest-deep focus:outline-none focus:ring-1 focus:border-forest-deep focus:ring-forest-deep transition-all"
                    />
                  </div>

                  {/* Additional Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-forest-deep mb-1.5">
                      Additional Message / Details <span className="text-forest-deep/40 text-[11px]">(Optional)</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Share any questions regarding local cropping patterns, dealership terms, or regional grower requirements..."
                      className="w-full px-4 py-3 bg-white border border-forest-deep/20 font-sans text-sm text-forest-deep focus:outline-none focus:ring-1 focus:border-forest-deep focus:ring-forest-deep transition-all"
                    />
                  </div>
                </div>

                {/* Consent Checkbox */}
                <div className="pt-2">
                  <div className="flex items-start gap-3">
                    <input
                      id="consent"
                      name="consent"
                      type="checkbox"
                      required
                      checked={formData.consent}
                      onChange={handleChange}
                      className="mt-1 w-4 h-4 text-forest-deep border-forest-deep/30 focus:ring-forest-deep cursor-pointer"
                    />
                    <label htmlFor="consent" className="text-xs font-sans text-forest-deep/75 leading-relaxed cursor-pointer">
                      I consent to Naati Organics using my submitted contact and business information to respond to this partnership enquiry. I understand that submitting this enquiry initiates an exploratory discussion and does not constitute a confirmed dealership or commercial agreement.{' '}
                      <span className="text-red-600">*</span>
                    </label>
                  </div>
                  {errors.consent && (
                    <p className="mt-1 text-[11px] font-sans text-red-600 pl-7">{errors.consent}</p>
                  )}
                </div>

                {/* Submit Action */}
                <div className="pt-4 border-t border-forest-deep/10">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-forest-deep text-cream text-xs sm:text-sm font-mono uppercase tracking-[0.18em] font-medium hover:bg-forest-light hover:text-forest-deep transition-all duration-300 disabled:opacity-50 cursor-pointer shadow-sm"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-harvest" />
                        <span>PROCESSING ENQUIRY...</span>
                      </>
                    ) : (
                      <>
                        <span>SUBMIT PARTNERSHIP ENQUIRY</span>
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
