module.exports = {
  prefix: 'tw-',
  important: false,
  content: ['src/components/**/*.{ts,tsx}', 'src/pages/**/*.{ts,tsx}', 'src/styles/**/*.{css}'],
  theme: {
    extend: {
      animation: {
        'splash-logo-background': 'splash-logo-background 500ms ease-in-out',
        'splash-logo-foreground-open': 'splash-logo-foreground-open 500ms ease-in-out',
        'splash-logo-shine': '500ms splash-logo-shine 500ms ease-in-out',
      },
      keyframes: {
        'splash-logo-background': {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        'splash-logo-foreground-open': {
          '0%': {
            opacity: '0',
            transform: 'translate(100%, -50%)',
          },
          '100%': {
            opacity: '1',
            transform: 'translate(0, -50%)',
          },
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
