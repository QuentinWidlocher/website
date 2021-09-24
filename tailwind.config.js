const tailwindColors = require('tailwindcss/colors')

const colors = {
  primary: tailwindColors.sky,
  ...tailwindColors
}

module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.html', './src/**/*.{astro,js,jsx,ts,tsx,vue}'],
  theme: {
    extend: {
      colors,
      boxShadow: {
        'primary-lg': `0 10px 15px -3px ${colors.primary['500']}4C, 0 4px 6px -2px ${colors.cyan['500']}33`,
        'primary-2xl': `0 25px 50px -12px ${colors.primary['500']}3F`
      }
    }
  }
};
