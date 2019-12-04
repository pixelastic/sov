/* eslint-disable import/no-commonjs */
const config = require('norska/build/tailwind.config.js');

const spacing = {
  ...config.theme.spacing,
  '8p': '8p',
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
