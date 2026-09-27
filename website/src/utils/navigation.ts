const navBarLinks = [
  { name: 'Home', url: '/' },
  { name: 'Services', url: '/services' },
  { name: 'Portfolio', url: '/portfolio' },
  { name: 'About', url: '/about' },
  { name: 'Contact', url: '/contact' },
];

const footerLinks = [
  {
    section: 'Services',
    links: [
      { name: 'Graphic Design', url: '/services' },
      { name: 'Web Development', url: '/services' },
      { name: 'App Development', url: '/services' },
      { name: 'View Cart', url: '/cart' },
    ],
  },
  {
    section: 'Company',
    links: [
      { name: 'About Re-EL', url: '/about' },
      { name: 'Portfolio', url: '/portfolio' },
      { name: 'Contact', url: '/contact' },
      { name: 'WhatsApp', url: 'https://wa.me/27813864024' },
    ],
  },
];

const socialLinks = {
  facebook: 'https://www.facebook.com/',
  x: 'https://twitter.com/',
  github: 'https://github.com/Re-EL123/Go-Home',
  google: 'https://wa.me/27813864024',
  slack: 'https://wa.me/27813864024',
};

export default {
  navBarLinks,
  footerLinks,
  socialLinks,
};
