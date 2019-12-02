import module from '../init';
import helper from '../../helper';
import path from 'path';
import firost from 'firost';

describe('init', () => {
  const tmpDirectory = path.resolve('./tmp/init');
  beforeEach(async () => {
    jest.spyOn(helper, 'hostRoot').mockReturnValue(tmpDirectory);
    jest.spyOn(module, 'addNorskaFiles').mockReturnValue();
    await firost.emptyDir(tmpDirectory);
  });
  describe('run', () => {
    it('should create all the layouts', async () => {
      await module.run();

      const index = await firost.read(helper.hostPath('src/index.pug'));
      expect(index).toMatch('extends /_includes/_layouts/sov');

      const layout = await firost.read(
        helper.hostPath('src/_includes/_layouts/sov.pug')
      );
      expect(layout).toMatch('include /_includes/mixins');

      const mixins = await firost.read(
        helper.hostPath('src/_includes/mixins.pug')
      );
      expect(mixins).not.toBeEmpty();
    });
    it('should create the css files', async () => {
      await module.run();

      const style = await firost.read(helper.hostPath('src/style.css'));
      expect(style).toMatch("@import 'sov/style'");
    });
    it('should not add recursive directories', async () => {
      await module.run();

      const actual = await firost.exist(
        helper.hostPath('src/_includes/_includes/')
      );
      expect(actual).toEqual(false);
    });
  });
});
