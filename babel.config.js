module.exports = {
  presets: [
    [
      '@babel/env',
      {
        loose: true,
        modules: false,
      },
    ]
  ],
  plugins: ["transform-vue-jsx"],
};
