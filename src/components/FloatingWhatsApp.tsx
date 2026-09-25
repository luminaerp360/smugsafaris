import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-end flex-col gap-2">
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="bg-white rounded-2xl p-3 shadow-xl border border-neutral-200 max-w-xs text-xs text-neutral-800 relative animate-fade-in flex items-start gap-2">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-neutral-100 text-neutral-400 hover:text-neutral-700 flex items-center justify-center border border-neutral-200 cursor-pointer"
            aria-label="Dismiss message"
          >
            <X className="w-3 h-3" />
          </button>
          <div>
            <span className="font-bold text-[#0F5E1F] block">Need Safari Advice?</span>
            <p className="text-[11px] text-neutral-600 mt-0.5">
              Chat live with our Nairobi safari planning desk for instant availability and dates!
            </p>
          </div>
        </div>
      )}

      {/* Main WhatsApp Float Button */}
      <a
        href="https://wa.me/254700123456?text=Hello%20Smugsafaris!%20I%20would%20like%20to%20plan%20a%20safari%20trip."
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 group relative"
        aria-label="Chat with Smugsafaris on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-white" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-white animate-ping" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-white" />
      </a>
    </div>
  );
};
