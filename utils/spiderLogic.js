// Add the the chalk module for styling console logs.
const chalk = require("chalk");

// Create a log variable as a shorthand for console.log.
const log = console.log;

// Set a rate limit to prevent scraping more than once every six hours (rate limit is enforced only when the server is ran continuously), change this value to customize the limited rate of time between scrapes. This limit was set well within the bounds of ethical scraping as far as time between request goes, please keep this in mind when customizing this value.
const rateLimit = 6 * 60 * 60 * 1000;

// Initialize a variable to store the time of the last scrape. Subtracting the value of rateLimit from lastScrape allows initial function, while enforcing the rate limit for subsequent scrapes that happen without a server restart.
let lastScrape = Date.now() - rateLimit;

// Add a function to check if enough time has passed since the last scrape.
function rateLimitCheck() {
  // Get the current time.
  const currentTime = Date.now();
  // Check if the current time is greater than the time of the last scrape plus the rate limit.
  if (currentTime >= lastScrape + rateLimit) {
    return true;
  } else {
    return false;
  }
}

// Add a scrapeData function that uses puppeteer to scrape the data we need after it is dynamically loaded to the page with JavaScript.
async function scrapeData(ticker, page) {
  try {
    // Navigate to the webpage for the given ticker.
    const reqUrl = `https://www.nyse.com/quote/${ticker}`;
    await page.goto(reqUrl);

    // Define selectors for the data to be scraped.
    const stockNameSelector = "h2";
    const priceSelector = ".d-dquote-x3";

    // Wait for the selectors to load.
    await page.waitForSelector(stockNameSelector);
    await page.waitForSelector(priceSelector);

    // Scrape the stock name.
    const stockName = await page.evaluate((selector) => {
      const element = document.querySelector(selector);
      if (element) {
        let text = element.innerText;
        // Remove the uppercase ticker from the end of the stock name, which is inlcuded in the innerText of this element on the page.
        text = text.replace(/ [A-Z]+$/, "").trim();
        return text;
      } else {
        return null;
      }
    }, stockNameSelector);
    log('\n' + 
      chalk.green.italic(
        `✔︎ Scraped ${chalk.bold('stockName')} for ${chalk.bold('ticker')} ${chalk.underline(
          ticker
        )}: ${chalk.bold(stockName)}`
      )
    );

    // Scrape the stock price.
    const price = await page.evaluate((selector) => {
      const element = document.querySelector(selector);
      return element ? element.innerText : null;
    }, priceSelector);
    log(
      chalk.green.italic(
        `✔︎ Scraped ${chalk.bold('price')} for ${chalk.bold('ticker')} ${chalk.underline(ticker)}: $${chalk.bold(price)}`
      )
    );

    // Return the scraped data.
    return {
      ticker: ticker,
      stockName: stockName,
      price: price,
    };
  } catch (error) {
    console.error('\n' + 
      chalk.red.bold(
        `❕ Failed to scrape data for ticker ${chalk.underline(
          ticker
        )}: ${error} ❕`
      )
    );
  }
}

// Add export for all necessary scraper components.
module.exports = { lastScrape, rateLimit, rateLimitCheck, scrapeData };
