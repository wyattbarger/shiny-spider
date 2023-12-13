// ** If you wish to customize this package, please navigate to the utils folder and check the documentation. Depending on the customization you wish to implement, you likely do not need to modify the shinySpider() async function. **

// Add puppeteer, progress and chalk packages from npm to build main operation shinySpider().
const puppeteer = require("puppeteer");
const ProgressBar = require('progress');
const chalk = require('chalk');
const { tickerArray, spiderLogic } = require('./utils')

// shinySpider() uses all logic from the package to compile the finished scraper this is the function users call to start the scraping process.
// Customization should be handled first in the .js files in the /utils directory.
async function shinySpider() {
    // Launch a new headless browser instance using puppeteer.
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    // Define the scrapeResults array to store scraped data in, and initialize a progress bar.
    let scrapeResults = [];
    const log = console.log;
    const scrapeProgress = new ProgressBar(':bar :percent :etas', { 
        total: tickerArray.length,
        incomplete: chalk.red('-'),
        complete: chalk.green('*') 
    });
    // Add a log to indicate the shinySpider function has been hit, before entering the try-catch block.
    log(chalk.bold.cyan('Starting scrape, this process could take up to a half hour. Progress will be logged to the server console.'))
    // Add a for loop to loop over the tickerArray from /utils and scrape the data for each ticker as defined in the scrapeData(ticker) function also from /utils.
    for (const ticker of tickerArray) {
        try {
            if (spiderLogic.rateLimitCheck()) {
                scrapeProgress.tick()
                const scrape = await spiderLogic.scrapeData(ticker, page);
                scrapeResults.push(scrape);
                spiderLogic.lastScrape = Date.now();
                log(chalk.bold.cyan(`Data successfully scraped for ${ticker} 🗃️`));
            } else {
                // Return this log if the rate limit is hit. See docs for more information.
                return chalk.bold.red(`🛑 Six hour rate limit hit. Please review the packages documentation regarding rate limiting and customization for help.`)
            }
        } catch (error) {
            console.error(chalk.bold.red(`❕ Failed to run shinySpider function with error code: ${error}. ❕`))
        }
    }
    // Close the browser instance and return the results
    await browser.close();
    console.log(chalk.magenta.bold.JSON.stringify(scrapeResults));
    return scrapeResults;
};
// ** REMOVE THIS ONCE ALL TESTING IS DONE AND COMPLETE, BEFORE YOU PUBLISH THIS PACKAGE ** 
(async () => {
    console.log(await shinySpider());
  })();

module.exports = shinySpider
