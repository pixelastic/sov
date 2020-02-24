const module = require('../init');
const helper = require('../../helper');
const path = require('path');
const emptyDir = require('firost/lib/emptyDir');
const read = require('firost/lib/read');
const exist = require('firost/lib/exist');

describe('init', () => {
  const tmpDirectory = path.resolve('./tmp/init');
  beforeEach(async () => {
    jest.spyOn(helper, 'hostRoot').mockReturnValue(tmpDirectory);
    jest.spyOn(module, 'addNorskaFiles').mockReturnValue();
    await emptyDir(tmpDirectory);
  });
  describe('run', () => {
    it('should create all the layouts', async () => {
      await module.run();

      const index = await read(helper.hostPath('src/index.pug'));
      expect(index).toMatch('extends /_includes/_layouts/sov');

      const layout = await read(
        helper.hostPath('src/_includes/_layouts/sov.pug')
      );
      expect(layout).toMatch('include /_includes/mixins');

      const mixins = await read(helper.hostPath('src/_includes/mixins.pug'));
      expect(mixins).not.toBeEmpty();
    });
    it('should create the css files', async () => {
      await module.run();

      const style = await read(helper.hostPath('src/style.css'));
      expect(style).toMatch("@import 'sov/style'");
    });
    it('should not add recursive directories', async () => {
      await module.run();

      const actual = await exist(helper.hostPath('src/_includes/_includes/'));
      expect(actual).toEqual(false);
    });
  });
});
