// Add a rateLimit variable which relgates the full 500 ticker scrape to happen only every six hours.
const rateLimit = 6 * 60 * 60 * 1000;

// Add a variable currentTimeCheck, which is set Date.now, to compare to the rateLimit comparison.
let lastScrape = Date.now() - rateLimit;

// Add a function to check to see if the rate limiting standard has been meet before allowing another scrape to be ran.
function rateLimitCheck() {
  // Get the current time
  const currentTime = Date.now();
  // Check if the current time is greater than the time of the last scrape plus the rate limit.
  if (currentTime >= lastScrape + rateLimit) {
    // If enough time has passed, update lastScrape and return true.
    return true;
  } else {
    // If not enough time has passed, return false.
    return false;
  }
}

// Add a scrapeData function that uses puppeteer to scrape the data we need after it is dynamically loaded to the page with JavaScript.npm 
async function scrapeData( ticker, page ) {
  try {
      const reqUrl = `https://www.nyse.com/quote/${ticker}`;
      await page.goto(reqUrl);

      // Wait for the selectors to load
      const stockNameSelector = 'h2';
      const priceSelector = '.d-dquote-x3';
      await page.waitForSelector(stockNameSelector);
      await page.waitForSelector(priceSelector);

      // Scrape the data
      const stockName = await page.evaluate((selector) => {
          const element = document.querySelector(selector);
          return element ? element.innerText : null;
      }, stockNameSelector);
      console.log(`Scraped stock name for ticker ${ticker}:`, stockName);

      const price = await page.evaluate((selector) => {
          const element = document.querySelector(selector);
          return element ? element.innerText : null;
      }, priceSelector);
      console.log(`Scraped price for ticker ${ticker}:`, price);

      return {
          ticker: ticker,
          stockName: stockName,
          price: price,
      };
  } catch (error) {
      console.error(`Failed to scrape data for ticker ${ticker}: ${error}`);
  }
}

// Add export for all necessary scraper components.
module.exports = { lastScrape, rateLimit, rateLimitCheck, scrapeData };
