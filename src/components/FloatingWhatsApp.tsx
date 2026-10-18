import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, ShieldCheck, CheckCheck } from 'lucide-react';
import { trackWhatsAppClick } from '../utils/gtm';

const WHATSAPP_NUMBER = '254769920741';
const DISPLAY_NUMBER = '+254 769 920 741';

interface QuickPrompt {
  id: string;
  label: string;
  icon: string;
  message: string;
}

const QUICK_PROMPTS: QuickPrompt[] = [
  {
    id: 'mara',
    label: 'Maasai Mara Migration',
    icon: '🦁',
    message: 'Hello Smugsafaris! I am interested in the Maasai Mara Great Migration safari. Could you share available dates and packages?',
  },
  {
    id: 'amboseli',
    label: 'Amboseli Kilimanjaro',
    icon: '🏔️',
    message: 'Hi Smugsafaris! I would love details and pricing for an Amboseli safari with Mt. Kilimanjaro views.',
  },
  {
    id: 'tailor',
    label: 'Custom Tailor-Made Safari',
    icon: '🚙',
    message: 'Jambo! I would like to plan a custom tailor-made safari package for my group. Could you help me with an itinerary?',
  },
  {
    id: 'transfer',
    label: 'Lodge & Airport Transfer',
    icon: '🏨',
    message: 'Hello! I need assistance with hotel/lodge reservations and airport VIP transfers in Kenya.',
  },
  {
    id: 'general',
    label: 'Current 2026/2027 Rates',
    icon: '✨',
    message: 'Hello Smugsafaris desk! Could you please share your latest safari packages and seasonal pricing?',
  },
];

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const [showTooltip, setShowTooltip] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto focus input when opened
  useEffect(() => {
    if (isOpen) {
      setShowTooltip(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  const handleOpenWhatsApp = (text: string, promptId?: string) => {
    trackWhatsAppClick(`interactive_widget_${promptId || 'custom'}`, text);
    const encoded = encodeURIComponent(text.trim());
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setCustomMessage('');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMessage.trim()) {
      handleOpenWhatsApp('Hello Smugsafaris! I would like to plan a safari trip with you.');
      return;
    }
    handleOpenWhatsApp(customMessage, 'custom_input');
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
      {/* Interactive Chat Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Smugsafaris WhatsApp Chat"
          className="mb-3 w-[calc(100vw-2.5rem)] sm:w-[380px] max-w-[390px] bg-white rounded-3xl shadow-2xl shadow-emerald-950/25 border border-stone-200/90 overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-5 duration-300"
          style={{ maxHeight: '82vh' }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0F5E1F] via-[#166527] to-[#075E54] text-white p-4 relative flex items-center gap-3">
            {/* Smugsafari Logo Avatar with glowing online status */}
            <div className="relative shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-white/95 p-1 flex items-center justify-center shadow-md ring-2 ring-white/30 overflow-hidden">
                <img
                  src="/logo-emblem-transparent.png"
                  alt="Smugsafaris"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/logo.png';
                  }}
                />
              </div>
              <span
                className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 ring-2 ring-white"
                title="Online Now"
              />
            </div>

            {/* Title & Status */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm text-white truncate tracking-tight">
                  Smugsafaris Tours & Travel
                </h3>
                <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[9px] font-extrabold bg-amber-400 text-stone-900 shrink-0">
                  VERIFIED
                </span>
              </div>
              <p className="text-[11px] text-emerald-100 flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                <span>Online • Safari Planning Desk Eldoret</span>
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close WhatsApp chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Subheader: Trust Bar */}
          <div className="bg-[#FAF9F5] border-b border-stone-200/70 px-4 py-1.5 flex items-center justify-between text-[11px] text-stone-600">
            <span className="inline-flex items-center gap-1 font-medium text-emerald-800">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FDB913]" />
              <span>KATO Bonded #482</span>
            </span>
            <span className="text-stone-400">Direct: {DISPLAY_NUMBER}</span>
          </div>

          {/* Chat Conversation Body */}
          <div className="p-4 bg-[#ECE5DD]/30 overflow-y-auto space-y-3.5 flex-1 max-h-[340px]">
            {/* Timestamp */}
            <div className="flex justify-center">
              <span className="px-2.5 py-0.5 rounded-full bg-white/90 shadow-2xs text-[10px] text-stone-500 font-medium uppercase tracking-wider">
                Today • Live Support
              </span>
            </div>

            {/* Agent Welcome Message */}
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#1E7A2E] text-white flex items-center justify-center text-[10px] font-bold shrink-0 shadow-2xs">
                S
              </div>
              <div className="bg-white rounded-2xl rounded-tl-xs p-3 shadow-sm border border-stone-200/80 max-w-[85%] text-xs text-stone-800 space-y-1">
                <p className="font-semibold text-emerald-800 text-[11px]">
                  Jambo from Kenya! 👋
                </p>
                <p className="leading-relaxed">
                  Welcome to Smugsafaris. How can our safari team assist your adventure today?
                </p>
                <div className="flex items-center justify-end gap-1 text-[10px] text-stone-400 pt-0.5">
                  <span>Just now</span>
                  <CheckCheck className="w-3 h-3 text-emerald-600" />
                </div>
              </div>
            </div>

            {/* Quick Interactive Prompt Chips */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center gap-1 text-[11px] font-bold text-stone-600 px-1">
                <Sparkles className="w-3 h-3 text-[#FDB913]" />
                <span>Tap a prompt to chat immediately:</span>
              </div>
              <div className="flex flex-col gap-1.5">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt.id}
                    onClick={() => handleOpenWhatsApp(prompt.message, prompt.id)}
                    className="group w-full text-left p-2.5 rounded-xl bg-white hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 transition-all shadow-2xs hover:shadow-xs flex items-center justify-between gap-2 cursor-pointer"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-base shrink-0">{prompt.icon}</span>
                      <span className="text-xs font-semibold text-stone-800 group-hover:text-emerald-900 truncate">
                        {prompt.label}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 group-hover:bg-emerald-100 px-2 py-0.5 rounded-full shrink-0 flex items-center gap-1">
                      <span>Chat</span>
                      <Send className="w-2.5 h-2.5" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Custom Message Input Footer */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 bg-white border-t border-stone-200 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="Type your question or destination..."
              className="flex-1 text-xs px-3.5 py-2.5 rounded-xl bg-stone-100 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-stone-800 transition-all placeholder:text-stone-400"
            />
            <button
              type="submit"
              className="w-9 h-9 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20ba59] hover:to-[#0e7467] text-white flex items-center justify-center transition-all shadow-md hover:scale-105 active:scale-95 shrink-0 cursor-pointer"
              title="Send to WhatsApp"
              aria-label="Send message to WhatsApp"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Trigger Button with Tooltip */}
      <div className="flex items-center gap-2.5">
        {/* Animated Greeting Bubble (when closed) */}
        {!isOpen && showTooltip && (
          <div className="hidden sm:flex bg-white rounded-2xl p-3 shadow-xl border border-stone-200 max-w-xs text-xs text-stone-800 relative animate-fade-in items-start gap-2.5">
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-stone-100 text-stone-400 hover:text-stone-700 flex items-center justify-center border border-stone-200 cursor-pointer"
              aria-label="Dismiss message"
            >
              <X className="w-3 h-3" />
            </button>
            <div className="w-8 h-8 rounded-xl bg-[#FAF9F5] border border-stone-200 p-0.5 shrink-0 overflow-hidden flex items-center justify-center">
              <img
                src="/logo-emblem-transparent.png"
                alt="Smugsafaris"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/logo.png';
                }}
              />
            </div>
            <div>
              <span className="font-bold text-[#0F5E1F] block text-xs">
                Need Safari Advice?
              </span>
              <p className="text-[11px] text-stone-600 mt-0.5 leading-snug">
                Chat live with our Eldoret desk on WhatsApp for instant dates & rates!
              </p>
            </div>
          </div>
        )}

        {/* The Main Round WhatsApp Trigger Button */}
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            if (!isOpen) {
              trackWhatsAppClick('interactive_widget_opened');
            }
          }}
          className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 group relative cursor-pointer ${
            isOpen
              ? 'bg-stone-800 hover:bg-stone-900 rotate-90'
              : 'bg-gradient-to-tr from-[#1E7A2E] via-[#25D366] to-[#128C7E] hover:from-[#166527] hover:to-[#0F5E1F]'
          }`}
          aria-label={isOpen ? 'Close WhatsApp Widget' : 'Open Smugsafaris WhatsApp Chat Widget'}
          title={isOpen ? 'Close' : 'Chat with Smugsafaris on WhatsApp'}
        >
          {isOpen ? (
            <X className="w-6 h-6 sm:w-7 sm:h-7" />
          ) : (
            <>
              <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 fill-white" />
              {/* Online Pulse Indicator */}
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FDB913] border-2 border-white animate-ping" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FDB913] border-2 border-white flex items-center justify-center text-[8px] font-black text-stone-900">
                1
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
