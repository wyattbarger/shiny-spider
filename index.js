// Add require statements for each of the necessary technologies and utilities to build the scraper.
const puppeteer = require("puppeteer");
const ProgressBar = require('progress');
const chalk = require('chalk');
const { tickerArray, spiderLogic } = require('./utils')

// Add the shinySpider() function which will be the main function to operate once the npm package is released for user function.
async function shinySpider() {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    let scrapeResults = [];
    const log = console.log;
    const scrapeProgress = new ProgressBar(':bar :percent :etas', { total: tickerArray.length });
    for (const ticker of tickerArray) {
        try {
            if (spiderLogic.rateLimitCheck()) {
                log(chalk.bold.cyan('Starting scrape, this process could take up to a half hour. Progress will be logged to the server console.'))
                scrapeProgress.tick()
                const scrape = await spiderLogic.scrapeData(ticker, page);
                scrapeResults.push(scrape);
                spiderLogic.lastScrape = Date.now();
            } else {
                return `🛑 Six hour rate limit hit. Please review the packages documentation regarding rate limiting for help.`
            }
        } catch (error) {
            console.error(`Failed to run shinySpider function with error code: ${error}.`)
        }
    }
    await browser.close();
    return scrapeResults;
};

(async () => {
    console.log(await shinySpider());
  })();

module.exports = shinySpider
