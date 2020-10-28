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
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
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
          800: '#08330b',
          700: '#0e5513',
          600: '#13761a',
          500: '#199922',
          400: '#60c367',
          300: '#a4dda8',
          200: '#e8f6e9',
          yellow: '#ECF87F',
          lime: '#81B622',
          olive: '#3D550C'
        },
        primary: {
          default: '#ad726f',
          light: '#ad726f5e',
          dark: '#ad726fb3'
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
      width: {
        '1/10': '10%'
      },
      minHeight: {
        100: '25rem'
      },
      maxWidth: {
        '1/5': '20%',
        content: 'max-content'
      },
      transitionDuration: {
        2000: '2000ms'
      },
      opacity: {
        80: '.8'
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
        },
        loading: {
          '0%, 100%': {
            opacity: 1
          },
          '50%': {
            opacity: 0
          }
        }
      },
      animation: {
        showUp: 'show-up 1s 0.2s ease-in-out forwards',
        loading: 'loading 2.5s linear infinite'
      }
    },
    boxShadow: {
      'outline-primary': '0 0 0px 1px #ad726f;'
    }
  },
  variants: {
    padding: ['responsive', 'hover', 'focus'],
    borderWidth: ['responsive', 'hover', 'focus'],
    visibility: ['responsive', 'hover', 'focus', 'group-hover'],
    opacity: ['responsive', 'hover', 'focus', 'group-hover'],
    translate: ['responsive', 'hover', 'focus', 'group-hover'],
    scale: ['responsive', 'hover', 'focus', 'group-hover']
  },
  plugins: [require('tailwindcss-rtl')],
  purge: {
    // enable remove unused CSS only in production
    enabled: process.env.NODE_ENV === 'production',
    // any file that may contain the reference of CSS styles by class name.
    content: ['components/**/*.vue', 'layouts/**/*.vue', 'pages/**/*.vue', 'plugins/**/*.js', 'nuxt.config.js'],
    options: {
      whitelistPatterns: [/^h-\d*$/]
    }
  }
};
