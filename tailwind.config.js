/** @type {import('tailwindcss').Config} */
module.exports = {
  mode:'jit',
  purge: ['./index.html', './src/**/*.js'],
  content:  ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{

      }
    },
  },
  plugins: [],
}

