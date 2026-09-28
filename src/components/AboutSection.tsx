import React from 'react';
import { TEAM_MEMBERS } from '../data/safariData';
import { ShieldCheck, Compass, Check, Users, Sparkles, Award } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-[#FAFAF8] border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1E7A2E]">
              Our Heritage & Passion
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] tracking-tight mt-1 text-balance">
              Rooted in the African Savannah. Dedicated to Authentic Safaris.
            </h2>
            
            <p className="mt-4 text-sm sm:text-base text-neutral-700 leading-relaxed">
              Founded in Eldoret by veteran Kenyan naturalist guides, <strong className="text-[#0F5E1F]">Smugsafaris Tours & Travel</strong> was born from a simple belief: an African safari should be raw, intimate, and deeply respectful of wildlife and local communities.
            </p>

            <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
              Why the name <em>Smugsafaris</em>? Because when you sit beneath an acacia tree watching a lioness groom her cubs against a blood-orange African sunset, with chilled drinks and a trusted guide beside you, that feeling of serene, quiet fulfillment is unmistakable. We curate the moments that make travelers feel genuinely privileged to witness the wild.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4 text-xs font-semibold text-neutral-800">
              <div className="p-3 bg-white rounded-xl border border-neutral-200 flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#1E7A2E] shrink-0" />
                <span>KATO Bonded Operator #482</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-neutral-200 flex items-center gap-2.5">
                <Award className="w-5 h-5 text-[#F7941D] shrink-0" />
                <span>KPSGA Certified Naturalists</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-neutral-200 flex items-center gap-2.5">
                <Compass className="w-5 h-5 text-[#1E7A2E] shrink-0" />
                <span>Custom Private 4x4 Fleet</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-neutral-200 flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-[#F7941D] shrink-0" />
                <span>Eco-Tourism Gold Standards</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-neutral-200 bg-neutral-900">
              <img
                src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80"
                alt="Smugsafaris expedition in Maasai Mara"
                referrerPolicy="no-referrer"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-xs uppercase tracking-wider font-bold text-[#FDB913]">
                  Eldoret Headquarters · Kenya
                </p>
                <p className="text-sm font-semibold mt-0.5">
                  Over a decade of orchestrating private wildlife journeys across East Africa
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Fleet & Equipment Spotlight */}
        <div className="mt-16 bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8">
          <div className="max-w-2xl mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E7A2E]">
              Our Safari Machinery
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#1A1A1A] mt-1">
              The Purpose-Built 4x4 Land Cruiser Fleet
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              We do not compromise on safari vehicles. Our cruisers are custom-engineered for maximum photography sightlines, comfort over rugged terrain, and total self-sufficiency in remote bush.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-center">
              <span className="font-bold text-neutral-800 block">360° Pop-Up Roof</span>
              <span className="text-[10px] text-neutral-500 mt-0.5 block">Unobstructed wildlife view</span>
            </div>
            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-center">
              <span className="font-bold text-neutral-800 block">Guaranteed Window</span>
              <span className="text-[10px] text-neutral-500 mt-0.5 block">Every guest has private window</span>
            </div>
            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-center">
              <span className="font-bold text-neutral-800 block">Charging Inverter</span>
              <span className="text-[10px] text-neutral-500 mt-0.5 block">USB & AC plugs for cameras</span>
            </div>
            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-center">
              <span className="font-bold text-neutral-800 block">Onboard Fridge</span>
              <span className="text-[10px] text-neutral-500 mt-0.5 block">Cold water & soft drinks</span>
            </div>
            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-center">
              <span className="font-bold text-neutral-800 block">HF Radio Comms</span>
              <span className="text-[10px] text-neutral-500 mt-0.5 block">Live ranger game tracking</span>
            </div>
            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-center">
              <span className="font-bold text-neutral-800 block">Heavy Duty 4WD</span>
              <span className="text-[10px] text-neutral-500 mt-0.5 block">Twin fuel tanks & dual spares</span>
            </div>
          </div>
        </div>

        {/* Meet the Safari Leaders */}
        <div className="mt-16">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1E7A2E]">
              The People Behind Your Journey
            </span>
            <h3 className="text-2xl font-extrabold text-[#1A1A1A] mt-1">
              Meet Our Senior Safari Directors
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              With decades of combined field time, our safari leaders guide your journey with passion, integrity, and warmth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-neutral-800 mb-4">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-base font-bold text-neutral-900">{member.name}</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-bold text-[#1E7A2E]">{member.role}</span>
                    <span className="text-neutral-300">·</span>
                    <span className="text-[11px] text-neutral-500 font-medium">{member.experience}</span>
                  </div>
                  <p className="mt-2.5 text-xs text-neutral-600 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
