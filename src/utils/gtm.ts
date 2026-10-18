/**
 * Google Tag Manager & dataLayer helper utilities for Smugsafaris
 * Single Page Application (SPA) tracking, virtual pageviews, and safari conversions.
 */

declare global {
  interface Window {
    dataLayer: Record<string, any>[];
  }
}

/**
 * Safely push an object to the Google Tag Manager dataLayer
 */
export function pushToDataLayer(data: Record<string, any>): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);
}

/**
 * Push a virtual pageview event when routes change in React Router
 */
export function trackGTMPageView(path: string, title?: string): void {
  pushToDataLayer({
    event: 'virtual_pageview',
    page_path: path,
    page_title: title || document.title,
    page_location: window.location.href,
  });
}

/**
 * Generic custom event tracker for GTM tags (Meta Pixel, Google Ads, GA4)
 */
export function trackGTMEvent(eventName: string, params: Record<string, any> = {}): void {
  pushToDataLayer({
    event: eventName,
    ...params,
  });
}

/**
 * Track WhatsApp chat clicks across buttons and floating widgets
 */
export function trackWhatsAppClick(source: string, tourTitle?: string): void {
  trackGTMEvent('whatsapp_click', {
    event_category: 'Contact',
    event_label: source,
    tour_title: tourTitle || 'General Safari Inquiry',
  });
}

/**
 * Track when a user submits an inquiry / booking request
 */
export function trackInquirySubmission(data: {
  tourTitle: string;
  tourId: string;
  tier: string;
  adults: number;
  children: number;
  travelDate?: string;
  reference: string;
}): void {
  trackGTMEvent('safari_inquiry_submit', {
    event_category: 'Lead',
    event_action: 'Submit Safari Inquiry',
    tour_title: data.tourTitle,
    tour_id: data.tourId,
    tier: data.tier,
    guest_count: data.adults + data.children,
    travel_date: data.travelDate || 'Flexible',
    booking_reference: data.reference,
  });
}

/**
 * Track when a user views a specific safari tour details
 */
export function trackTourDetailView(tour: {
  id: string;
  title: string;
  destination?: string;
  priceFrom?: number;
}): void {
  trackGTMEvent('view_tour_detail', {
    event_category: 'Ecommerce',
    event_action: 'View Safari Tour',
    tour_id: tour.id,
    tour_title: tour.title,
    destination: tour.destination,
    value: tour.priceFrom,
    currency: 'USD',
  });
}
