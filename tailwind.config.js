module.exports = {
  prefix: 'tw-',
  important: false,
  content: ['src/components/**/*.{ts,tsx}', 'src/pages/**/*.{ts,tsx}', 'src/styles/**/*.{css}'],
  theme: {
    extend: {
      animation: {
        'splash-logo-background-open': 'splash-logo-background-open 500ms ease-in-out forwards',
        'splash-logo-background-close': 'splash-logo-background-close 500ms ease-in-out forwards',
        'splash-logo-foreground-open': 'splash-logo-foreground-open 500ms ease-in-out forwards',
        'splash-logo-foreground-close': 'splash-logo-foreground-close 500ms ease-in-out forwards',
        'splash-logo-shine': '500ms splash-logo-shine 500ms ease-in-out',
      },
      keyframes: {
        'splash-logo-background-open': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'splash-logo-background-close': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'splash-logo-foreground-open': {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'splash-logo-foreground-close': {
          '0%': { opacity: '1', transform: 'translateX(0)' },
          '100%': { opacity: '0', transform: 'translateX(-100%)' },
        },
        'splash-logo-shine': {
          '0%': {
            opacity: '0',
            transform: 'rotate(0)',
          },
          '50%': {
            opacity: '0.5',
          },
          '100%': {
            opacity: '0',
            transform: 'rotate(-360deg)',
          },
        },
      },
    },
  },
};
