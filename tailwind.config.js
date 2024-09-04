import { Colors } from './inertia/colors'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './resources/**/*.edge',
    './resources/**/*.{js,ts,jsx,tsx,vue}',
    './inertia/**/*.{js,ts,jsx,tsx,vue}',
  ],
  theme: {
    spacing: {
      0: '0px',
      1: '4px',
      2: '6px',
      3: '8px',
      4: '12px',
      5: '16px',
      6: '23px',
      7: '32px',
    },
    colors: {
      ...Colors,
    },

    extend: {
      borderRadius: {
        1: '6px',
        2: '8px',
        3: '12px',
        4: '16px',
      },

      fontFamily: {
        nunito: ['nunito', 'sans-serif'],
        ['RecoletaAlt-Bold']: ['RecoletaAlt-Bold'],
        ['RecoletaAlt-SemiBold']: ['RecoletaAlt-SemiBold'],
        ['Recoleta-Bold']: ['Recoleta-Bold'],
        ['Recoleta-SemiBold']: ['Recoleta-SemiBold'],
        ['HelveticaNowDisplay-Bold']: ['Inter-Bold, HelveticaNowDisplay-Bold'],
        ['HelveticaNowDisplay-Medium']: ['Inter-Medium, HelveticaNowDisplay-Medium'],
        ['HelveticaNowDisplay-Regular']: ['Inter-Regular', 'HelveticaNowDisplay-Regular'],
        ['Inter-Bold']: ['Inter-Bold'],
        ['Inter-Medium']: ['Inter-Medium'],
        ['Inter-Regular']: ['Inter-Regular'],
        // heading: undefined,
        // body: undefined,
        // mono: undefined,
      },
      fontSize: {
        '2xs': '10px',
        'h1': '38px',
        'h2': '26px',
        'h3': '20px',
        'h4': '19px',
        'h5': '16px',
        'p': ['14px', '18px'],
        's1': '13px',
        's2': '12px',
        's3': '9px',
      },
      width: {
        a4: '210mm',
      },
      height: {
        a4: '297mm',
      },
    },
    plugins: [],
  },
  plugins: [],
}
