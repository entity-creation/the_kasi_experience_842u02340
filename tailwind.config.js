/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // These map to CSS custom properties set by ThemeProvider
        'kasi-bg':      'var(--color-background)',
        'kasi-surface': 'var(--color-surface)',
        'kasi-primary': 'var(--color-primary)',
        'kasi-secondary':'var(--color-secondary)',
        'kasi-accent':  'var(--color-accent)',
        'kasi-text':    'var(--color-text)',
        'kasi-textLight':'var(--color-textLight)',
        'kasi-shadow':  'var(--color-shadow)',
      },
      fontFamily: {
        heading: 'var(--font-heading)',
        body:    'var(--font-body)',
        letter:  'var(--font-letter)',
      },
      transitionDuration: {
        'theme': 'var(--transition-duration)',
      },
      animation: {
        'fade-in':    'fadeIn 1.2s ease-in-out forwards',
        'bloom-in':   'bloomIn 1.5s ease-in-out forwards',
        'slide-up':   'slideUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards',
        'ink-spread': 'inkSpread 2s ease-in-out forwards',
        'float':      'float 3s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'spin-slow':  'spin 8s linear infinite',
        'bounce-in':  'bounceIn 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'wax-seal':   'waxSeal 0.8s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'ken-burns':  'kenBurns 10s ease-in-out infinite alternate',
        'confetti-fall':'confettiFall 3s ease-in forwards',
        'gold-dust':  'goldDust 4s ease-out forwards',
      },
      keyframes: {
        fadeIn:    { from: { opacity: '0' },              to: { opacity: '1' } },
        bloomIn:   { from: { opacity: '0', filter: 'blur(20px)', transform: 'scale(1.1)' }, to: { opacity: '1', filter: 'blur(0)', transform: 'scale(1)' } },
        slideUp:   { from: { opacity: '0', transform: 'translateY(40px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        inkSpread: { from: { opacity: '0', letterSpacing: '0.5em' }, to: { opacity: '1', letterSpacing: 'normal' } },
        float:     { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        pulseSoft: { '0%,100%': { transform: 'scale(1)' }, '50%': { transform: 'scale(1.06)' } },
        bounceIn:  { from: { opacity: '0', transform: 'scale(0.3)' }, to: { opacity: '1', transform: 'scale(1)' } },
        waxSeal:   { from: { opacity: '0', transform: 'scale(0) rotate(-30deg)' }, to: { opacity: '1', transform: 'scale(1) rotate(0deg)' } },
        kenBurns:  { from: { transform: 'scale(1) translate(0,0)' }, to: { transform: 'scale(1.15) translate(-2%,-2%)' } },
        confettiFall: { from: { opacity: '1', transform: 'translateY(-20px) rotate(0deg)' }, to: { opacity: '0', transform: 'translateY(100vh) rotate(720deg)' } },
        goldDust:  { from: { opacity: '1', transform: 'translateY(0) scale(1)' }, to: { opacity: '0', transform: 'translateY(-80px) scale(0.5)' } },
      },
    },
  },
  plugins: [],
};
