// import daisyui from 'daisyui';
// /** @type {import('tailwindcss').Config} */

// export default {
//   content: ['./src/**/*.{html,js,jsx,tsx}'],
//   theme: {
//     extend: {},
//   },
//   plugins: [daisyui],
// }

import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(40px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        fadeUp: "fadeUp 1s ease-out forwards",
        fadeIn: "fadeIn 1s ease-out forwards",
      },
    },
  },
  plugins: [daisyui],
};
