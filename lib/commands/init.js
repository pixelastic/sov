import norska from 'norska';
import firost from 'firost';
import path from 'path';
import { _, pMap } from 'golgoth';

export default {
  async run() {
    await norska.initConfig();
    await norska.init();

    await this.addSovFiles();
  },
  async addSovFiles() {
    const sovRoot = path.resolve(__dirname, '../..');
    const hostRoot = process.cwd();

    const files = await firost.glob(`${sovRoot}/templates/**/*`);
    await pMap(files, async filepath => {
      const basepath = _.replace(filepath, `${sovRoot}/templates/`, '');
      const destination = path.resolve(hostRoot, basepath);

      await firost.copy(filepath, destination);
    });
    // Add Tailwind config
    // Specific layout
    // Specific styles
    // Specific script
    // Specific fonts
  },
};
