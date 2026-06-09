/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          teal:    '#1A5F7A',
          teal2:   '#14495E',
          teal3:   '#0D3345',
          amber:   '#F4A300',
          amber2:  '#D98E00',
          surface: '#E8F4F8',
          green:   '#2D7A3A',
          ink:     '#1A1A2E',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body:    ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-mesh': `
          radial-gradient(ellipse 80% 60% at 20% 40%, rgba(26,95,122,0.18) 0%, transparent 60%),
          radial-gradient(ellipse 60% 80% at 80% 20%, rgba(244,163,0,0.10) 0%, transparent 55%),
          radial-gradient(ellipse 50% 50% at 60% 80%, rgba(26,95,122,0.10) 0%, transparent 50%)
        `,
      },
      animation: {
        'fade-up':    'fadeUp 0.6s ease forwards',
        'fade-in':    'fadeIn 0.5s ease forwards',
        'float':      'float 6s ease-in-out infinite',
        'shimmer':    'shimmer 2.5s linear infinite',
        'count-up':   'countUp 0.4s ease forwards',
        'slide-right':'slideRight 0.5s ease forwards',
      },
      keyframes: {
        fadeUp:    { '0%': { opacity: 0, transform: 'translateY(24px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        fadeIn:    { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        float:     { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-10px)' } },
        shimmer:   { '0%': { backgroundPosition: '-200% center' }, '100%': { backgroundPosition: '200% center' } },
        slideRight:{ '0%': { opacity: 0, transform: 'translateX(-20px)' }, '100%': { opacity: 1, transform: 'translateX(0)' } },
      },
    },
  },
  plugins: [],
}
