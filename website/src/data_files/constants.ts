import ogImageSrc from '@images/social.png';

export const SITE = {
  title: 'Re-EL',
  tagline: 'Digital Branding Agency · Johannesburg',
  description:
    'Re-EL is a South African digital branding agency specializing in web development, app development, graphic design, and brand strategy. Build a brand that lights up your market.',
  description_short:
    'Websites, apps and brand identities engineered to win attention and grow revenue — designed in South Africa.',
  url: 'https://re-el-branding.rf.gd',
  author: 'Re-EL Branding',
  phone: '+27 81 386 4024',
  whatsapp: 'https://wa.me/27813864024',
  email: 'hello@re-el.co.za',
};

export const SEO = {
  title: `${SITE.title} | Digital Branding Agency in South Africa`,
  description: SITE.description,
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.title,
    url: SITE.url,
    logo: `${SITE.url}/website/assets/images/logo-no-bg.png`,
    description: SITE.description,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+27-81-386-4024',
      contactType: 'customer service',
      areaServed: 'ZA',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Johannesburg',
      addressCountry: 'South Africa',
    },
  },
};

export const OG = {
  locale: 'en_ZA',
  type: 'website',
  url: SITE.url,
  title: `${SITE.title}: Web, App & Brand Design`,
  description: SITE.description,
  image: ogImageSrc,
};

export const partnersData = [
  {
    icon: `<span class="mx-auto block py-3 text-center text-lg font-bold tracking-wide text-neutral-500 dark:text-neutral-400">Vertex Consulting</span>`,
    name: 'Vertex Consulting',
    href: '#',
  },
  {
    icon: `<span class="mx-auto block py-3 text-center text-lg font-bold tracking-wide text-neutral-500 dark:text-neutral-400">Mambo Outfitters</span>`,
    name: 'Mambo Outfitters',
    href: '#',
  },
  {
    icon: `<span class="mx-auto block py-3 text-center text-lg font-bold tracking-wide text-neutral-500 dark:text-neutral-400">Naledi Wellness</span>`,
    name: 'Naledi Wellness',
    href: '#',
  },
  {
    icon: `<span class="mx-auto block py-3 text-center text-lg font-bold tracking-wide text-neutral-500 dark:text-neutral-400">Blue Horizon</span>`,
    name: 'Blue Horizon',
    href: '#',
  },
];
