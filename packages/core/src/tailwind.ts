import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'
import formsPlugin from '@tailwindcss/forms'
import typographyPlugin from '@tailwindcss/typography'
import aspectRatioPlugin from '@tailwindcss/aspect-ratio'

const openReactHubPreset: Config = {
  content: [],  // This will be overridden by the user's config
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
    formsPlugin,
    typographyPlugin,
    aspectRatioPlugin,
  ],
}

export default openReactHubPreset

