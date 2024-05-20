module.exports = {
  prefix: 'tw-',
  important: false,
  content: ['src/components/**/*.{ts,tsx}', 'src/pages/**/*.{ts,tsx}', 'src/styles/**/*.{css}'],
  theme: {
    fontFamily: {
      sans: ['Saira', 'Helvetica', 'Arial', 'sans-serif'],
    },
    extend: {
      zIndex: {
        'dropdown-backdrop': 900,
        'dropdown-opened': 1000,
      },
      spacing: {
        '30dvh': '30dvh',
        '40dvh': '40dvh',
        '50dvh': '50dvh',
        '60dvh': '60dvh',
        '70dvh': '70dvh',
      },
      colors: {
        primary: '#D0B88A',
        action: '#926F44',
        input: '#1D1D1D',
        'input-divider': '#7B7272',
        'input-focus': '#928F8CA1',
        'button-disabled': '#595959',
        'list-item-active': '#D7D7D7',
      },
      backgroundImage: {
        panel:
          'linear-gradient(179.27deg, rgba(45, 44, 44, 0.77) 6.59%, rgba(83, 82, 82, 0.77) 38.7%, rgba(40, 40, 40, 0.77) 77.63%)',
      },
      animation: {
        'splash-logo-background-open': 'splash-logo-background-open 500ms ease-in-out forwards',
        'splash-logo-background-close': 'splash-logo-background-close 500ms ease-in-out forwards',
        'splash-logo-foreground-open': 'splash-logo-foreground-open 500ms ease-in-out forwards',
        'splash-logo-foreground-close': 'splash-logo-foreground-close 500ms ease-in-out forwards',
        'splash-logo-shine-open': '500ms splash-logo-shine-open 500ms ease-in-out forwards',
        'splash-logo-shine-close': 'splash-logo-shine-close 500ms ease-in-out forwards',
        'core-step-open': 'core-step-open 500ms ease-in-out forwards',
        'core-step-close': 'core-step-close 500ms ease-in-out forwards',
        'core-step-image-open': 'core-step-image-open 500ms ease-in-out forwards',
        'core-step-image-close': 'core-step-image-close 500ms ease-in-out forwards',
        'backdrop-open': 'backdrop-open 150ms ease-in-out forwards',
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
        'splash-logo-shine-close': {
          '0%': { opacity: '0' },
          '100%': { opacity: '0' },
        },
        'core-step-open': {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'core-step-close': {
          '0%': { opacity: '1', transform: 'translateX(0)' },
          '100%': { opacity: '0', transform: 'translateX(-100%)' },
        },
        'core-step-image-open': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'core-step-image-close': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'backdrop-open': {
          '0%': { opacity: '0' },
          '100%': { opacity: '0.5' },
        },
      },
    },
  },
};
