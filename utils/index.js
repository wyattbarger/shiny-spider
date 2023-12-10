// Add the require statements for each utils file to the index.js for modularization and cleaner code.
const spiderLogic = require('./spiderLogic');
const tickerArray = require('./tickerArray');

module.exports = { tickerArray, spiderLogic };
