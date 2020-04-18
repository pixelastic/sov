module.exports = {
  extends: ['./node_modules/aberlaas/lib/configs/eslint.js'],
  overrides: [
    {
      // requiring sov in templates is expected to fail linting
      // but should work once copied to the host
      files: ['./templates/**/*.js'],
      rules: {
        'node/no-missing-require': ['off'],
      },
    },
  ],
};
