/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */

// update by my needs:
// * container in theme
// * colors, font-size and family inside extend - them are taken for example
// * minHeight - as example. What about width
// * screens

module.exports = {
  theme: {
    container: {
      center: true
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1150px'
    },
    extend: {
      spacing: {
        72: '18rem',
        80: '20rem'
      },
      colors: {
        green: {
          default: '#59981A',
          yellow: '#ECF87F',
          lime: '#81B622',
          olive: '#3D550C'
        },
        developmint: {
          800: '#08330b',
          700: '#0e5513',
          600: '#13761a',
          500: '#199922',
          400: '#60c367',
          300: '#a4dda8',
          200: '#e8f6e9'
        },
        primary: {
          default: '#ad726f',
          light: '#ad726f5e'
        }
      },
      inset: {
        '1/2': '50%'
      },
      // fontSize: {
      //   '7xl': '5rem',
      //   '10xl': '10rem'
      // },
      fontFamily: {
        body: ['Quicksand', 'Raleway', 'sans-serif']
      },
      minHeight: {
        750: '750px'
      },
      keyframes: {
        'show-up': {
          '0%': {
            opacity: 0,
            '-webkit-transform': 'scale(0.5) translateY(16rem)',
            transform: 'scale(0.5) translateY(16rem)'
          },
          '100%': {
            '-webkit-transform': 'scale(1) translateY(0)',
            transform: 'scale(1) translateY(0)',
            opacity: 1
          }
        }
      },
      animation: {
        showUp: 'show-up 1s 0.2s ease-in-out forwards'
      }
    }
  },
  variants: {},
  plugins: [require('tailwindcss-rtl')],
  purge: {
    // enable remove unused CSS only in production
    enabled: process.env.NODE_ENV === 'production',
    // any file that may contain the reference of CSS styles by class name.
    content: ['components/**/*.vue', 'layouts/**/*.vue', 'pages/**/*.vue', 'plugins/**/*.js', 'nuxt.config.js']
  }
};
