const norska = require('norska');
const remove = require('firost/lib/remove');
const glob = require('firost/lib/glob');
const copy = require('firost/lib/copy');
const helper = require('../helper');
const _ = require('golgoth/lib/_');
const pMap = require('golgoth/lib/pMap');

module.exports = {
  async run() {
    await this.addNorskaFiles();
    await this.addSovFiles();
  },
  async addNorskaFiles() {
    await norska.initConfig();
    await norska.init();

    // Cleanup norska files not needed
    const files = [
      'src/404.pug',
      'src/_includes/header.pug',
      'src/_includes/_layouts/core.pug',
    ];
    await pMap(files, async filepath => {
      await remove(helper.hostPath(filepath));
    });
  },
  async addSovFiles() {
    const sovRoot = helper.sovRoot();

    const files = await glob(`${sovRoot}/templates/**/*`, {
      directories: false,
    });
    await pMap(files, async filepath => {
      const basepath = _.replace(filepath, `${sovRoot}/templates/`, '');
      const destination = helper.hostPath(basepath);

      await copy(filepath, destination);
    });
  },
};
