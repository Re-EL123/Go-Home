module.exports = {
  content: ["./pages/*.{html,js}", "./index.html", "./js/*.js"],
  theme: {
    extend: {
      colors: {
        primary: "#1a1a2e", // Deep navy foundation
        secondary: "#2d3748", // Subtle depth
        accent: "#FFD700", // Energetic yellow
        background: "#ffffff", // Clean canvas
        surface: "#f7fafc", // Gentle elevation
        "text-primary": "#2d3748", // Comfortable reading
        "text-secondary": "#718096", // Clear hierarchy
        success: "#38a169", // Positive reinforcement
        warning: "#d69e2e", // Gentle urgency
        error: "#e53e3e", // Helpful concern
        "border-default": "#e2e8f0", // Minimal borders
        "border-accent": "#FFD700", // Featured content
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      boxShadow: {
        subtle: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        elevated: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'reveal': 'reveal 400ms ease-out',
        'hover': 'hover 200ms ease-out',
        'state': 'state 300ms ease-out',
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
        '400': '400ms',
      },
      transitionTimingFunction: {
        'ease-out': 'ease-out',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
}
