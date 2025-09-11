// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // La police par défaut sera Geist Sans
        sans: ["Geist Sans", "sans-serif"],
      },
      colors: {
        'brand-beige': '#A87C53',
        'brand-blue': '#0066cc',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scroll': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-80%)' },
        },
        'scroll-reverse': {
          '0%': { transform: 'translateX(-80%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
        'scroll': 'scroll 980s linear infinite',
        'scroll-reverse': 'scroll-reverse 980s linear infinite',
      },
    },
  },
  plugins: [],
};