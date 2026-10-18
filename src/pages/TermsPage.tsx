import React from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../components/SeoHead';
import { ShieldCheck, FileCheck, AlertCircle, Compass, CheckCircle2, ChevronRight, Phone, Mail, MapPin } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="bg-[#FAF9F5] min-h-screen">
      <SeoHead
        title="Booking Terms & Conditions | Smugsafaris Tours & Travel"
        description="Review the official booking terms, deposit requirements, cancellation policies, and safari conditions for Smugsafaris Tours & Travel Kenya."
        canonicalPath="/terms"
      />

      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#0F5E1F] via-[#166527] to-[#075E54] text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-emerald-200 mb-4">
            <ShieldCheck className="w-4 h-4 text-[#FDB913]" />
            <span>KATO Bonded #482 Fair Booking Policy</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 font-serif">
            Booking Terms & Conditions
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/90 max-w-2xl mx-auto leading-relaxed">
            Please read these terms and conditions carefully before confirming your reservation. They outline the mutual agreements, payment schedules, and cancellation policies governing all Smugsafaris expeditions.
          </p>
          <div className="text-xs text-emerald-200/80 mt-4">
            Last Updated: October 2026 • Governing Law: Laws of the Republic of Kenya
          </div>
        </div>
      </section>

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-xs text-stone-500">
          <Link to="/" className="hover:text-emerald-800 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-stone-900 font-semibold">Booking Terms & Conditions</span>
        </div>
      </div>

      {/* Terms Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="bg-white rounded-3xl p-6 sm:p-12 shadow-sm border border-stone-200/80 space-y-10 text-stone-700 text-sm leading-relaxed">

          {/* Section 1: Agreement */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-stone-900 font-bold text-lg font-serif">
              <span className="w-8 h-8 rounded-xl bg-emerald-50 text-[#0F5E1F] flex items-center justify-center text-xs font-mono font-bold">01</span>
              <h2>The Contract Between Us</h2>
            </div>
            <p>
              A binding contract is formed between Smugsafaris Tours & Travel (&quot;the Company&quot;) and the client (&quot;the Guest&quot;) once a written itinerary is accepted, the required initial deposit is received, and a formal Booking Confirmation Voucher with a unique reference number (e.g. <code>SMUG-XXXXXX</code>) is issued.
            </p>
            <p>
              The individual making the booking warrants that they possess the authority to accept these terms on behalf of all persons named in the safari party.
            </p>
          </section>

          {/* Section 2: Deposits & Payments */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-stone-900 font-bold text-lg font-serif">
              <span className="w-8 h-8 rounded-xl bg-emerald-50 text-[#0F5E1F] flex items-center justify-center text-xs font-mono font-bold">02</span>
              <h2>Deposits & Payment Schedule</h2>
            </div>
            <p>
              To confirm reservations with safari lodges, domestic flight operators, and reserve private 4x4 Land Cruisers, the following payment schedule applies:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/70">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">At Confirmation</span>
                <span className="text-2xl font-black text-emerald-950 block mt-1">30% Deposit</span>
                <p className="text-xs text-stone-600 mt-1">Secures private safari 4x4, certified guide, and lodge room allocations.</p>
              </div>
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80">
                <span className="text-xs font-bold text-stone-600 uppercase tracking-wider block">30 Days Prior</span>
                <span className="text-2xl font-black text-stone-900 block mt-1">70% Balance</span>
                <p className="text-xs text-stone-600 mt-1">Due 30 days before departure. Bookings made inside 30 days require full payment.</p>
              </div>
            </div>
            <p className="text-xs text-stone-500 pt-1">
              Payments are accepted via international bank wire (USD/EUR/GBP), major credit cards (Visa/Mastercard) via secure 3D-secure links, or M-Pesa for Kenyan residents.
            </p>
          </section>

          {/* Section 3: Cancellation & Refund Policy */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-stone-900 font-bold text-lg font-serif">
              <span className="w-8 h-8 rounded-xl bg-emerald-50 text-[#0F5E1F] flex items-center justify-center text-xs font-mono font-bold">03</span>
              <h2>Cancellations, Refunds & Date Postponements</h2>
            </div>
            <p>
              We understand plans can change unexpectedly. All cancellations must be communicated in writing via email to <code>bookings@smugsafaris.co.ke</code>. The date of receipt determines the applicable refund:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-stone-200 rounded-xl overflow-hidden">
                <thead className="bg-stone-100 font-bold text-stone-900">
                  <tr>
                    <th className="p-3 border-b border-stone-200">Notice Period Before Departure</th>
                    <th className="p-3 border-b border-stone-200">Refund Amount</th>
                    <th className="p-3 border-b border-stone-200">Administrative Terms</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  <tr>
                    <td className="p-3 font-semibold text-stone-800">45+ Days</td>
                    <td className="p-3 text-emerald-700 font-bold">Full Refund (100%)</td>
                    <td className="p-3 text-stone-500">Less 5% bank/administrative processing cost</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-stone-800">30 to 44 Days</td>
                    <td className="p-3 text-emerald-700 font-bold">70% Refund</td>
                    <td className="p-3 text-stone-500">30% retained for lodge commitment penalties</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-stone-800">15 to 29 Days</td>
                    <td className="p-3 text-amber-700 font-bold">50% Refund</td>
                    <td className="p-3 text-stone-500">Subject to lodge & park permit cancellation rules</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-stone-800">Less than 14 Days</td>
                    <td className="p-3 text-rose-700 font-bold">Non-refundable</td>
                    <td className="p-3 text-stone-500">Covered by comprehensive travel insurance</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-900">
                <span className="font-bold block">12-Month Free Date Postponement Guarantee:</span>
                Instead of cancelling, you may postpone your safari travel dates for up to <strong>12 months</strong> with zero penalty, subject only to seasonal lodge price differences if moving from low season to peak season.
              </div>
            </div>
          </section>

          {/* Section 4: Safari Vehicles & Guides */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-stone-900 font-bold text-lg font-serif">
              <span className="w-8 h-8 rounded-xl bg-emerald-50 text-[#0F5E1F] flex items-center justify-center text-xs font-mono font-bold">04</span>
              <h2>Safari Vehicles & Professional Guides</h2>
            </div>
            <p>
              All game drives are operated in purpose-built 4x4 Safari Land Cruisers equipped with pop-up photographic roofs, high-frequency two-way long-range radios, charging ports, and onboard cooler boxes. Every guest is guaranteed an unrestricted window seat.
            </p>
            <p>
              Your driver-guide is a certified native naturalist accredited by the Kenya Professional Safari Guides Association (KPSGA). While our guides possess extraordinary tracking expertise, wildlife sightings (including Big Five encounters and river crossings) are subject to nature and cannot be unconditionally guaranteed.
            </p>
          </section>

          {/* Section 5: Travel Insurance & Medical Evacuation */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-stone-900 font-bold text-lg font-serif">
              <span className="w-8 h-8 rounded-xl bg-emerald-50 text-[#0F5E1F] flex items-center justify-center text-xs font-mono font-bold">05</span>
              <h2>Travel Insurance & Medical Evacuation</h2>
            </div>
            <p>
              All guests are strongly advised to purchase comprehensive international travel insurance covering trip cancellation, medical expenses, baggage loss, and repatriation prior to departure.
            </p>
            <p>
              <strong>AMREF Flying Doctors Coverage:</strong> For peace of mind in the remote African bush, all full-safari packages booked through Smugsafaris include emergency medical air ambulance evacuation coverage provided by AMREF Flying Doctors to a premier hospital in Nairobi for stabilization.
            </p>
          </section>

          {/* Section 6: Park Rules & Environmental Ethics */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-stone-900 font-bold text-lg font-serif">
              <span className="w-8 h-8 rounded-xl bg-emerald-50 text-[#0F5E1F] flex items-center justify-center text-xs font-mono font-bold">06</span>
              <h2>Park Regulations & Code of Conduct</h2>
            </div>
            <p>
              Guests must strictly observe all national park and conservation rules established by the Kenya Wildlife Service (KWS) and county councils. Off-road driving where prohibited, harassment of wildlife, littering, and disembarking from vehicles outside designated picnic sites is strictly forbidden. The guide maintains full authority to terminate an activity if safety is compromised.
            </p>
          </section>

          {/* Section 7: Governing Law */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-stone-900 font-bold text-lg font-serif">
              <span className="w-8 h-8 rounded-xl bg-emerald-50 text-[#0F5E1F] flex items-center justify-center text-xs font-mono font-bold">07</span>
              <h2>Governing Law & Jurisdiction</h2>
            </div>
            <p>
              These booking terms and conditions are governed by and construed in accordance with the Laws of the Republic of Kenya. Any disputes arising from this contract shall be submitted to the exclusive jurisdiction of the competent courts of Kenya located in Eldoret or Nairobi.
            </p>
          </section>

          {/* Section 8: Contact */}
          <section className="pt-6 border-t border-stone-200">
            <div className="bg-[#FAF9F5] rounded-2xl p-6 border border-stone-200 space-y-3">
              <h3 className="font-bold text-stone-900 text-sm">Need Help with Your Booking Terms?</h3>
              <p className="text-xs text-stone-600">
                Our reservations desk in Eldoret is happy to answer any questions regarding custom payment arrangements or bespoke itineraries:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="flex items-center gap-2 text-stone-800">
                  <Mail className="w-4 h-4 text-emerald-600" />
                  <span>bookings@smugsafaris.co.ke</span>
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
