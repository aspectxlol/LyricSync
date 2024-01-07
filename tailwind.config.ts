import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'text': 'var(--text)',
      'background': 'var(--background)',
      'primary': 'var(--primary)',
      'secondary': 'var(--secondary)',
      'accent': 'var(--accent)',
    },
    fontSize: {
      sm: '0.667rem',
      base: '1rem',
      xl: '1.500rem',
      '2xl': '2.250rem',
      '3xl': '3.375rem',
      '4xl': '5.063rem',
      '5xl': '7.595rem',
    },
    fontWeight: {
      normal: '400',
      bold: '700',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  
  plugins: [],
}
export default config
