import React, { useState, useRef, useEffect } from 'react';
import {
  MessageCircle,
  X,
  Send,
  ShieldCheck,
  CheckCheck,
  Binoculars,
  Mountain,
  Compass,
  Building2,
  CalendarCheck,
} from 'lucide-react';
import { trackWhatsAppClick } from '../utils/gtm';

const WHATSAPP_NUMBER = '254769920741';
const DISPLAY_NUMBER = '+254 769 920 741';

interface QuickPrompt {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  bgColor: string;
  message: string;
}

const QUICK_PROMPTS: QuickPrompt[] = [
  {
    id: 'mara',
    label: 'Maasai Mara Migration',
    icon: Binoculars,
    iconColor: 'text-amber-600',
    bgColor: 'bg-amber-50 group-hover:bg-amber-100',
    message: 'Hello Smugsafaris! I am interested in the Maasai Mara Great Migration safari. Could you share available dates and packages?',
  },
  {
    id: 'amboseli',
    label: 'Amboseli Kilimanjaro',
    icon: Mountain,
    iconColor: 'text-emerald-700',
    bgColor: 'bg-emerald-50 group-hover:bg-emerald-100',
    message: 'Hi Smugsafaris! I would love details and pricing for an Amboseli safari with Mt. Kilimanjaro views.',
  },
  {
    id: 'tailor',
    label: 'Custom Tailor-Made Safari',
    icon: Compass,
    iconColor: 'text-blue-600',
    bgColor: 'bg-blue-50 group-hover:bg-blue-100',
    message: 'Jambo! I would like to plan a custom tailor-made safari package for my group. Could you help me with an itinerary?',
  },
  {
    id: 'transfer',
    label: 'Lodge & Airport Transfer',
    icon: Building2,
    iconColor: 'text-teal-700',
    bgColor: 'bg-teal-50 group-hover:bg-teal-100',
    message: 'Hello! I need assistance with hotel/lodge reservations and airport VIP transfers in Kenya.',
  },
  {
    id: 'general',
    label: 'Current 2026/2027 Rates',
    icon: CalendarCheck,
    iconColor: 'text-stone-700',
    bgColor: 'bg-stone-100 group-hover:bg-stone-200',
    message: 'Hello Smugsafaris desk! Could you please share your latest safari packages and seasonal pricing?',
  },
];

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasInteractedRef = useRef(false);
  const autoCloseTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-launch widget on site visit, stay open for 7 seconds, then auto-minimize if not interacted with
  useEffect(() => {
    const alreadyShown = sessionStorage.getItem('smug_wa_autoshown');
    if (alreadyShown) return;

    // Launch 2 seconds after page load
    const openTimer = setTimeout(() => {
      setIsOpen(true);
      sessionStorage.setItem('smug_wa_autoshown', 'true');

      // Auto-close after 7 seconds if user doesn't interact with it
      autoCloseTimerRef.current = setTimeout(() => {
        if (!hasInteractedRef.current) {
          setIsOpen(false);
        }
      }, 7000);
    }, 2000);

    return () => {
      clearTimeout(openTimer);
      if (autoCloseTimerRef.current) {
        clearTimeout(autoCloseTimerRef.current);
      }
    };
  }, []);

  const handleUserInteraction = () => {
    hasInteractedRef.current = true;
    if (autoCloseTimerRef.current) {
      clearTimeout(autoCloseTimerRef.current);
      autoCloseTimerRef.current = null;
    }
  };

  const handleOpenWhatsApp = (text: string, promptId?: string) => {
    handleUserInteraction();
    trackWhatsAppClick(`interactive_widget_${promptId || 'custom'}`, text);
    const encoded = encodeURIComponent(text.trim());
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setCustomMessage('');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    handleUserInteraction();
    if (!customMessage.trim()) {
      handleOpenWhatsApp('Hello Smugsafaris! I would like to plan a safari trip with you.');
      return;
    }
    handleOpenWhatsApp(customMessage, 'custom_input');
  };

  return (
    <div
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end"
      onMouseEnter={handleUserInteraction}
      onTouchStart={handleUserInteraction}
    >
      {/* Interactive Compact Chat Card (Fixed bottom-right corner widget) */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Smugsafaris WhatsApp Chat"
          className="mb-2.5 w-[300px] xs:w-[325px] sm:w-[350px] max-w-[calc(100vw-1.5rem)] bg-white rounded-2xl sm:rounded-3xl shadow-2xl shadow-emerald-950/25 border border-stone-200/90 overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-3 duration-300 text-stone-800"
          style={{ maxHeight: '430px' }}
        >
          {/* Header - Compact & Elegant */}
          <div className="bg-gradient-to-r from-[#0F5E1F] via-[#166527] to-[#075E54] text-white p-3 sm:p-3.5 relative flex items-center gap-2.5">
            {/* Smugsafari Logo Avatar with glowing online status */}
            <div className="relative shrink-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/95 p-1 flex items-center justify-center shadow-md ring-2 ring-white/30 overflow-hidden">
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
                className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-white"
                title="Online Now"
              />
            </div>

            {/* Title & Status */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-xs sm:text-sm text-white truncate tracking-tight">
                  Smugsafaris Tours & Travel
                </h3>
              </div>
              <p className="text-[10px] sm:text-[11px] text-emerald-100/90 flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                <span className="truncate">Online • Safari Desk Eldoret</span>
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={() => {
                handleUserInteraction();
                setIsOpen(false);
              }}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
              aria-label="Close WhatsApp chat"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Subheader: Trust Bar */}
          <div className="bg-[#FAF9F5] border-b border-stone-200/70 px-3 py-1 flex items-center justify-between text-[10px] text-stone-600">
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-800">
              <ShieldCheck className="w-3 h-3 text-[#FDB913]" />
              <span>KATO Bonded #482</span>
            </span>
            <span className="text-stone-400">Direct: {DISPLAY_NUMBER}</span>
          </div>

          {/* Chat Conversation Body */}
          <div className="p-3 bg-[#ECE5DD]/25 overflow-y-auto space-y-2.5 flex-1 max-h-[240px]">
            {/* Agent Welcome Message */}
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-[#1E7A2E] text-white flex items-center justify-center text-[9px] font-bold shrink-0 shadow-2xs">
                S
              </div>
              <div className="bg-white rounded-xl rounded-tl-xs p-2.5 shadow-sm border border-stone-200/80 max-w-[90%] text-xs text-stone-800 space-y-0.5">
                <p className="font-semibold text-emerald-800 text-[11px]">
                  Jambo from Kenya!
                </p>
                <p className="leading-snug text-[11px]">
                  Welcome to Smugsafaris. How can our safari team assist your adventure today?
                </p>
                <div className="flex items-center justify-end gap-1 text-[9px] text-stone-400 pt-0.5">
                  <span>Just now</span>
                  <CheckCheck className="w-3 h-3 text-emerald-600" />
                </div>
              </div>
            </div>

            {/* Quick Interactive Prompt Chips */}
            <div className="space-y-1.5 pt-0.5">
              <p className="text-[10px] font-bold text-stone-500 uppercase tracking-wider px-1">
                Select an inquiry:
              </p>
              <div className="flex flex-col gap-1.5">
                {QUICK_PROMPTS.map((prompt) => {
                  const Icon = prompt.icon;
                  return (
                    <button
                      key={prompt.id}
                      onClick={() => handleOpenWhatsApp(prompt.message, prompt.id)}
                      className="group w-full text-left p-2 rounded-xl bg-white hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 transition-all shadow-2xs hover:shadow-xs flex items-center justify-between gap-2 cursor-pointer"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div
                          className={`w-6 h-6 rounded-lg ${prompt.bgColor} flex items-center justify-center shrink-0 transition-colors`}
                        >
                          <Icon className={`w-3.5 h-3.5 ${prompt.iconColor}`} />
                        </div>
                        <span className="text-[11px] font-semibold text-stone-800 group-hover:text-emerald-900 truncate">
                          {prompt.label}
                        </span>
                      </div>
                      <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 group-hover:bg-emerald-100 px-1.5 py-0.5 rounded-full shrink-0 flex items-center gap-1">
                        <span>Chat</span>
                        <Send className="w-2 h-2" />
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Custom Message Input Footer */}
          <form
            onSubmit={handleSendMessage}
            className="p-2 sm:p-2.5 bg-white border-t border-stone-200 flex items-center gap-1.5"
          >
            <input
              ref={inputRef}
              type="text"
              value={customMessage}
              onFocus={handleUserInteraction}
              onChange={(e) => {
                handleUserInteraction();
                setCustomMessage(e.target.value);
              }}
              placeholder="Ask anything or destination..."
              className="flex-1 text-[11px] sm:text-xs px-3 py-2 rounded-xl bg-stone-100 border border-stone-200 focus:outline-none focus:ring-1.5 focus:ring-emerald-500 focus:bg-white text-stone-800 transition-all placeholder:text-stone-400"
            />
            <button
              type="submit"
              className="w-8 h-8 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20ba59] hover:to-[#0e7467] text-white flex items-center justify-center transition-all shadow-md hover:scale-105 active:scale-95 shrink-0 cursor-pointer"
              title="Send to WhatsApp"
              aria-label="Send message to WhatsApp"
            >
              <Send className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </form>
        </div>
      )}

      {/* The Floating Round WhatsApp Trigger Button */}
      <button
        onClick={() => {
          handleUserInteraction();
          setIsOpen(!isOpen);
          if (!isOpen) {
            trackWhatsAppClick('interactive_widget_opened');
          }
        }}
        className={`w-13 h-13 sm:w-15 sm:h-15 rounded-full text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 group relative cursor-pointer ${
          isOpen
            ? 'bg-stone-800 hover:bg-stone-900 rotate-90'
            : 'bg-gradient-to-tr from-[#1E7A2E] via-[#25D366] to-[#128C7E] hover:from-[#166527] hover:to-[#0F5E1F]'
        }`}
        aria-label={isOpen ? 'Close WhatsApp Widget' : 'Open Smugsafaris WhatsApp Chat Widget'}
        title={isOpen ? 'Close' : 'Chat with Smugsafaris on WhatsApp'}
      >
        {isOpen ? (
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-white" />
            {/* Online Pulse Indicator */}
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#FDB913] border-2 border-white animate-ping" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#FDB913] border-2 border-white flex items-center justify-center text-[7px] font-black text-stone-900">
              1
            </span>
          </>
        )}
      </button>
    </div>
  );
};
