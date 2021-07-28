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
  env: {
    utils: {
      presets: [
        [
          '@babel/env',
          {
            loose: true,
            modules: false,
          },
        ],
      ],
      plugins: [
        [
          'module-resolver',
          {
            root: ['mopower-ui'],
            alias: {
              '@mopower-ui': 'mopower-ui/lib',
            },
          },
        ],
      ],
    },
  },
};
