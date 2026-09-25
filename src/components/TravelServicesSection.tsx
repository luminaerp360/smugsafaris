import React from 'react';
import { SERVICES_DATA } from '../data/safariData';
import { useSafari } from '../context/SafariContext';
import { Compass, Plane, Hotel, MapPin, ShieldCheck, Sunrise, Check, ArrowRight } from 'lucide-react';

export const TravelServicesSection: React.FC = () => {
  const { openInquiry } = useSafari();

  const iconMap: Record<string, any> = {
    Compass,
    Plane,
    Hotel,
    MapPin,
    ShieldCheck,
    Sunrise,
  };

  return (
    <section id="services" className="py-16 md:py-24 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#1E7A2E]">
            Full-Spectrum Safari & Travel Solutions
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] tracking-tight mt-1">
            Our Safari & Travel Services
          </h2>
          <p className="mt-3 text-neutral-600 text-sm sm:text-base leading-relaxed">
            Beyond packaged wildlife tours, we provide end-to-end travel logistics across East Africa for private travelers, film crews, photographers, and corporate groups.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES_DATA.map((srv) => {
            const Icon = iconMap[srv.iconName] || Compass;
            return (
              <div
                key={srv.id}
                className="bg-[#FAFAF8] rounded-2xl border border-neutral-200 p-6 flex flex-col justify-between hover:border-[#1E7A2E]/50 hover:shadow-sm transition-all duration-300"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#0F5E1F] flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#1E7A2E]" />
                  </div>

                  <h3 className="text-lg font-bold text-neutral-900">
                    {srv.title}
                  </h3>
                  <span className="text-xs font-semibold text-[#F7941D] block mt-0.5">
                    {srv.tagline}
                  </span>

                  <p className="mt-3 text-xs text-neutral-600 leading-relaxed">
                    {srv.description}
                  </p>

                  <div className="mt-4 pt-3.5 border-t border-neutral-200/80 space-y-1.5">
                    {srv.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-neutral-700">
                        <Check className="w-3.5 h-3.5 text-[#1E7A2E] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-200/60">
                  <button
                    onClick={() => openInquiry()}
                    className="w-full py-2.5 px-3 rounded-lg bg-white border border-neutral-200 hover:border-[#1E7A2E] text-xs font-bold text-neutral-800 hover:text-[#1E7A2E] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Inquire About This Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
