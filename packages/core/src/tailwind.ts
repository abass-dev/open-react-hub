import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

const openReactHubPreset: Config = {
  theme: {
    extend: {
      colors: {
        primary: colors.blue,
        secondary: colors.gray,
        success: colors.green,
        warning: colors.yellow,
        danger: colors.red,
        info: colors.sky,
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
      },
      boxShadow: {
        'soft-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}

export default openReactHubPreset

