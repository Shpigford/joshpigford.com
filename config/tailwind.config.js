const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './public/*.html',
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js',
    './app/views/**/*.{erb,haml,html,slim}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        serif: ["Gambarino-Regular", ...defaultTheme.fontFamily.serif],
      },
      colors: {
        white: "#F0EFEA",
        black: "#1B1A19",
        gold: {
          "50": "#ffffe7",
          "100": "#ffffc1",
          "200": "#fffb86",
          "300": "#fff041",
          "400": "#ffe00d",
          "500": "#ffd100",
          "600": "#d19900",
          "700": "#a66d02",
          "800": "#89550a",
          "900": "#74450f",
          "950": "#442404",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
  ]
}
