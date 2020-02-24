const init = require('./commands/init.js');
const consoleError = require('firost/lib/consoleError');
const exit = require('firost/lib/exit');

module.exports = {
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
