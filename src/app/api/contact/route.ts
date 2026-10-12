import { NextResponse } from 'next/server';

interface ContactPayload {
  fullName: string;
  mobileNumber: string;
  email?: string;
  enquiryType: string;
  location?: string;
  crop?: string;
  stage?: string;
  message: string;
  botcheck?: string; // honeypot
}

export async function POST(request: Request) {
  try {
    let body: ContactPayload;
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
      // Silently accept to trap bots
      return NextResponse.json({
        success: true,
        message: 'Thank you for reaching out. Your enquiry has been submitted successfully.',
        referenceId: `REF-${Date.now().toString(36).toUpperCase()}`,
      });
    }

    // 2. Server-side validation
    const errors: Record<string, string> = {};

    if (!body.fullName || body.fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name (at least 2 characters).';
    }

    const cleanMobile = body.mobileNumber ? body.mobileNumber.replace(/\D/g, '') : '';
    if (!cleanMobile || !/^[6-9]\d{9}$/.test(cleanMobile)) {
      errors.mobileNumber = 'Please enter a valid 10-digit Indian mobile number.';
    }

    if (body.email && body.email.trim() !== '') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim())) {
        errors.email = 'Please provide a valid email address.';
      }
    }

    if (!body.enquiryType || body.enquiryType.trim() === '') {
      errors.enquiryType = 'Please select an enquiry category.';
    }

    if (!body.message || body.message.trim().length < 5) {
      errors.message = 'Please provide a brief message describing your enquiry (at least 5 characters).';
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
    const referenceId = `NO-ENQ-${Date.now().toString(36).toUpperCase()}`;

    // 4. Dispatch notification if webhook/email service is configured
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
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
              mobileNumber: cleanMobile,
              email: body.email?.trim() || 'Not supplied',
              enquiryType: body.enquiryType,
              location: body.location?.trim() || 'Not specified',
              crop: body.crop?.trim() || 'N/A',
              stage: body.stage?.trim() || 'N/A',
              message: body.message.trim(),
            },
          }),
        });
      } catch (err) {
        console.error('[Contact Webhook Error]:', err);
      }
    } else {
      console.info(
        `[Contact Enquiry Received] Ref: ${referenceId} | Type: ${body.enquiryType} | Location: ${body.location || 'N/A'}. Webhook unconfigured.`
      );
    }

    return NextResponse.json({
      success: true,
      referenceId,
      message: 'Thank you for reaching out. Your enquiry has been submitted successfully.',
    });
  } catch (error) {
    console.error('[Contact API Error]:', error);
    return NextResponse.json(
      {
        success: false,
        message: "We couldn't send your enquiry right now. Please try again or use another contact method.",
      },
      { status: 500 }
    );
  }
}
