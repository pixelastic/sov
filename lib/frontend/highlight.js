const hljs = require('highlight.js/lib/highlight.js');
const hljsCss = require('highlight.js/lib/languages/css');
const hljsHtml = require('highlight.js/lib/languages/xml');
const hljsJson = require('highlight.js/lib/languages/json');
const hljsJs = require('highlight.js/lib/languages/javascript');
const hljsYaml = require('highlight.js/lib/languages/yaml');
hljs.registerLanguage('css', hljsCss);
hljs.registerLanguage('html', hljsHtml);
hljs.registerLanguage('json', hljsJson);
hljs.registerLanguage('js', hljsJs);
hljs.registerLanguage('yaml', hljsYaml);
hljs.registerLanguage('yml', hljsYaml);

module.exports = {
  init() {
    document.querySelectorAll('.codeblock').forEach(block => {
      block.classList.add('js-codeblock');
      hljs.highlightBlock(block);
    });
  },
};
