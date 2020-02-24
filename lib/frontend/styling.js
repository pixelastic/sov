module.exports = {
  init() {
    this.markAsJavaScriptEnabled();
    this.setupDynamicFontSize();
  },
  /**
   * Add a .js-loaded class to the html element, so specific CSS rules can apply
   **/
  markAsJavaScriptEnabled() {
    document.documentElement.classList.add('js-loaded');
  },
  /**
   * Update root font size based on current wrapper scaling
   * Whenever the slide wrapper is resized, we calculate its new scale compared
   * to the full sized one and adjust the base scale that impacts our default
   * rem value
   **/
  setupDynamicFontSize() {
    const maxHeight = 900; // Slides are developped with an assumed screen size of 1600x900
    const wrapper = document.querySelectorAll('.js-wrapper')[0];
    const watcher = new ResizeObserver(elements => {
      const { height } = elements[0].contentRect;
      const ratio = height / maxHeight;
      document.documentElement.style.setProperty('--scale-ratio', ratio);
    });
    watcher.observe(wrapper);
  },
};
