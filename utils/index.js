// This file exports the 'spiderLogic' and 'tickerArray' modules.
// spiderLogic contains the main logic for the web scraping process.
// tickerArray provides the list of tickers to be scraped.
// Users installing the package should not need to modify this file.
const spiderLogic = require('./spiderLogic');
const tickerArray = require('./tickerArray');

module.exports = { tickerArray, spiderLogic };
