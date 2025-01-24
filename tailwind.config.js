/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',   // Make sure Tailwind looks in src/app
    './src/components/**/*.{js,ts,jsx,tsx}', // And in the components folder
  ],
  theme: {
    extend: {
      animation: {
        'fadeInUp': 'fadeInUp 1s ease-out',
        'glow': 'glow 1.5s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 10px rgba(255, 0, 0, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(255, 0, 0, 0.8)' },
          '100%': { boxShadow: '0 0 10px rgba(255, 0, 0, 0.5)' },
        },
      },
      colors: {
        text1: '#222222',  // Primary text color (dark gray)
        text2: '#333333',  // Secondary text color (lighter gray)
        text3: '#777777',  // Tertiary text color (even lighter gray)
        text4: '#999999',  // Quaternary text color (light gray)
        error: '#F44336',  // Error color (red)
        warning: '#FF9800', // Warning color (orange)
      },
    },
  },
  plugins: [],
}
