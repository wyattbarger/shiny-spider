// Add require statements for each of the necessary technologies and utilities to build the scraper.
const axios = require('axios');
const cheerio = require('cheerio');
const { tickerArray, spiderLogic } = require('./utils')

// Add the shinySpider() function which will be the main function to operate once the npm package is released for user function.
async function shinySpider() {
    let scrapeResults = [];
    for (const ticker of tickerArray) {
        try {
            if (spiderLogic.rateLimitCheck()) {
                return await spiderLogic.scrapeData(ticker);
            } else {
                return spiderLogic.dataCache
            }
        } catch (error) {
            console.error(`Failed to run shinySpider function with error code: ${error}.`)
        }
    }
};

module.exports = shinySpider
