/** @type {import('tailwindcss').Config} */
module.exports = {
  mode:'jit',
  purge: ['./index.html', './src/**/*.js'],
  content:  ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        // new template
        lapis:'#1A659E',
        polyblue:'#004E89',
        beige:'#EFEFD0',
        peach:'#F7C59F',
        crayolaOrange:'#FF6B35',

        //UwU
        veryDarkBlue:"#03045e",
        darkBlue:"#0077B6",
        mediumBlue:"#00b4d8",
        lightBlue:"#90e0ef",
        veryLightBlue:"#caf0f8",


        lcream:'#b8ada3',
        lcream1:'#937a52',
        dcream:'#675c54',
        dark:'#1c1717',
        offwhite:'#F5F5F5',
        navyblue:'#000080',
        skyblue:'#87CEEB',
        searchbardown : '#055578',
        searchbarup : '#03334A',
        queryview : '#7190A1',
        white : '#ECEDED',
        grayy: "#1e1e1e",
        darkslategray: {
          "100": "#152f3e",
          "200": "rgba(5, 77, 111, 0.55)",
          "300": "rgba(6, 44, 62, 0.63)",
        },
        gainsboro:{
          "100": "#e4e4e4",
          "200": "#d9d9d9",
        },
        lightblue: "#bcd5e1",
      }
    },
  },
  plugins: [],
}

