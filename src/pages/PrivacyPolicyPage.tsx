import React from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../components/SeoHead';
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2, Mail, Phone, MapPin, ChevronRight } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-[#FAF9F5] min-h-screen">
      <SeoHead
        title="Privacy Policy | Smugsafaris Tours & Travel"
        description="Learn how Smugsafaris Tours & Travel collects, uses, and protects personal guest information in accordance with Kenyan and international data protection laws."
        canonicalPath="/privacy-policy"
      />

      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#0F5E1F] via-[#166527] to-[#075E54] text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-emerald-200 mb-4">
            <ShieldCheck className="w-4 h-4 text-[#FDB913]" />
            <span>Data Privacy & Guest Trust</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 font-serif">
            Privacy Policy
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/90 max-w-2xl mx-auto leading-relaxed">
            Your privacy is of utmost importance to us. This policy details how Smugsafaris Tours & Travel collects, uses, protects, and handles your personal information when you browse our safari packages or book an adventure.
          </p>
          <div className="text-xs text-emerald-200/80 mt-4">
            Effective Date: October 2026 • Compliant with Kenya Data Protection Act (2019) & GDPR
          </div>
        </div>
      </section>

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-xs text-stone-500">
          <Link to="/" className="hover:text-emerald-800 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-stone-900 font-semibold">Privacy Policy</span>
        </div>
      </div>

      {/* Policy Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="bg-white rounded-3xl p-6 sm:p-12 shadow-sm border border-stone-200/80 space-y-10 text-stone-700 text-sm leading-relaxed">

          {/* Section 1 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-stone-900 font-bold text-lg font-serif">
              <span className="w-8 h-8 rounded-xl bg-emerald-50 text-[#0F5E1F] flex items-center justify-center text-xs font-mono font-bold">01</span>
              <h2>Who We Are</h2>
            </div>
            <p>
              Smugsafaris Tours & Travel (&quot;Smugsafaris&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is a licensed Kenyan safari tour operator and travel agency headquartered in Eldoret, Uasin Gishu County, Kenya (Registration: KATO Bonded #482). We curate bespoke wildlife safaris, hotel and lodge reservations, 4x4 Land Cruiser expeditions, and transfer services across Kenya, Tanzania, Uganda, and Rwanda.
            </p>
            <p>
              For any questions regarding this Privacy Policy or your personal data, you may reach our Data Controller at <a href="mailto:info@smugsafaris.co.ke" className="text-emerald-700 font-semibold underline">info@smugsafaris.co.ke</a>.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-stone-900 font-bold text-lg font-serif">
              <span className="w-8 h-8 rounded-xl bg-emerald-50 text-[#0F5E1F] flex items-center justify-center text-xs font-mono font-bold">02</span>
              <h2>Information We Collect</h2>
            </div>
            <p>
              When you interact with our website, request a tailor-made safari quote, or confirm a reservation, we may collect the following categories of information:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Contact & Identification Data:</strong> Full name, email address, phone number (including WhatsApp contact details), nationality, and country of residence.</li>
              <li><strong>Travel & Safari Preferences:</strong> Proposed travel dates, group size, number of adults and children, preferred safari accommodation tier (Luxury, Mid-Range, Budget), dietary preferences, and special medical or accessibility requirements.</li>
              <li><strong>Official Travel Verification:</strong> Passport details (full legal name, passport number, date of birth, expiration date) strictly when required by the Kenya Wildlife Service (KWS), national park authorities, domestic bush flight carriers, or safari lodges to issue entry permits and boarding manifests.</li>
              <li><strong>Technical & Analytical Data:</strong> IP address, browser type, device information, pages viewed, time spent on tour itineraries, and referral sources, collected via Google Tag Manager and Google Analytics.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-stone-900 font-bold text-lg font-serif">
              <span className="w-8 h-8 rounded-xl bg-emerald-50 text-[#0F5E1F] flex items-center justify-center text-xs font-mono font-bold">03</span>
              <h2>How We Use Your Personal Data</h2>
            </div>
            <p>
              We process your personal information strictly for legitimate business and travel fulfillment purposes, including:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                { title: 'Safari Fulfillment', desc: 'Reserving safari lodges, tented camps, park entry permits, and 4x4 vehicles.' },
                { title: 'Emergency Medevac', desc: 'Registering guests with AMREF Flying Doctors emergency medical evacuation services.' },
                { title: 'Customer Support', desc: 'Communicating via WhatsApp, phone, or email regarding itinerary updates and flight timing.' },
                { title: 'Website Optimization', desc: 'Improving site speed, usability, and tour package relevance via anonymous analytics.' },
              ].map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80">
                  <div className="flex items-center gap-1.5 font-bold text-stone-900 text-xs mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{item.title}</span>
                  </div>
                  <p className="text-xs text-stone-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-stone-900 font-bold text-lg font-serif">
              <span className="w-8 h-8 rounded-xl bg-emerald-50 text-[#0F5E1F] flex items-center justify-center text-xs font-mono font-bold">04</span>
              <h2>Third-Party Data Sharing & Protection</h2>
            </div>
            <p>
              <strong>We never sell, rent, or trade your personal data to any third party or marketing broker.</strong> Information is shared solely with vetted partners directly involved in your safari execution:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Park & Conservation Authorities:</strong> Kenya Wildlife Service (KWS), Maasai Mara County Council, Ngorongoro Conservation Area Authority, and Tanzania National Parks (TANAPA).</li>
              <li><strong>Lodges & Accommodations:</strong> The specific safari lodges or luxury tented camps specified in your agreed itinerary.</li>
              <li><strong>Emergency Medical Providers:</strong> AMREF Flying Doctors for emergency aerial ambulance and trauma triage.</li>
              <li><strong>Payment Processors:</strong> Licensed, PCI-DSS compliant international payment gateways and commercial banking partners.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-stone-900 font-bold text-lg font-serif">
              <span className="w-8 h-8 rounded-xl bg-emerald-50 text-[#0F5E1F] flex items-center justify-center text-xs font-mono font-bold">05</span>
              <h2>Cookies & Tracking Technologies</h2>
            </div>
            <p>
              We utilize cookies and tracking technologies (such as Google Tag Manager and Google Analytics 4) to monitor website performance and improve user navigation. Cookies do not store private passwords or credit card numbers. You can instruct your browser to refuse all cookies or indicate when a cookie is being sent.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-stone-900 font-bold text-lg font-serif">
              <span className="w-8 h-8 rounded-xl bg-emerald-50 text-[#0F5E1F] flex items-center justify-center text-xs font-mono font-bold">06</span>
              <h2>Your Legal Rights</h2>
            </div>
            <p>
              Under the Kenya Data Protection Act 2019 and the European Union General Data Protection Regulation (GDPR), you have the right to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Request access to the personal data we hold about you.</li>
              <li>Request correction of inaccurate or incomplete personal records.</li>
              <li>Request erasure of your data once your safari has concluded and statutory tax requirements are fulfilled.</li>
              <li>Object to or restrict the processing of your personal information.</li>
            </ul>
          </section>

          {/* Section 7: Contact */}
          <section className="pt-6 border-t border-stone-200">
            <div className="bg-[#FAF9F5] rounded-2xl p-6 border border-stone-200 space-y-3">
              <h3 className="font-bold text-stone-900 text-sm">Contact Our Data Protection Office</h3>
              <p className="text-xs text-stone-600">
                To exercise any of your data rights or make inquiries concerning privacy practices, please contact:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="flex items-center gap-2 text-stone-800">
                  <Mail className="w-4 h-4 text-emerald-600" />
                  <span>info@smugsafaris.co.ke</span>
                </div>
                <div className="flex items-center gap-2 text-stone-800">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>+254 769 920 741</span>
                </div>
                <div className="flex items-center gap-2 text-stone-800">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>Eldoret, Kenya</span>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};
