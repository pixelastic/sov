import norska from 'norska';
import firost from 'firost';
import helper from '../helper';
import { _, pMap } from 'golgoth';

export default {
  async run() {
    await this.addNorskaFiles();
    await this.addSovFiles();
  },
  async addNorskaFiles() {
    await norska.initConfig();
    await norska.init();
  },
  async addSovFiles() {
    const sovRoot = helper.sovRoot();

    const files = await firost.glob(`${sovRoot}/templates/**/*`, {
      directories: false,
    });
    await pMap(files, async filepath => {
      const basepath = _.replace(filepath, `${sovRoot}/templates/`, '');
      const destination = helper.hostPath(basepath);

      await firost.copy(filepath, destination);
    });
  },
};
