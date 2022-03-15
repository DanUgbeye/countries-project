module.exports = {
  darkmode: 'class',
  content: ["./dist/*.{html,js}","./dist/**/*.{html,js}","./src/*.css"],
  theme: {
    extend: {
      screens: {
        'xsm': '375px'
      }
    },
  },
  plugins: [],
}