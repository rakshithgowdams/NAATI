import { NextResponse } from 'next/server';

interface DealerEnquiryPayload {
  fullName: string;
  businessName?: string;
  mobileNumber: string;
  email: string;
  state: string;
  district: string;
  areaOfOperation: string;
  businessExperience?: string;
  interestedIn: string;
  currentPortfolio?: string;
  expectedRequirement?: string;
  message?: string;
  consent: boolean;
  botcheck?: string; // honeypot
}

export async function POST(request: Request) {
  try {
    let body: DealerEnquiryPayload;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid request body. Please submit valid form data.',
        },
        { status: 400 }
      );
    }

    // 1. Anti-spam honeypot detection
    if (body.botcheck && body.botcheck.trim() !== '') {
      // Silently accept to trap automated bots
      return NextResponse.json({
        success: true,
        message: 'Enquiry received successfully.',
        referenceId: `REF-${Date.now().toString(36).toUpperCase()}`,
      });
    }

    // 2. Server-side validation
    const errors: Record<string, string> = {};

    if (!body.fullName || body.fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name (at least 2 characters).';
    }

    if (!body.mobileNumber || !/^[6-9]\d{9}$/.test(body.mobileNumber.replace(/\D/g, ''))) {
      errors.mobileNumber = 'Please enter a valid 10-digit Indian mobile number.';
    }

    if (
      !body.email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim())
    ) {
      errors.email = 'Please provide a valid email address.';
    }

    if (!body.state || body.state.trim() === '') {
      errors.state = 'Please select your operating state.';
    }

    if (!body.district || body.district.trim().length < 2) {
      errors.district = 'Please enter your district or city.';
    }

    if (!body.areaOfOperation || body.areaOfOperation.trim().length < 2) {
      errors.areaOfOperation = 'Please specify your area or taluk of operation.';
    }

    if (!body.interestedIn || body.interestedIn.trim() === '') {
      errors.interestedIn = 'Please select what type of partnership you are interested in.';
    }

    if (body.consent !== true) {
      errors.consent = 'Please confirm consent to process your enquiry details.';
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          errors,
          message: 'Please review and complete the highlighted required fields.',
        },
        { status: 400 }
      );
    }

    // 3. Generate unique enquiry reference code
    const referenceId = `NO-PTNR-${Date.now().toString(36).toUpperCase()}`;

    // 4. Dispatch notification if webhook/email service is configured
    const webhookUrl = process.env.DEALER_ENQUIRY_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            referenceId,
            timestamp: new Date().toISOString(),
            enquiry: {
              fullName: body.fullName.trim(),
              businessName: body.businessName?.trim() || 'N/A',
              mobileNumber: body.mobileNumber.trim(),
              email: body.email.trim(),
              state: body.state,
              district: body.district.trim(),
              areaOfOperation: body.areaOfOperation.trim(),
              businessExperience: body.businessExperience || 'Not specified',
              interestedIn: body.interestedIn,
              currentPortfolio: body.currentPortfolio?.trim() || 'N/A',
              expectedRequirement: body.expectedRequirement?.trim() || 'N/A',
              message: body.message?.trim() || 'N/A',
            },
          }),
        });
      } catch (err) {
        console.error('[Dealer Enquiry Webhook Error]:', err);
      }
    } else {
      // In development / pre-configuration environment:
      console.info(
        `[Dealer Enquiry Processed] Ref: ${referenceId} | State: ${body.state} | Type: ${body.interestedIn}. Backend email provider unconfigured.`
      );
    }

    return NextResponse.json({
      success: true,
      referenceId,
      message:
        'Thank you for your partnership enquiry. The Naati Organics commercial team has received your registration and will review your area of interest.',
    });
  } catch (error) {
    console.error('[Dealer Enquiry API Error]:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Unable to process your enquiry at this moment. Please try again shortly.',
      },
      { status: 500 }
    );
  }
}
