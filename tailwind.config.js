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
      center: true,
      padding: '1rem'
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    },
    extend: {
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
        }
      },
      fontSize: {
        '7xl': '5rem',
        '10xl': '10rem'
      },
      fontFamily: {
        lato: ['Lato', 'sans-serif']
      },
      minHeight: {
        750: '750px'
      }
    }
  },
  variants: {},
  plugins: [],
  purge: {
    // enable remove unused CSS only in production
    enabled: process.env.NODE_ENV === 'production',
    // any file that may contain the reference of CSS styles by class name.
    content: ['components/**/*.vue', 'layouts/**/*.vue', 'pages/**/*.vue', 'plugins/**/*.js', 'nuxt.config.js']
  }
};
