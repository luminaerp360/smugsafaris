import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackGTMPageView } from '../utils/gtm';

export function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    // If there's an anchor hash on the same page, scroll to it, otherwise scroll to top
    if (hash) {
      const el = document.getElementById(hash.replace('#', ''));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' as ScrollBehavior,
    });

    // Send virtual pageview to Google Tag Manager dataLayer
    trackGTMPageView(pathname + (search || ''), document.title);
  }, [pathname, search, hash]);

  return null;
}
