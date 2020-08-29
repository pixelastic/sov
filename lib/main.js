const init = require('./commands/init.js');
const consoleError = require('firost/consoleError');
const exit = require('firost/exit');

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
