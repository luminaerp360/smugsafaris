import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageCircle, Send, Check } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 4000);
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact Information */}
          <div className="lg:col-span-5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1E7A2E]">
              We Are Here for You
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] tracking-tight mt-1">
              Speak With Our Safari Specialists
            </h2>
            <p className="mt-3 text-neutral-600 text-sm sm:text-base leading-relaxed">
              Have questions about safari seasonality, animal migrations, child-friendly camps, or custom logistics? Reach out to our Eldoret team anytime.
            </p>

            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100/70 text-[#1E7A2E] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900">Eldoret Safari Operations</h4>
                  <p className="text-xs text-neutral-600 mt-0.5">
                    Eldoret, Uasin Gishu County, Kenya
                  </p>
                  <span className="text-[11px] text-neutral-400">P.O. Box 30100 Eldoret, Kenya</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100/70 text-[#1E7A2E] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900">Phone & WhatsApp Hotline</h4>
                  <div className="text-xs text-neutral-800 font-semibold mt-0.5 flex flex-col gap-0.5">
                    <a href="tel:+12569477516" className="hover:text-emerald-700 transition-colors">
                      +1 (256) 947-7516 <span className="text-[11px] font-normal text-neutral-500">(USA)</span>
                    </a>
                    <a href="tel:+254741938127" className="hover:text-emerald-700 transition-colors">
                      +254 741 938127 <span className="text-[11px] font-normal text-neutral-500">(Kenya)</span>
                    </a>
                  </div>
                  <span className="text-[11px] text-neutral-400">24/7 Guest Emergency Support</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100/70 text-[#1E7A2E] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900">Email Inquiries</h4>
                  <p className="text-xs text-neutral-800 font-semibold mt-0.5">
                    info@smugsafaris.co.ke
                  </p>
                  <p className="text-xs text-neutral-500">
                    bookings@smugsafaris.co.ke
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100/70 text-[#1E7A2E] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900">Office Working Hours</h4>
                  <p className="text-xs text-neutral-600 mt-0.5">
                    Monday – Saturday: 08:00 AM – 06:00 PM (EAT)
                  </p>
                  <span className="text-[11px] text-neutral-400">Sunday: On-Call Safari Logistics</span>
                </div>
              </div>
            </div>

            {/* Instant WhatsApp Action */}
            <div className="mt-8 pt-6 border-t border-neutral-200">
              <a
                href="https://wa.me/254741938127?text=Hello%20Smugsafaris!%20I%20would%20like%20to%20discuss%20a%20safari%20itinerary."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat Directly on WhatsApp (+254 741 938127)</span>
              </a>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#FAFAF8] rounded-3xl border border-neutral-200 p-6 sm:p-10 shadow-sm">
              <h3 className="text-xl font-extrabold text-neutral-900">
                Send Us a Quick Message
              </h3>
              <p className="text-xs text-neutral-500 mt-1 mb-6">
                Fill in the form below and one of our dedicated safari planners will get back to you promptly.
              </p>

              {sent ? (
                <div className="py-10 text-center bg-white rounded-2xl border border-neutral-200">
                  <Check className="w-12 h-12 text-[#1E7A2E] mx-auto mb-3" />
                  <h4 className="text-base font-bold text-neutral-900">Message Delivered!</h4>
                  <p className="text-xs text-neutral-600 mt-1 max-w-sm mx-auto">
                    Thank you, {name}. A member of our safari team has received your message and will respond within a few hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. John Doe"
                        className="w-full bg-white border border-neutral-200 rounded-xl px-3 py-2.5 text-xs text-neutral-800 focus:outline-none focus:ring-1 focus:ring-[#1E7A2E]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. john@example.com"
                        className="w-full bg-white border border-neutral-200 rounded-xl px-3 py-2.5 text-xs text-neutral-800 focus:outline-none focus:ring-1 focus:ring-[#1E7A2E]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Maasai Mara safari in September"
                      className="w-full bg-white border border-neutral-200 rounded-xl px-3 py-2.5 text-xs text-neutral-800 focus:outline-none focus:ring-1 focus:ring-[#1E7A2E]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                      Your Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Ask about dates, prices, wildlife sightings, or group rates..."
                      className="w-full bg-white border border-neutral-200 rounded-xl px-3 py-2.5 text-xs text-neutral-800 focus:outline-none focus:ring-1 focus:ring-[#1E7A2E]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 text-xs font-bold text-white bg-[#1E7A2E] hover:bg-[#0F5E1F] rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Safari Desk</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
