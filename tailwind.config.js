const colors = require('tailwindcss/colors');

const widthConfigs = {
  0: '0rem',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  11: '2.75rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  28: '7rem',
  32: '8rem',
  36: '9rem',
  40: '10rem', // 标准宽度
  44: '11rem',
  48: '12rem',
  52: '13rem',
  56: '14rem',
  60: '15rem',
  64: '16rem',
  72: '18rem',
  80: '20rem',
  96: '24rem',
  100: '30rem',
  px: '1px',
  '1/2': '50%',
  '1/3': '33.333333%',
  '2/3': '66.666667%',
  '1/4': '25%',
  '2/4': '50%',
  '3/4': '75%',
  '1/5': '20%',
  '2/5': '40%',
  '3/5': '60%',
  '4/5': '80%',
  '1/6': '16.666667%',
  '2/6': '33.333333%',
  '3/6': '50%',
  '4/6': '66.666667%',
  '5/6': '83.333333%',
  '1/12': '8.333333%',
  '2/12': '16.666667%',
  '3/12': '25%',
  '4/12': '33.333333%',
  '5/12': '41.666667%',
  '6/12': '50%',
  '7/12': '58.333333%',
  '8/12': '66.666667%',
  '9/12': '75%',
  '10/12': '83.333333%',
  '11/12': '91.666667%',
  full: '100%',
  screen: '100vw',
  // min: 'min-content',
  // max: 'max-content',
};

module.exports = {
  theme: {
    spacing: widthConfigs,
    // width: widthConfigs,
    // maxWidth: widthConfigs,
    // minWidth: widthConfigs,
    fontSize: {
      '3xs': ['0.9rem', '0.9rem'],
      '2xs': ['1rem', '1rem'],
      xs: ['1.1rem', '1.1rem'], // 标准字号
      sm: ['1.2rem', '1.2rem'],
      tiny: ['1.4rem', '1.4rem'],
      base: ['1.6rem', '1.6rem'],
      lg: ['1.8rem', '1.8rem'],
      xl: ['2.2rem', '2.2rem'],
      '2xl': ['2.7rem', '2.7rem'],
      '3xl': ['3.6rem', '3.6rem'],
      '4xl': ['4.8rem', '4.8rem'],
      '5xl': ['6.0rem', '6.0rem'],
      '6xl': ['7.2rem', '7.2rem'],
      '7xl': ['9.0rem', '9.0rem'],
    },
    colors: {
      cgray: {
        light: colors.trueGray[400],
        DEFAULT: colors.trueGray[400],
        dark: colors.trueGray[600],
        50: colors.trueGray[50],
        100: colors.trueGray[100],
        200: colors.trueGray[200],
        300: colors.trueGray[300],
        400: colors.trueGray[400],
        500: colors.trueGray[500],
        600: colors.trueGray[600],
        700: colors.trueGray[700],
        800: colors.trueGray[800],
        900: colors.trueGray[900],
      },
      error: {
        light: colors.red[400],
        DEFAULT: colors.red[400],
        dark: colors.red[600],
      },
      alert: {
        light: colors.blue[700],
        DEFAULT: colors.blue[700],
        dark: colors.blue[300],
      },
      active: {
        light: colors.blue[400],
        DEFAULT: colors.blue[400],
        dark: colors.blue[400],
      },
      blue: {
        DEFAULT: colors.blue[400],
      },
    },
    transitionDuration: { 100: '0ms', 200: '0ms' },
  },
  // Extend Tailwind theme
  variants: {
    extend: {
      backgroundColor: ['active'],
      textColor: ['hover'],
    },
  },
  colors: {
    primary: colors.trueGray[500],
    secondary: '#009688',
    error: colors.red[600],
    success: '#4caf50',
    alert: colors.blue[300],
    blue: '#2196f3',
    dark: '#212121',
  },
  darkMode: true,
};
