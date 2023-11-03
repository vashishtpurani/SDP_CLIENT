/** @type {import('tailwindcss').Config} */
module.exports = {
  mode:'jit',
  purge: ['./index.html', './src/**/*.js'],
  content:  ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'lcream':'#b8ada3',
        'lcream1':'#937a52',
        'dcream':'#675c54',
        'dark':'#1c1717',
        'offwhite':'#F5F5F5',
        'white':'#FFFFFF',
        'navyblue':'#000080',
        'skyblue':'#87CEEB'
      }
    },
  },
  plugins: [],
}

