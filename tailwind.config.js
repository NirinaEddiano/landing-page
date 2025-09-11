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
        sans: ["Geist Sans", "sans-serif"],
        mada: ['var(--font-mada)', 'sans-serif'],
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
        'scroll-vertical-reverse':{
          '0%': { transform: 'translateY(-20%)' },
          '100%': { transform: 'translateY(0%)' },
        },
        'scroll-vertical': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
        'scroll': 'scroll 980s linear infinite',
        'scroll-reverse': 'scroll-reverse 980s linear infinite',
        'scroll-vertical': 'scroll-vertical 980s linear infinite',
        'scroll-vertical-reverse': 'scroll-vertical 980s linear infinite',
      },
    },
  },
  plugins: [],
};
