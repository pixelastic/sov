const norska = require('norska');
const remove = require('firost/remove');
const glob = require('firost/glob');
const copy = require('firost/copy');
const helper = require('../helper');
const _ = require('golgoth/_');
const pMap = require('golgoth/pMap');

module.exports = {
  // TODO: Should remove the .main and .files entries in package.json as we
  // don't export it as a module
  // TODO: Should remove scripts.release
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
    await pMap(files, async (filepath) => {
      await remove(helper.hostPath(filepath));
    });
  },
  async addSovFiles() {
    const sovRoot = helper.sovRoot();

    const files = await glob(`${sovRoot}/templates/**/*`, {
      directories: false,
    });
    await pMap(files, async (filepath) => {
      const basepath = _.replace(filepath, `${sovRoot}/templates/`, '');
      const destination = helper.hostPath(basepath);

      await copy(filepath, destination);
    });
  },
};
