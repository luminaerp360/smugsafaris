import React, { useState, useMemo } from 'react';
import { useSafari } from '../context/SafariContext';
import { Calculator, Check, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const SafariCostEstimator: React.FC = () => {
  const { formatPrice, openInquiry } = useSafari();

  const [days, setDays] = useState<number>(7);
  const [tier, setTier] = useState<'mid-range' | 'luxury' | 'budget'>('mid-range');
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [balloonSafari, setBalloonSafari] = useState<boolean>(false);
  const [culturalVisit, setCulturalVisit] = useState<boolean>(true);

  // Daily baseline costs per person based on tier
  const tierCostMap = {
    budget: { baseDaily: 210, label: 'Budget Camping & Basic Lodges' },
    'mid-range': { baseDaily: 280, label: 'Comfort Lodges & Classic Tented Camps' },
    luxury: { baseDaily: 420, label: '5-Star Luxury Tented Camps & Reserves' },
  };

  const calculatedTotal = useMemo(() => {
    const dailyRate = tierCostMap[tier].baseDaily;
    const adultCost = adults * dailyRate * days;
    const childCost = children * (dailyRate * 0.65) * days; // 35% discount for kids

    let addOns = 0;
    if (balloonSafari) {
      addOns += 450 * (adults + children);
    }
    if (culturalVisit) {
      addOns += 30 * (adults + children);
    }

    const total = adultCost + childCost + addOns;
    const perPerson = total / Math.max(1, adults + children);

    return {
      total,
      perPerson: Math.round(perPerson),
    };
  }, [days, tier, adults, children, balloonSafari, culturalVisit]);

  const handleBookEstimate = () => {
    openInquiry();
  };

  return (
    <section className="py-16 md:py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#182F1D] to-[#122416] rounded-3xl p-6 sm:p-10 lg:p-12 text-white shadow-xl border border-[#2D5A34]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Interactive Inputs */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-700/60 text-xs font-semibold text-emerald-300 mb-4">
                <Calculator className="w-3.5 h-3.5 text-[#FDB913]" />
                <span>Interactive Safari Calculator</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Plan Your Safari Budget in Seconds
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-xl">
                Estimate private safari costs across Kenya & Tanzania including dedicated 4x4 cruiser, wildlife guide, park fees, and full-board lodging.
              </p>

              <div className="mt-8 space-y-6">
                {/* Duration Slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-neutral-300 uppercase tracking-wider">Safari Duration:</span>
                    <span className="text-[#FDB913] text-sm tabular-nums">{days} Days / {days - 1} Nights</span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="14"
                    step="1"
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                    className="w-full accent-[#7CC142] cursor-pointer h-2 bg-emerald-950 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
                    <span>3 Days (Short)</span>
                    <span>7 Days (Classic)</span>
                    <span>14 Days (Grand)</span>
                  </div>
                </div>

                {/* Accommodation Style Tier */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                    Accommodation Tier
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['budget', 'mid-range', 'luxury'] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTier(t)}
                        className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                          tier === t
                            ? 'bg-[#1E7A2E] border-[#7CC142] text-white shadow-sm'
                            : 'bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10'
                        }`}
                      >
                        <span className="capitalize block">{t}</span>
                        <span className="text-[10px] font-normal opacity-80 block mt-0.5">
                          {t === 'budget' ? 'Adventure Camp' : t === 'mid-range' ? 'Comfort Lodge' : '5★ Luxury Tents'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Guest Counts */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1">
                      Adults (12+ yrs)
                    </label>
                    <div className="flex items-center gap-3 bg-white/10 rounded-xl p-1.5 border border-white/15">
                      <button
                        type="button"
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        className="w-8 h-8 rounded-lg bg-white/10 text-white font-bold flex items-center justify-center hover:bg-white/20"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center font-bold text-sm tabular-nums">{adults}</span>
                      <button
                        type="button"
                        onClick={() => setAdults(Math.min(12, adults + 1))}
                        className="w-8 h-8 rounded-lg bg-white/10 text-white font-bold flex items-center justify-center hover:bg-white/20"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1">
                      Children (3-11 yrs)
                    </label>
                    <div className="flex items-center gap-3 bg-white/10 rounded-xl p-1.5 border border-white/15">
                      <button
                        type="button"
                        onClick={() => setChildren(Math.max(0, children - 1))}
                        className="w-8 h-8 rounded-lg bg-white/10 text-white font-bold flex items-center justify-center hover:bg-white/20"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center font-bold text-sm tabular-nums">{children}</span>
                      <button
                        type="button"
                        onClick={() => setChildren(Math.min(8, children + 1))}
                        className="w-8 h-8 rounded-lg bg-white/10 text-white font-bold flex items-center justify-center hover:bg-white/20"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Optional Experiences */}
                <div className="pt-2">
                  <span className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                    Optional Safari Add-ons
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <label className="flex items-center gap-2.5 p-2 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer border border-white/10">
                      <input
                        type="checkbox"
                        checked={balloonSafari}
                        onChange={(e) => setBalloonSafari(e.target.checked)}
                        className="rounded accent-[#F7941D]"
                      />
                      <span>Hot Air Balloon ($450 pp)</span>
                    </label>
                    <label className="flex items-center gap-2.5 p-2 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer border border-white/10">
                      <input
                        type="checkbox"
                        checked={culturalVisit}
                        onChange={(e) => setCulturalVisit(e.target.checked)}
                        className="rounded accent-[#F7941D]"
                      />
                      <span>Maasai Cultural Village ($30 pp)</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Estimated Price Summary Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl p-6 sm:p-7 text-neutral-800 shadow-xl border border-neutral-200 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#1E7A2E] block">
                    Indicative Cost Estimate
                  </span>
                  
                  <div className="mt-3 pb-4 border-b border-neutral-200">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-extrabold text-[#0F5E1F] tabular-nums">
                        {formatPrice(calculatedTotal.total)}
                      </span>
                      <span className="text-xs text-neutral-500 font-medium">total group</span>
                    </div>
                    <p className="text-xs text-neutral-500 mt-1">
                      Approx. <span className="font-bold text-neutral-700">{formatPrice(calculatedTotal.perPerson)}</span> per person for {adults + children} travelers
                    </p>
                  </div>

                  <div className="py-4 space-y-2 text-xs text-neutral-600">
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#1E7A2E] shrink-0" />
                      <span>Private 4x4 Toyota Land Cruiser & Fuel</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#1E7A2E] shrink-0" />
                      <span>Certified Professional Safari Driver-Guide</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#1E7A2E] shrink-0" />
                      <span>Full Board (All meals on safari)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#1E7A2E] shrink-0" />
                      <span>All National Park & Conservation Entry Fees</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#1E7A2E] shrink-0" />
                      <span>AMREF Flying Doctors Medical Evac Included</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-100">
                  <button
                    onClick={handleBookEstimate}
                    className="w-full py-3.5 px-4 text-xs font-bold text-white bg-gradient-to-r from-[#F7941D] to-[#E8720C] hover:from-[#f99f34] hover:to-[#f07b15] rounded-xl shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer transform active:scale-95"
                  >
                    <Sparkles className="w-4 h-4 text-amber-100" />
                    <span>Request Detailed Proposal & Quote</span>
                  </button>
                  <p className="text-[10px] text-center text-neutral-400 mt-2">
                    No payment required now. Custom itinerary finalized with our experts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
