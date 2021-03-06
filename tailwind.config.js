const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./index.html', './src/**/*.vue'],
  theme: {
    colors: {
      current: 'currentColor',
      transparent: 'transparent',
      white: '#fff',
      light: '#44bbc7',
      dark: '#041723',
    },
    fontSize: {
      sm: '1rem',
      base: '1.125rem',
      // Responsive font sizes
      'rfs-base': 'min(calc(0.825rem + 0.375vw), 1.25rem)',
      'rfs-lg': 'min(calc(1rem + 0.625vw), 1.5rem)',
      'rfs-2xl': 'min(calc(1.8rem + 0.875vw), 2.5rem)',
      'rfs-4xl': 'min(calc(3rem + 1.25vw), 4rem)',
      'rfs-8xl': 'min(calc(6rem + 2.5vw), 8rem)',
      'rfs-18xl': 'min(calc(13.2rem + 6vw), 18rem)',
    },
    fontWeight: {
      bold: 'inherit',
    },
    extend: {
      transitionProperty: {
        'font-variation': 'font-variation-settings',
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('pointer', '@media (pointer: fine)')
    }),
  ],
}
