module.exports = {
  darkmode: 'class',
  content: ["./dist/*.{html,js}","./dist/**/*.{html,js}","./src/*.css"],
  theme: {
    extend: {
      screens: {
        'xsm': '375px'
      },
      colors: {
        primary: `hsl(var(--primary-color))`,
        secondary: `hsl(var(--secondary-color))`,
        text: `hsl(var(--text-color))`,
      }
    },
  },
  plugins: [],
}