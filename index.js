// Add require statements for each of the necessary technologies and utilities to build the scraper.
const axios = require('axios');
const cheerio = require('cheerio');
const { tickerArray, spiderLogic } = require('./utils')

// Add the shinySpider() function which will be the main function to operate once the npm package is released for user function.
async function shinySpider() {
    console.log(tickerArray)
    let scrapeResults = [];
    for (const ticker of tickerArray) {
        try {
            if (spiderLogic.rateLimitCheck()) {
                const scrape = await spiderLogic.scrapeData(ticker);
                scrapeResults.push(scrape);
                spiderLogic.lastScrape = Date.now();
            } else {
                return `🛑 Six hour rate limit hit. Please review the packages documentation regarding rate limiting for help.`
            }
        } catch (error) {
            console.error(`Failed to run shinySpider function with error code: ${error}.`)
        }
    }
    return scrapeResults;
};

(async () => {
    console.log(await shinySpider());
  })();

module.exports = shinySpider
