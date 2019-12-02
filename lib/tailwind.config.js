/* eslint-disable import/no-commonjs */
const config = require('norska/build/tailwind.config.js');

const spacing = {
  ...config.theme.spacing,
  '8vh': '8vh',
};

config.theme = {
  ...config.theme,
  borderWidth: spacing,
  height: spacing,
  maxHeight: spacing,
  maxWidth: spacing,
  minHeight: spacing,
  minWidth: spacing,
  spacing,
  width: spacing,
};

module.exports = config;
