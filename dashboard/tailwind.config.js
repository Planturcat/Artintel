/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#E6FCFF',
          200: '#A5F3FA',
          300: '#7fe4eb', // primary-lighter
          400: '#33d5e3', // primary-light
          500: '#00CBDD', // primary
          600: '#00A3B3',
          700: '#007a85', // primary-dark
          800: '#005260',
          900: '#002A33',
        },
        cosmic: {
          900: '#000508', // secondary (darkest)
          800: '#000a12', // secondary-light
          700: '#001824', // slightly lighter
          600: '#002a33', // even lighter
        },
        success: {
          100: '#ccfaed',
          300: '#66f0cb',
          500: '#00e5aa', // success
          700: '#00a06a',
        },
        warning: {
          100: '#faf5cc',
          300: '#f0e566',
          500: '#e5c700', // warning
          700: '#b27800',
        },
        error: {
          100: '#ffccd3',
          300: '#ff99a6',
          500: '#ff5a65', // error
          700: '#b02a37',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'grid-light': 'linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)',
        'grid-dark': 'linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '20px 20px',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'floating': 'floating 3s ease-in-out infinite',
      },
      keyframes: {
        floating: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}