import styling from './styling.js';
import keyboard from './keyboard.js';
import highlight from './highlight.js';

export default {
  init() {
    document.addEventListener('DOMContentLoaded', function() {
      styling.init();
      keyboard.init();
      highlight.init();
    });
  },
};
