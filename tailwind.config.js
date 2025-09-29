/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        surface: '#1a1a1a',
        primary: '#A42A28', // Maroon
        'primary-light': '#C75D5B',
        accent: '#EAE0D5', // Soft Skin
        'text-primary': '#EAE0D5',
        'text-secondary': '#a1a1aa',
        success: '#16a34a',
        danger: '#dc2626',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
      },
      boxShadow: {
        'glow': '0 0 15px rgba(164, 42, 40, 0.5)',
        'glow-strong': '0 0 25px rgba(164, 42, 40, 0.7)',
      },
    },
  },
  plugins: [],
};
