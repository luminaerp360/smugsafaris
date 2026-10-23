import React from 'react';
import { Award, Compass, HeartHandshake, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ScrollReveal } from './ScrollReveal';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      num: '01',
      title: 'Native Naturalist Guides',
      desc: 'Licensed KPSGA Silver & Gold trackers with lifelong bush instincts and wildlife mastery.',
      icon: Award,
      proof: 'Generational tracking experts',
    },
    {
      num: '02',
      title: 'Custom 4x4 Land Cruisers',
      desc: 'Heavy-duty 4x4s with 360° pop-up roofs, onboard coolers, USB ports, and guaranteed window seats.',
      icon: Compass,
      proof: '100% custom safari fleet',
    },
    {
      num: '03',
      title: '100% Private Flexibility',
      desc: 'Your private vehicle and guide. Linger as long as you wish at every predator sighting with zero rush.',
      icon: HeartHandshake,
      proof: 'Zero shared group compromises',
    },
    {
      num: '04',
      title: 'Direct Operator & Local Impact',
      desc: 'Eldoret HQ operations with direct pricing (no broker markups) and direct support for indigenous conservancies.',
      icon: ShieldCheck,
      proof: 'Best value & community backed',
    },
  ];

  return (
    <section id="why-us" className="py-8 sm:py-10 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with inline CTA */}
        <ScrollReveal direction="left" distance={25}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#1E7A2E] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60 inline-block mb-1.5">
                The Smugsafaris Difference
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] tracking-tight">
                Why Discerning Travelers Choose Us
              </h2>
              <p className="mt-1 text-neutral-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
                Native trackers, private custom 4x4 fleet, and transparent local rates safeguarding your African journey.
              </p>
            </div>
            <Link
              to="/why-us"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#1E7A2E] bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-all border border-emerald-200/80 shrink-0 self-start md:self-auto hover:translate-x-0.5"
            >
              <span>Explore All Standards</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Compact 4-Pillar Symmetrical Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <ScrollReveal
                key={pillar.num}
                direction="up"
                delay={Math.min(idx * 60, 180)}
                distance={20}
                className="h-full"
              >
                <div className="p-4 sm:p-5 rounded-2xl bg-[#FAFAF8] border border-neutral-200 hover:border-[#1E7A2E]/50 hover:bg-white hover:shadow-md transition-all duration-300 flex flex-col justify-between group h-full">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100/70 text-[#1E7A2E] flex items-center justify-center group-hover:bg-[#1E7A2E] group-hover:text-white transition-colors duration-200">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-mono font-bold text-neutral-400">
                        {pillar.num}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-neutral-900 group-hover:text-[#1E7A2E] transition-colors leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-neutral-600 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-2.5 border-t border-neutral-200/70 flex items-center gap-1.5 text-[11px] font-semibold text-[#0F5E1F]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1E7A2E] shrink-0" />
                    <span className="truncate">{pillar.proof}</span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
