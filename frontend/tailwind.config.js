/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ayurveda: {
          ocean: '#3B82F6',
          herbal: '#2F6B3A',
          maroon: '#8B4513',
          neem: '#4A7C59',
          sky: '#E0F2FE',
          sapphire: '#1E40AF',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'ayurveda-gradient': 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 50%, #059669 100%)',
        'hero-gradient': 'linear-gradient(to right, #60a5fa, #3b82f6, #1d4ed8, #059669)',
        'card-gradient': 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'gradient': 'gradient 8s ease infinite',
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

