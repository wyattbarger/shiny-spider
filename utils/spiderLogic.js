// Add require satements for Axios and Cheerio to write helper functions.
const axios = require("axios");
const cheerio = require("cheerio");

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

// Add a function to scrape the data needed from NYSE using Axios and Cheerio, and return it in the format of an object.
async function scrapeData(ticker) {
  try {
    // Add the Url we will be making our Axios requests to.
    const reqUrl = `https://www.nyse.com/quote/${ticker}`;
    // Add a response variable to store the page we will return from our Axios request.
    const response = await axios.get(reqUrl);
    // Add a const $ to load the data returned by Axios in the response variable as a Cheerio object (https://cheerio.js.org/docs/intro).
    const $ = cheerio.load(response.data);
    // Add a line that will scrape the stock name from the element with the class by targeting the text of the element assigned that class, accessed through the Cheerio object '$'.
    const stockName = $("h2").text();
    const price = $(".d-dquote-x3").text();
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
