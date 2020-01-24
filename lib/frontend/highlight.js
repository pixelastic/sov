import hljs from 'highlight.js/lib/highlight.js';
import hljsCss from 'highlight.js/lib/languages/css';
import hljsHtml from 'highlight.js/lib/languages/xml';
import hljsJson from 'highlight.js/lib/languages/json';
import hljsJs from 'highlight.js/lib/languages/javascript';
import hljsYaml from 'highlight.js/lib/languages/yaml';
hljs.registerLanguage('css', hljsCss);
hljs.registerLanguage('html', hljsHtml);
hljs.registerLanguage('json', hljsJson);
hljs.registerLanguage('js', hljsJs);
hljs.registerLanguage('yaml', hljsYaml);
hljs.registerLanguage('yml', hljsYaml);

export default {
  init() {
    document.querySelectorAll('.codeblock').forEach(block => {
      block.classList.add('js-codeblock');
      hljs.highlightBlock(block);
    });
  },
};
