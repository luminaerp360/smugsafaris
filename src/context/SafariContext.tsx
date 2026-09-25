import React, { createContext, useContext, useState, useMemo } from 'react';
import { TOURS_DATA, TourPackage } from '../data/safariData';

export type Currency = 'USD' | 'EUR' | 'GBP' | 'KES';

interface CurrencyRate {
  rate: number;
  symbol: string;
  prefix: boolean;
}

const CURRENCY_RATES: Record<Currency, CurrencyRate> = {
  USD: { rate: 1, symbol: '$', prefix: true },
  EUR: { rate: 0.92, symbol: '€', prefix: true },
  GBP: { rate: 0.78, symbol: '£', prefix: true },
  KES: { rate: 130, symbol: 'KSh ', prefix: true },
};

interface SafariContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (usdPrice: number) => string;
  selectedTour: TourPackage | null;
  selectedTourId: string | null;
  openTourDetail: (tourId: string) => void;
  closeTourDetail: () => void;
  isInquiryOpen: boolean;
  inquiryTourId: string | null;
  openInquiry: (tourId?: string) => void;
  closeInquiry: () => void;
  scrollToSection: (id: string) => void;
}

const SafariContext = createContext<SafariContextType | undefined>(undefined);

export const SafariProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('USD');
  const [selectedTourId, setSelectedTourId] = useState<string | null>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState<boolean>(false);
  const [inquiryTourId, setInquiryTourId] = useState<string | null>(null);

  const formatPrice = (usdPrice: number): string => {
    const config = CURRENCY_RATES[currency];
    const converted = Math.round(usdPrice * config.rate);
    return `${config.symbol}${converted.toLocaleString()}`;
  };

  const selectedTour = useMemo(() => {
    if (!selectedTourId) return null;
    return TOURS_DATA.find((t) => t.id === selectedTourId) || null;
  }, [selectedTourId]);

  const openTourDetail = (tourId: string) => {
    setSelectedTourId(tourId);
    window.history.pushState(null, '', `#tour-${tourId}`);
  };

  const closeTourDetail = () => {
    setSelectedTourId(null);
    if (window.location.hash.startsWith('#tour-')) {
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  const openInquiry = (tourId?: string) => {
    if (tourId) {
      setInquiryTourId(tourId);
    }
    setIsInquiryOpen(true);
  };

  const closeInquiry = () => {
    setIsInquiryOpen(false);
    setInquiryTourId(null);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <SafariContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice,
        selectedTour,
        selectedTourId,
        openTourDetail,
        closeTourDetail,
        isInquiryOpen,
        inquiryTourId,
        openInquiry,
        closeInquiry,
        scrollToSection,
      }}
    >
      {children}
    </SafariContext.Provider>
  );
};

export const useSafari = () => {
  const ctx = useContext(SafariContext);
  if (!ctx) throw new Error('useSafari must be used within SafariProvider');
  return ctx;
};
