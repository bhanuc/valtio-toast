/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
      extend: {
        minWidth: {
          toast: '320px',
        },
        keyframes: {
          'toast-enter': {
            '0%': { transform: 'translateX(100%)', opacity: '0' },
            '100%': { transform: 'translateX(0)', opacity: '1' }
          },
          'toast-exit': {
            '0%': { transform: 'translateX(0)', opacity: '1' },
            '100%': { transform: 'translateX(100%)', opacity: '0' }
          }
        },
        animation: {
          'toast-enter': 'toast-enter 0.3s ease-out',
          'toast-exit': 'toast-exit 0.3s ease-in'
        },
        zIndex: {
          '100': '100',
        }
      }
    },
    plugins: [],
    corePlugins: {
      preflight: false,
    },
  };
  