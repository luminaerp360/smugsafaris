import { useEffect } from 'react';

export const SITE_URL = 'https://www.smugsafaris.co.ke';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/fleet/cruiser-amboseli-kilimanjaro.jpg`;
export const SITE_NAME = 'Smugsafaris Tours & Travel';

export interface SeoProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalPath?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
  noIndex?: boolean;
}

function updateMetaTag(attributeName: string, attributeValue: string, content: string) {
  let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function updateLinkTag(rel: string, href: string) {
  let element = document.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

export const SeoHead: React.FC<SeoProps> = ({
  title,
  description = 'Premier African safari tours, wildlife travel, and custom adventures across Kenya and East Africa. Book your dream safari with certified local guides and 4x4 Land Cruisers.',
  keywords = 'Kenya safari tours, African wildlife safaris, Maasai Mara Great Migration, Amboseli Kilimanjaro, Serengeti safaris, 4x4 Land Cruiser Kenya, luxury tented camps, Eldoret safari agency',
  canonicalPath = '',
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  schema,
  noIndex = false,
}) => {
  useEffect(() => {
    // 1. Title
    const fullTitle = title
      ? title.includes('Smugsafaris')
        ? title
        : `${title} | Smugsafaris Kenya`
      : 'Smugsafaris Tours & Travel | Explore • Discover • Experience';
    document.title = fullTitle;

    // 2. Canonical URL
    const fullCanonical = `${SITE_URL}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`;
    updateLinkTag('canonical', fullCanonical);

    // 3. Meta descriptions & keywords
    updateMetaTag('name', 'description', description);
    updateMetaTag('name', 'keywords', keywords);
    updateMetaTag(
      'name',
      'robots',
      noIndex
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );

    // 4. OpenGraph
    updateMetaTag('property', 'og:site_name', SITE_NAME);
    updateMetaTag('property', 'og:title', fullTitle);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:url', fullCanonical);
    updateMetaTag('property', 'og:type', ogType);
    updateMetaTag(
      'property',
      'og:image',
      ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage.startsWith('/') ? ogImage : `/${ogImage}`}`
    );

    // 5. Twitter Card
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', fullTitle);
    updateMetaTag('name', 'twitter:description', description);
    updateMetaTag(
      'name',
      'twitter:image',
      ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage.startsWith('/') ? ogImage : `/${ogImage}`}`
    );

    // 6. JSON-LD structured data script
    const scriptId = 'page-seo-schema-jsonld';
    let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (schema) {
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.id = scriptId;
        scriptEl.type = 'application/ld+json';
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(schema, null, 2);
    } else if (scriptEl) {
      scriptEl.remove();
    }

    return () => {
      // Optional cleanup on unmount
    };
  }, [title, description, keywords, canonicalPath, ogImage, ogType, schema, noIndex]);

  return null;
};
