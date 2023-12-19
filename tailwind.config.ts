import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        'Lato': ['Lato', 'sans-serif'],
      },
      textColor: {
        'main': '#2F80ED',
        'secondary': '#4f4f4f',
      },
      backgroundColor: {
        'main': '#2F80ED',
        'secondary': '#4f4f4f',
      }
    },
  },
  plugins: [],
}
export default config
