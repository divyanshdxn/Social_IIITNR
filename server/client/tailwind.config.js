module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2E89A6',
        primary_variant: '#B8D9E3',
        background: '#FFFFFF',
        background_variant: '#F5F5F5',
        text: {
          primary: '#000000',
          secondary: '#4C4C4C',
        },
        hints: '#B5B5B5',
        d: {
          primary: '#54BBDB',
          primary_variant: '#1C4A58',
          background: '#0B0B0B',
          background_variant: '#111111',
          text: {
            primary: '#E5E5E5',
            secondary: '#D1D1D1',
          },
          hints: '#414141',
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
