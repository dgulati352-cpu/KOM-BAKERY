/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        espresso: {
          DEFAULT: '#2D211D',
          900: '#1C1411',
          800: '#2D211D',
          700: '#3F2F29',
          600: '#543F37',
        },
        chocolate: {
          DEFAULT: '#5A3026',
          dark: '#42221B',
          light: '#733F32',
        },
        caramel: {
          DEFAULT: '#A86A4A',
          dark: '#8C5437',
          light: '#C58360',
        },
        gold: {
          DEFAULT: '#C9A36A',
          dark: '#B0884D',
          light: '#DEBE8A',
        },
        cream: {
          DEFAULT: '#F8F1E7',
          50: '#FFFDF9',
          100: '#F8F1E7',
          200: '#EFE3D3',
          300: '#E4D3BD',
        },
        ivory: {
          DEFAULT: '#FFFDF9',
          50: '#FFFFFF',
          100: '#FFFDF9',
          200: '#FAF6EF',
        },
        muted: {
          brown: '#7D6A60',
          light: '#9E8B80',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'warm-sm': '0 2px 8px -2px rgba(45, 33, 29, 0.06)',
        'warm-md': '0 8px 24px -4px rgba(45, 33, 29, 0.08), 0 2px 6px -1px rgba(45, 33, 29, 0.04)',
        'warm-lg': '0 16px 36px -6px rgba(45, 33, 29, 0.12), 0 6px 16px -2px rgba(45, 33, 29, 0.06)',
        'warm-xl': '0 24px 48px -12px rgba(45, 33, 29, 0.16)',
      },
      borderRadius: {
        'sm': '10px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
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
