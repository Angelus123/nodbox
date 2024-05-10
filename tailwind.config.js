/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'chat_bot': "url('./src/img/chat_bot.png')",
        'chat_close': "url('./src/img/chat_close.png')",
      },
      backgroundSize: {
        '70%': '70%',
        '60%': '60%',
        '50%': '50%',
        '100%': '100%',
      },
      colors: {
        customBlue:'#f1f5f9',
      },
      width: {
        '200': '200px',
        '400': '400px',
        '500': '500px',
        '600': '600px',
        '700': '700px',
        '3/5': '60%',
      },
      height: {
        '300': '300px',
        '500': '500px',
        '650': '650px',
        '700': '700px',
        '400': '400px',
        '3/5': '60%',
      }
    },
    plugins: [],
  }
};
