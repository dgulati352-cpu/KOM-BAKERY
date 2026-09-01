/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFEFA',
          100: '#FDFBF7',
          200: '#FAF6ED',
          300: '#F4ECE0',
          400: '#EADCCE',
          500: '#DEC9B5',
        },
        espresso: {
          950: '#150E0A',
          900: '#1C130E',
          800: '#2A1D17',
          700: '#3D2B22',
          600: '#533D32',
          500: '#705446',
          400: '#947665',
        },
        caramel: {
          50: '#FDF7F0',
          100: '#FBEDDE',
          200: '#F5D7BA',
          300: '#EDB98E',
          400: '#E09F67',
          500: '#C87D55',
          600: '#AE5E36',
          700: '#8C4425',
        },
        terracotta: {
          DEFAULT: '#C87D55',
          dark: '#9E4E2C',
          light: '#DE9674',
        },
        sage: {
          50: '#F4F7F4',
          100: '#E5EDE5',
          200: '#CDDBCD',
          300: '#ABC2AB',
          400: '#8DA78D',
          500: '#6F8C6F',
        },
        honey: {
          DEFAULT: '#DDA15E',
          light: '#F2D398',
          dark: '#BC6C25',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'warm-sm': '0 2px 8px -2px rgba(42, 29, 23, 0.06)',
        'warm-md': '0 8px 24px -4px rgba(42, 29, 23, 0.08), 0 2px 6px -1px rgba(42, 29, 23, 0.04)',
        'warm-lg': '0 16px 36px -6px rgba(42, 29, 23, 0.12), 0 6px 16px -2px rgba(42, 29, 23, 0.06)',
        'warm-xl': '0 24px 48px -12px rgba(42, 29, 23, 0.16)',
        'inner-warm': 'inset 0 2px 4px 0 rgba(42, 29, 23, 0.04)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'fade-up': 'fadeUp 0.5s ease-out forwards',
        'pulse-subtle': 'pulseSubtle 2.5s infinite',
        'float': 'float 3.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.03)', opacity: '0.92' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
