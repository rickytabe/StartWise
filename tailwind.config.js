module.exports = {
  // ...existing config
  theme: {
    extend: {
      // ...existing theme
      animation: {
        'underline': 'underline 0.2s ease-out forwards',
      },
      keyframes: {
        underline: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
    },
  },
}