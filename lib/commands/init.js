import norska from 'norska';
import firost from 'firost';
import { pMap } from 'golgoth';

export default {
  async run() {
    await norska.initConfig();
    await norska.init();

    await this.addSovFiles();
  },
  async addSovFiles() {
    const files = await firost.glob('./templates/**/*');
    await pMap(files, async filepath => {
      console.info(filepath);
    });
    // Add Tailwind config
    // Specific layout
    // Specific styles
    // Specific script
    // Specific fonts
  },
};
