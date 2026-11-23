/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          50: '#FDF7F8',
          100: '#FBE8EC',
          200: '#F6CED7',
          300: '#EEA2B2',
          400: '#E4748D',
          500: '#D54D6C',
        },
        ivory: '#FAF6F0',
        cream: '#FCFBF7',
        lavender: '#E8E0F0',
        cherry: {
          500: '#C92A42',
          600: '#A81E33',
          700: '#871626',
        },
        beige: '#F5EBE1',
        charcoal: '#1A1A1A',
        mutedGrey: '#737373',
        offWhite: '#F9F9F8',
        borderSoft: '#E8E3DD',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        editorial: '0.15em',
        luxury: '0.25em',
      },
      boxShadow: {
        'soft-luxury': '0 10px 30px -10px rgba(0, 0, 0, 0.05)',
        'card-elevated': '0 20px 40px -15px rgba(213, 77, 108, 0.07)',
        'modal-luxury': '0 25px 60px -15px rgba(26, 26, 26, 0.15)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
