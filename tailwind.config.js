/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html','./style.css','./scripts.js','./details.html','./details.css','./details.js'],
  theme: {
    extend: {
      colors:{
        'red':'#db0000',
        'darkred':'#831010',
        'lightred':'#e63b36',
        'gray':'#808080'
      }
      
    },
  },
  plugins: [],
}

