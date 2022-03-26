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
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '2.5rem',
      '3xl': '3rem',
      '4xl': '4rem',
      '6xl': '6rem',
      '8xl': '8rem',
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
}
