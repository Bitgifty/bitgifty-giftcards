/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Include all source files
  ],
  theme: {
    extend: {
      backgroundImage: {
        'blue-gradient': 'linear-gradient(to right, #113C9A, #D1DEFA)',
        "orange-gradient":"linear-gradient(to right, #F0A97580, #F5C6A380, #D0844D80, #F0A97580)"
      },
    },
    colors: {
      "grey-1": "#F2F2F2",
      "grey-2":"#DCDCDC",
      "blue-1":"#113C9A",
      "blue-2":"#1448B8",
      "blue-3":"#DFE8FB",
      "brown-1":"#9A4B11",
      "orange-1":"#FBEBDF",
      "black-1":"#000000",
      "black-2":"#4D4D4D",
      "black-3":"#05122E",
      "black-4":"#333333",
      "white-1":"#ffffff",
      "red-1":"#6D1313",
      
     
    },
  },
  plugins: [],
}

