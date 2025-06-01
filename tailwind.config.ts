module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        jump: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
          '100%': { transform: 'translateY(0)' }
        }
      },
      animation: {
        'jump': 'jump 0.5s cubic-bezier(0.4, 0, 0.2, 1) infinite',
      }
    }
  },
  plugins: [],
}