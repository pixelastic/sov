import init from './commands/init.js';
import consoleError from 'firost/lib/consoleError';
import exit from 'firost/lib/exit';

export default {
  async run(args) {
    const commandName = args[0] || '';
    const commands = {
      init,
    };
    if (!commands[commandName]) {
      consoleError(`) sov: Unknown command ${commandName}`);
      exit(1);
      return false;
    }

    await commands[commandName].run();
  },
};
