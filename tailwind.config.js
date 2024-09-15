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
        'spinner-background': 10000,
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
        'control-disabled': '#595959',
        'list-item-active': '#D7D7D70D',
      },
      backgroundImage: {
        background: 'radial-gradient(35.76% 51.3% at 50% -1.3%, #292929 0.08%, #1d1d1d 100%)',
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
        'spinner-open': '500ms spinner-open 300ms ease-in-out both',
        'spinner-close': 'spinner-close 300ms ease-in-out forwards',
        'backdrop-open': 'backdrop-open 150ms ease-in-out forwards',
        'spinner-dropdown': 'spinner-dropdown 500ms linear infinite',
        'spinner-large': 'spinner-large 3s linear infinite',
        'layout-header-open': 'layout-header-open 300ms ease-in-out forwards',
        'layout-header-close': 'layout-header-close 300ms ease-in-out forwards',
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
        'spinner-open': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'spinner-close': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'backdrop-open': {
          '0%': { opacity: '0' },
          '100%': { opacity: '0.5' },
        },
        'spinner-dropdown': {
          '0%': { transform: 'rotate(0)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'spinner-large': {
          '0%': { transform: 'rotate(0)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
        'layout-header-open': {
          '0%': { opacity: '0', transform: 'translateY(-100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'layout-header-close': {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-100%)' },
        },
      },
    },
  },
};
