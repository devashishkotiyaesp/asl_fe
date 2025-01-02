/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '16px',
      screens: {
        sm: '600px',
        md: '740px',
        lg: '992px',
        xl: '1142px',
        '2xl': '1142px',
      },
    },
    extend: {
      containers: {
        480: '480px',
        600: '600px',
        870: '870px',
        1024: '1024px',
        1280: '1280px',
        1366: '1366px',
        1440: '1440px',
        1548: '1548px',
        1600: '1600px',
        1920: '1920px',
      },
      colors: {
        LightWood: '#E0D9D3',
        LightGray: '#F2F2F2',
        OffWhite: '#F7F8FA',
        PrimaryWood: '#908880',
        PrimaryGreen: '#10A932',
        PrimaryRed: '#E45555',
        PrimaryBlue: '#2196F3 ',
        PrimaryYellow: '#E1B147',
        PrimaryYellowLight: '#EBC65B',
        PrimaryOrange: '#FFA500',
        primary: 'black',
        offWhite3: '#fff2f2',
        DarkGray: '#4D4D4D',
      },
      fontFamily: {
        matter: ['Matter'],
      },
      boxShadow: {
        PrimaryRing: '0 0 0 2px rgb(255 255 255 ), 0 0 0 3px rgb(144 136 128 )',
        searchBoxFilter: ' 0px 4px 84px 0px #00000029',
      },
      backgroundImage: {
        checkmark: 'url(assets/checkmark.svg)',
        rightArrow: 'url(assets/breadcrumbArrow.svg)',
        lazyGradient:
          'linear-gradient(103deg, #ececec 8%, #f5f5f5 18%, #ececec 33%)',
      },
      spacing: {
        unset: 'unset',
        '100dvh': '100dvh',
        '18px': '18px',
        '27px': '27px',
        '30px': '30px',
        '34px': '34px',
        '42px': '42px',
        '70px': '70px',
        13: '52px',
      },
      fontSize: {
        '36px': '36px',
      },
      lineHeight: {
        12: '1.2',
      },
      borderRadius: {
        '5px': '5px',
        '10px': '10px',
      },
      zIndex: {
        1: 9,
        2: 99,
        3: 999,
        4: 9999,
        5: 99999,
      },
      screens: {
        '3xl': '2100px',
        1900: '1900px',
        1800: '1800px',
        1600: '1600px',
        1400: '1400px',
        1300: '1300px',
        1200: '1200px',
        1024: '1024px',
      },
      keyframes: {
        lazy: {
          '0%': { backgroundPosition: '0' },
          '100%': { backgroundPosition: '-200%' },
        },
        ripple: {
          '0%': { opacity: '0.50' },
          '100%': { opacity: '0', transform: 'scale(3)' },
        },
      },
      animation: {
        lazy: 'lazy 1.7s linear infinite',
        ripple: 'ripple 2s ease-out infinite',
      },
      backgroundSize: {
        200: '200%',
      },
    },
  },
  plugins: [
    // eslint-disable-next-line global-require
    require('@tailwindcss/container-queries'),
    plugin(({ addUtilities }) => {
      addUtilities({
        '.overflow-unset': {
          overflow: ' unset',
        },
        '.word-break': {
          wordWrap: ' break-word',
        },
        '.wordBreak': {
          wordBreak: 'break-all',
        },
        '.wordBreak-word': {
          wordBreak: 'break-word',
        },
      });
    }),
  ],
};
