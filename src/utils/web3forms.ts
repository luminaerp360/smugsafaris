/**
 * Web3Forms Email Notification Integration for Smugsafaris
 * Delivers instant safari booking inquiries and contact requests directly to
 * kiprotichkirui301@gmail.com without requiring a dedicated backend server.
 */

export const WEB3FORMS_ACCESS_KEY =
  (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string) || '8d1bdabf-da01-4a23-8b46-36d8c2794faf';

interface SubmissionResult {
  success: boolean;
  message?: string;
}

export interface BookingInquiryPayload {
  reference: string;
  fullName: string;
  email: string;
  phone: string;
  tourTitle: string;
  tourId?: string;
  travelDate: string;
  adults: number | string;
  children: number | string;
  tier: string;
  specialRequests?: string;
}

export interface ContactMessagePayload {
  fullName: string;
  email: string;
  phone?: string;
  country?: string;
  destination?: string;
  travelStyle?: string;
  adults?: number | string;
  children?: number | string;
  tier?: string;
  travelDates?: string;
  subject?: string;
  message: string;
}

/**
 * Universal submit function to Web3Forms using FormData
 */
async function sendToWeb3Forms(formData: FormData): Promise<SubmissionResult> {
  // Ensure access key is attached
  if (!formData.has('access_key')) {
    formData.append('access_key', WEB3FORMS_ACCESS_KEY);
  }

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    return {
      success: Boolean(data?.success),
      message: data?.message || 'Submitted successfully',
    };
  } catch (error) {
    console.warn('Web3Forms notification dispatch error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Network error',
    };
  }
}

/**
 * Submit a complete Safari Booking Inquiry from the Modal
 */
export async function submitBookingNotification(
  data: BookingInquiryPayload
): Promise<SubmissionResult> {
  const formData = new FormData();
  formData.append('access_key', WEB3FORMS_ACCESS_KEY);
  formData.append('from_name', 'Smugsafaris Booking Desk');
  formData.append('subject', `[New Safari Booking] ${data.tourTitle} - Ref: ${data.reference}`);
  formData.append('replyto', data.email);

  // Core Structured Fields
  formData.append('Booking Reference', data.reference);
  formData.append('Guest Name', data.fullName);
  formData.append('Email Address', data.email);
  formData.append('Phone / WhatsApp', data.phone);
  formData.append('Safari Package', data.tourTitle);
  formData.append('Target Travel Date', data.travelDate || 'Flexible');
  formData.append('Adults', String(data.adults));
  formData.append('Children', String(data.children));
  formData.append('Accommodation Tier', data.tier);
  formData.append('Special Requests', data.specialRequests || 'None provided');
  formData.append('Submission Time', new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' }) + ' (EAT)');

  return sendToWeb3Forms(formData);
}

/**
 * Submit a Contact Page Inquiry or Tailor-Made Route Request
 */
export async function submitContactNotification(
  data: ContactMessagePayload
): Promise<SubmissionResult> {
  const formData = new FormData();
  formData.append('access_key', WEB3FORMS_ACCESS_KEY);
  formData.append('from_name', 'Smugsafaris Website Contact');
  formData.append(
    'subject',
    `[Safari Inquiry] ${data.destination || 'Tailor-Made Route'} - ${data.fullName}`
  );
  formData.append('replyto', data.email);

  formData.append('Traveler Name', data.fullName);
  formData.append('Email Address', data.email);
  if (data.phone) formData.append('Phone / WhatsApp', data.phone);
  if (data.country) formData.append('Country of Residence', data.country);
  if (data.destination) formData.append('Destination Interest', data.destination);
  if (data.travelStyle) formData.append('Safari Style', data.travelStyle);
  if (data.adults !== undefined) formData.append('Adults', String(data.adults));
  if (data.children !== undefined) formData.append('Children', String(data.children));
  if (data.tier) formData.append('Accommodation Tier', data.tier);
  if (data.travelDates) formData.append('Preferred Travel Dates', data.travelDates);
  if (data.subject) formData.append('Subject', data.subject);
  formData.append('Message / Notes', data.message);
  formData.append('Submission Time', new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' }) + ' (EAT)');

  return sendToWeb3Forms(formData);
}

/**
 * Submit Newsletter Subscription
 */
export async function submitNewsletterNotification(email: string): Promise<SubmissionResult> {
  const formData = new FormData();
  formData.append('access_key', WEB3FORMS_ACCESS_KEY);
  formData.append('from_name', 'Smugsafaris Wildlife Circle');
  formData.append('subject', `[Newsletter Subscriber] ${email}`);
  formData.append('replyto', email);
  formData.append('Subscriber Email', email);
  formData.append('Subscribed At', new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' }) + ' (EAT)');

  return sendToWeb3Forms(formData);
}
