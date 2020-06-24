const styling = require('./styling.js');
const keyboard = require('./keyboard.js');
const highlight = require('./highlight.js');

module.exports = {
  init() {
    document.addEventListener('DOMContentLoaded', function () {
      styling.init();
      keyboard.init();
      highlight.init();
    });
  },
};
