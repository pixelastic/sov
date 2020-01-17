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
  slides: null,
  currentSlideIndex: 0,
  steps: null,
  currentStepIndex: 0,
  disableSteps: false,
  init() {
    window.onload = () => {
      this.applyJavaScriptOnlyCSSClasses();
      this.enableKeyboardNavigation();
      this.setupDynamicFontSize();
      this.highlightCode();
      // Disable steps (displaying them all at once) if ?disableSteps=1 is passed
      // to the url. Useful for screenshots
      const urlParameters = this.getUrlParameters();
      this.disableSteps = urlParameters.disableSteps === '1';
      if (!this.disableSteps) {
        document.documentElement.classList.add('js-enable-steps');
      }

      // Display either first slide, or the one specified in the url
      this.slides = document.querySelectorAll('.slide');
      this.currentSlideIndex = this.getSlideIndexFromUrl();
      this.displaySlide(this.currentSlideIndex);
    };
  },
  applyJavaScriptOnlyCSSClasses() {
    document.documentElement.classList.add('js-loaded');
  },
  enableKeyboardNavigation() {
    document.onkeydown = this.handleKeyPress.bind(this);
  },
  highlightCode() {
    document.querySelectorAll('.codeblock').forEach(block => {
      block.classList.add('js-codeblock');
      hljs.highlightBlock(block);
    });
  },
  /**
   * Update root font size based on current wrapper scaling
   * Whenever the slide wrapper is resized, we calculate its new scale compared
   * to the full sized one and adjust the base scale that impacts our default
   * rem value
   **/
  setupDynamicFontSize() {
    const maxHeight = window.screen.height;
    const wrapper = document.querySelectorAll('.js-wrapper')[0];
    const watcher = new ResizeObserver(elements => {
      const { height } = elements[0].contentRect;
      const ratio = height / maxHeight;
      document.documentElement.style.setProperty('--scale-ratio', ratio);
    });
    watcher.observe(wrapper);
  },
  /**
   * Return an object of urls GET parameters
   * @returns {object} Object of GET parameters in the url
   **/
  getUrlParameters() {
    const raw = location.search.substr(1);
    const result = {};
    raw.split('&').forEach(part => {
      const split = part.split('=');
      result[split[0]] = split[1];
    });
    return result;
  },
  /**
   * Display the specified slide
   * @param {number} slideIndex Index of the slide to display
   * @param {object} userOptions Options to define behavior. Possibles keys are:
   *     - showAllSteps {Boolean} Default false. Set to true to display all
   *     steps by default.
   **/
  displaySlide(slideIndex, userOptions = {}) {
    const options = {
      showAllSteps: false,
      ...userOptions,
    };

    // Hide current slide
    this.currentSlide().classList.remove('js-slide-current');

    // Change current slide to the next one
    this.currentSlideIndex = slideIndex;
    this.currentSlide().classList.add('js-slide-current');

    // Potentially update the slide layout
    // this.updateLayout();

    // Update the list of potential internal steps in this slide
    this.steps = this.getSlideSteps();
    // Hide them all by default so we can step through them
    // or show them all so we step in reverse
    if (options.showAllSteps) {
      this.currentStepIndex = this.steps.length;
      this.steps.forEach(step => {
        step.classList.add('js-step-visible');
      });
    } else {
      this.currentStepIndex = 0;
      this.steps.forEach(step => {
        step.classList.remove('js-step-visible');
      });
    }

    // Update time indicator
    this.updateTimeIndicator();

    // Update hash
    window.location.hash = `#slide${slideIndex}`;
  },
  /**
   * Show the next part of the talk
   **/
  next() {
    // If no internal steps, or already at the last one, go to next slide
    const stepCount = this.steps.length;
    if (!stepCount || this.currentStepIndex === stepCount) {
      this.displaySlide(
        Math.min(this.currentSlideIndex + 1, this.slides.length - 1)
      );
      return;
    }

    // Show the next step
    this.currentStepIndex += 1;
    this.currentStep().classList.add('js-step-visible');
  },
  /**
   * Show the previous part of the talk
   **/
  previous() {
    // If no internal steps, or already at the first one, go to previous slide
    const stepCount = this.steps.length;
    if (!stepCount || this.currentStepIndex === 0) {
      this.displaySlide(Math.max(this.currentSlideIndex - 1, 0), {
        showAllSteps: true,
      });
      return;
    }

    this.currentStep().classList.remove('js-step-visible');
    this.currentStepIndex -= 1;
  },
  /**
   * Update the time indicator
   **/
  updateTimeIndicator() {
    const max = this.slides.length;
    const current = this.currentSlideIndex + 1;
    const percent = Math.ceil((current / max) * 100);

    document.querySelector('.js-time-indicator').style.width = `${percent}%`;
  },
  /**
   // * Update the whole talk layout based on the specific data-layout attribute of
   // * the current slide
   // * @returns {Void}
   // **/
  // updateLayout() {
  //  const layout = this.currentSlide().dataset.layout;
  //  if (!layout) {
  //    delete document.body.dataset.layout;
  //    return;
  //  }
  //  document.body.dataset.layout = layout;
  // },
  /**
   * Show/hide the current notes
   **/
  toggleNotes() {
    const currentValue = parseInt(document.body.dataset.notesVisible || 0, 10);
    document.body.dataset.notesVisible = currentValue ? 0 : 1;
  },
  /**
   * Read the slide index from the url
   * @returns {number} Slide index
   **/
  getSlideIndexFromUrl() {
    const currentHash = window.location.hash;
    // Special case to catch the last slide
    if (currentHash === '#end') {
      return this.slides.length - 1;
    }
    const hashRegexp = /^#slide([0-9]*)/;
    if (!hashRegexp.test(currentHash)) {
      return 0;
    }
    const matches = currentHash.match(hashRegexp);
    return parseInt(matches[1], 10);
  },
  /**
   * Returns the ordered list of steps in the current slide
   * @returns {Array} Ordered list of steps
   **/
  getSlideSteps() {
    // When steps are disabled, we consider that we don't have any
    if (this.disableSteps) {
      return [];
    }
    const stepsAsNodeList = this.currentSlide().querySelectorAll('[data-step]');
    const steps = [].slice.call(stepsAsNodeList);
    steps.sort(
      (a, b) => parseInt(a.dataset.step, 10) - parseInt(b.dataset.step, 10)
    );
    return steps;
  },
  /**
   * Returns the current slide as a DOM element
   * @returns {Element} Slide DOM Element
   **/
  currentSlide() {
    return this.slides[this.currentSlideIndex];
  },
  /**
   * Returns the current internal step in the slide as a DOM Element
   * @returns {Element} Slide DOM Element
   **/
  currentStep() {
    return this.steps[this.currentStepIndex - 1];
  },
  /**
   * Listen to keypressed and display the relevant slide
   * @param {Event} event Keyboard event sent by the browser
   **/
  handleKeyPress(event) {
    const keyCode = event.keyCode;
    const keys = {
      down: 40,
      end: 34,
      enter: 13,
      home: 33,
      left: 37,
      right: 39,
      space: 32,
      pagedown: 35,
      pageup: 36,
      up: 38,
      escape: 27,
      h: 72,
    };

    if ([keys.right, keys.down, keys.space, keys.enter].includes(keyCode)) {
      this.next();
      return;
    }
    if ([keys.left, keys.up].includes(keyCode)) {
      this.previous();
      return;
    }
    if ([keys.home, keys.pageup, keys.escape].includes(keyCode)) {
      this.displaySlide(0);
      return;
    }
    if ([keys.end, keys.pagedown].includes(keyCode)) {
      this.displaySlide(this.slides.length - 1);
      return;
    }
    if ([keys.h].includes(keyCode)) {
      this.toggleNotes();
      return;
    }
  },
};
