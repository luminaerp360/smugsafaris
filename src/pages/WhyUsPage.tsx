import React from 'react';
import { Link } from 'react-router-dom';
import { useSafari } from '../context/SafariContext';
import {
  ShieldCheck,
  Award,
  Users,
  Compass,
  CheckCircle2,
  XCircle,
  Sparkles,
  ChevronRight,
  HeartHandshake,
  Zap,
  Radio,
  Camera,
  Coffee,
  Heart,
  ArrowRight,
} from 'lucide-react';

export const WhyUsPage: React.FC = () => {
  const { openInquiry } = useSafari();

  const pillars = [
    {
      num: '01',
      title: 'KATO Bonded & Certified Operator (#482)',
      subtitle: 'Complete Financial Security & Industry Excellence',
      description:
        'Smugsafaris is a fully bonded member of the Kenya Association of Tour Operators (KATO Bond Scheme #482). This guarantees that every dollar you deposit is protected under a strict code of ethics and bonding regulations overseen by Kenya Tourism Board.',
      icon: ShieldCheck,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    },
    {
      num: '02',
      title: 'Custom 4x4 Safari Land Cruisers Only',
      subtitle: 'Never Minivans. Purpose-Built Heavy-Duty Cruisers.',
      description:
        'While budget operators squeeze guests into 2WD minivans that get stuck in the mud, we operate heavy-duty 4x4 Toyota Land Cruisers fitted with wide pop-up observation roofs, high clearance, and guaranteed window seats for every traveler.',
      icon: Compass,
      color: 'text-amber-700 bg-amber-50 border-amber-200',
    },
    {
      num: '03',
      title: 'KPSGA Silver & Gold Naturalist Guides',
      subtitle: 'Native East African Wildlife Experts',
      description:
        'Our driver-guides have over a decade of tracking experience in the savannah and hold certifications from the Kenya Professional Safari Guides Association (KPSGA). They interpret animal behavior, anticipate predator moves, and share ancient bush lore.',
      icon: Award,
      color: 'text-blue-700 bg-blue-50 border-blue-200',
    },
    {
      num: '04',
      title: 'AMREF Flying Doctors Coverage Included',
      subtitle: '24/7 Aero-Medical Emergency Evacuation',
      description:
        'Your safety is paramount. Every Smugsafaris guest is automatically covered with AMREF Flying Doctors tourist evacuation insurance. In any medical emergency, a specialized ICU aircraft will evacuate you directly from the nearest bush airstrip to Nairobi.',
      icon: Zap,
      color: 'text-red-700 bg-red-50 border-red-200',
    },
    {
      num: '05',
      title: '100% Transparent, No-Hidden-Fee Pricing',
      subtitle: 'All Park Fees, Taxes & Logistics Included Upfront',
      description:
        'No unpleasant surprises on arrival. Our quotes clearly detail all national park conservation fees, government VAT, vehicle fuel, guide allowances, and lodge inclusions. Free postponement of dates is also permitted up to 12 months in advance.',
      icon: HeartHandshake,
      color: 'text-teal-700 bg-teal-50 border-teal-200',
    },
    {
      num: '06',
      title: 'Ethical Eco-Safaris & Community Support',
      subtitle: 'Protecting Wildlife & Empowering Native Communities',
      description:
        'We adhere to strict off-road driving guidelines to prevent habitat erosion and avoid crowding predators. A portion of every booking directly funds local primary schools and water borehole projects in Maasai and Samburu communities.',
      icon: Heart,
      color: 'text-purple-700 bg-purple-50 border-purple-200',
    },
  ];

  const fleetFeatures = [
    {
      icon: Camera,
      title: 'Full 360° Pop-Up Roof',
      desc: 'Unobstructed photographic angles and wildlife observation without shooting through glass.',
    },
    {
      icon: Zap,
      title: 'USB & 220V Power Inverters',
      desc: 'Keep camera batteries, drones, and smartphones charged continuously on every game drive.',
    },
    {
      icon: Coffee,
      title: 'Onboard Coolbox / Fridge',
      desc: 'Complimentary chilled bottled water and refreshments maintained at crisp cold temperature.',
    },
    {
      icon: Radio,
      title: 'Long-Range HF Two-Way Radio',
      desc: 'Real-time park warden and guide communications to locate rare predator sightings quickly.',
    },
    {
      icon: Users,
      title: 'Guaranteed Window Seating',
      desc: 'Individual window seating for all passengers with individual beanbag camera mounts.',
    },
    {
      icon: ShieldCheck,
      title: 'Comprehensive Safety Gear',
      desc: 'First-aid trauma kit, dual spare tires, high-lift jack, fire extinguisher, and mud recovery sand-tracks.',
    },
  ];

  const comparisonRows = [
    {
      feature: 'Vehicle Type',
      smug: 'Custom Heavy-Duty 4x4 Toyota Land Cruiser',
      others: 'Standard 2WD Minivans or crowded vans',
    },
    {
      feature: 'Window Seat Policy',
      smug: '100% Guaranteed individual window seat',
      others: 'Middle seats frequently filled',
    },
    {
      feature: 'Onboard Power & Charging',
      smug: 'Inverter with standard USB & AC plugs',
      others: 'Rarely available or driver cigarette lighter only',
    },
    {
      feature: 'Driver-Guide Certification',
      smug: 'KPSGA Certified Naturalists (10+ yrs exp)',
      others: 'Freelance drivers with variable knowledge',
    },
    {
      feature: 'Emergency Medical Evac',
      smug: 'AMREF Flying Doctors included automatically',
      others: 'Optional extra charge or not offered',
    },
    {
      feature: 'KATO Bonded Financial Security',
      smug: 'Bonded #482 (100% deposit protection)',
      others: 'Unregistered / unlicensed operators',
    },
  ];

  return (
    <div className="bg-[#FAF9F5] min-h-screen pb-16">
      {/* 1. Header Banner */}
      <div className="bg-[#0B3813] text-white py-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#FDB913_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-xs text-emerald-200/80 mb-3">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-emerald-400" />
            <span className="text-white font-medium">Why Choose Us</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-700/60">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FDB913]" />
              The Smugsafaris Standard
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3">
              Why Discerning Travelers Choose Smugsafaris
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              We believe a safari in Africa should be a seamless, exhilarating, and life-changing journey. Discover how our standards set us apart.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 2. The 6 Pillars */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#1E7A2E] uppercase tracking-wider">
            Built on Uncompromising Quality
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-1">
            Our Six Core Trust Pillars
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-2">
            Every safari we operate is guided by these principles to ensure an authentic and worry-free African adventure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.num}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${p.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black text-stone-200">{p.num}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-extrabold text-stone-900 mb-1">
                    {p.title}
                  </h3>
                  <span className="text-xs font-bold text-[#1E7A2E] block mb-3">
                    {p.subtitle}
                  </span>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. The 4x4 Safari Land Cruiser Fleet */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200/80 shadow-sm mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#1E7A2E] uppercase tracking-wider">
              Rugged Comfort on the Savannah
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-1">
              Inside Our Customized Safari Land Cruisers
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-2">
              Engineered specifically for rough East African roads, river crossings, and optimal wildlife photography.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fleetFeatures.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-100">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100/80 text-[#0F5E1F] flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-stone-900 mb-1">{f.title}</h4>
                    <p className="text-xs text-stone-600 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Comparison Table: Smugsafaris vs Other Operators */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-sm mb-16 overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold text-[#1E7A2E] uppercase tracking-wider">
              Transparency Matters
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-1">
              How Smugsafaris Compares
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-2">
              See the difference that investing in superior vehicles, trained guides, and guest safety creates.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-stone-200">
                  <th className="py-3.5 px-4 font-extrabold text-stone-700">Safari Feature</th>
                  <th className="py-3.5 px-4 font-black text-[#1E7A2E] bg-emerald-50/60 rounded-t-xl">
                    Smugsafaris Tours & Travel
                  </th>
                  <th className="py-3.5 px-4 font-semibold text-stone-500">Standard Budget Operators</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {comparisonRows.map((row, i) => (
                  <tr key={i} className="hover:bg-stone-50/50">
                    <td className="py-3.5 px-4 font-bold text-stone-800">{row.feature}</td>
                    <td className="py-3.5 px-4 font-bold text-emerald-900 bg-emerald-50/40">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#1E7A2E] shrink-0" />
                        <span>{row.smug}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-stone-500">
                      <div className="flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-stone-300 shrink-0" />
                        <span>{row.others}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 5. CTA Banner */}
        <div className="bg-gradient-to-r from-[#0F3815] to-[#165522] rounded-3xl p-8 sm:p-10 text-white text-center shadow-lg">
          <h3 className="text-2xl sm:text-3xl font-extrabold mb-3">
            Experience the African Safari You Truly Deserve
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl mx-auto mb-6 leading-relaxed">
            Let our safari specialists tailor a bespoke itinerary matching your dreams, pace, and preferred level of comfort.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => openInquiry()}
              className="w-full sm:w-auto px-8 py-3.5 text-sm font-extrabold text-stone-900 bg-[#FDB913] hover:bg-[#ffc42e] rounded-xl shadow-md transition-all cursor-pointer"
            >
              Request Custom Quote
            </button>
            <Link
              to="/tours"
              className="w-full sm:w-auto px-6 py-3.5 text-sm font-bold text-white bg-white/10 hover:bg-white/20 rounded-xl transition-all"
            >
              Browse Safari Packages
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
