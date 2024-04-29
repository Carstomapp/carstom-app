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
        'splash-logo-shine-open': '500ms splash-logo-shine-open 500ms ease-in-out forwards',
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
        'splash-logo-shine-open': {
          '0%': { opacity: '0', transform: 'translateX(0)' },
          '10%': { opacity: '0.1' },
          '50%': { opacity: '0.5' },
          '90%': { opacity: '0.1' },
          '100%': { opacity: '0', transform: 'translateX(-100%)' },
        },
      },
    },
  },
};
