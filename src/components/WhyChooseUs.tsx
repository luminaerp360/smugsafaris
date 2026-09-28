import React from 'react';
import { Award, Compass, HeartHandshake, ShieldCheck, Headphones, TreePine, CheckCircle2 } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      num: '01',
      title: 'Certified Native Naturalist Guides',
      desc: 'Our guides are licensed by the Kenya Professional Safari Guides Association (KPSGA Silver and Gold). Born and raised in the wilderness, they possess legendary tracking instincts and deep knowledge of animal behavior.',
      icon: Award,
      proof: 'Over 500+ successful big cat tracks annually',
    },
    {
      num: '02',
      title: 'Custom 4x4 Safari Land Cruisers',
      desc: 'Purpose-built for East African terrain with 360-degree pop-up photography roofs, high-frequency radios, onboard coolers for cold drinks, and USB charging ports at every seat. Guaranteed window seat for all.',
      icon: Compass,
      proof: 'Full mechanical inspection before every departure',
    },
    {
      num: '03',
      title: '100% Tailor-Made Private Flexibility',
      desc: 'Never get rushed on a game drive. Because your safari vehicle and guide are private, you decide how long to watch a lion pride hunt or pause for the golden hour sunset.',
      icon: HeartHandshake,
      proof: 'Zero cookie-cutter group compromises',
    },
    {
      num: '04',
      title: 'Direct Operator & Best Value Guarantee',
      desc: 'Based directly in Eldoret, Kenya, you deal straight with the source. No foreign intermediaries, no hidden fees, and transparent pricing with all park conservation levies included.',
      icon: ShieldCheck,
      proof: 'Up to 25% better value than overseas brokers',
    },
    {
      num: '05',
      title: '24/7 Concierge & AMREF Medevac',
      desc: 'From airport greeting at Jomo Kenyatta International to your final flight, our operations team monitors your journey 24/7. Every guest is backed by AMREF Flying Doctors emergency aero-medical coverage.',
      icon: Headphones,
      proof: 'Immediate emergency bush airstrip response',
    },
    {
      num: '06',
      title: 'Sustainable Tourism & Community Impact',
      desc: 'We partner directly with community-owned conservancies in the Mara and Samburu ecosystems, providing school bursaries, clean water initiatives, and fair wages for local indigenous families.',
      icon: TreePine,
      proof: '10% of company proceeds support conservancies',
    },
  ];

  return (
    <section id="why-us" className="py-16 md:py-24 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#1E7A2E]">
            The Smugsafaris Difference
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] tracking-tight mt-1">
            Why Discerning Travelers Choose Us
          </h2>
          <p className="mt-3 text-neutral-600 text-sm sm:text-base leading-relaxed">
            Planning a safari is a once-in-a-lifetime investment. Here is how our native expertise, private fleet, and ethical values safeguard your African journey.
          </p>
        </div>

        {/* 6 Pillars Bento-Style Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.num}
                className="p-6 rounded-2xl bg-[#FAFAF8] border border-neutral-200 hover:border-[#1E7A2E]/50 transition-all duration-300 flex flex-col justify-between group shadow-xs hover:shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100/70 text-[#1E7A2E] flex items-center justify-center group-hover:bg-[#1E7A2E] group-hover:text-white transition-colors duration-200">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-neutral-400">
                      {pillar.num}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-neutral-900 group-hover:text-[#1E7A2E] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-xs text-neutral-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-neutral-200/80 flex items-center gap-1.5 text-[11px] font-semibold text-[#0F5E1F]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1E7A2E] shrink-0" />
                  <span>{pillar.proof}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
