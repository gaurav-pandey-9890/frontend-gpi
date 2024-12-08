module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
     'node_modules/flowbite/lib/esm/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
]
}
