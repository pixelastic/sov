import init from './commands/init.js';
import firost from 'firost';

export default {
  async run(args) {
    const commandName = args[0] || '';
    const commands = {
      init,
    };
    if (!commands[commandName]) {
      firost.consoleError(`) sov: Unknown command ${commandName}`);
      firost.exit(1);
      return false;
    }

    await commands[commandName].run();
  },
};
