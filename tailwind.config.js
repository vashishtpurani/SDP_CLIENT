/** @type {import('tailwindcss').Config} */
module.exports = {
  mode:'jit',
  purge: ['./index.html', './src/**/*.js'],
  content:  ["./src/**/*.{html,js}"],
  theme: {
    borderRadius: {
      'none': '0',
      'sm': '0.125rem',
      'md': '0.375rem',
      'lg': '0.5rem',
      'full': '9999px',
      'large': '12px',
      'bigf':'3rem',
      '3xl':'1.5rem',
      '2xl':'1rem',
      'xl':'rem'
    },
    extend: {
      animation:{
        'shake': 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
      },
      keyframes: {
        'shake' : {
          '10%, 90%': {
            transform: 'translate3d(-1px, 0, 0)'
          },
          '20%, 80%' : {
            transform: 'translate3d(2px, 0, 0)'
          },
          '30%, 50%, 70%': {
            transform: 'translate3d(-4px, 0, 0)'
          },
          '40%, 60%': {
            transform: 'translate3d(4px, 0, 0)'
          }
        }
      },
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

        //heatanshu
        bgDarkBlue:"#0E2229",
        mdGold:"#A56708",
        formbg:'#AEC4CE',
        blackblue:'#00363F',
        bgblackblue:'#0E2229',
        reviewbrown:'#443725',

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

