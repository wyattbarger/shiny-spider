// Add require satements for Axios and Cheerio to write helper functions.
const axios = require('axios');
const cheerio = require('cheerio');

// Add a variable to cache the data from the scrape, that can be accessed until the next scrape which set to run every six hours is triggered.
const dataCache = [];

// Add a variable currentTimeCheck, which is set Date.now, to compare to the rateLimit comparison.
let lastScrape = Date.now()

// Add a rateLimit variable which relgates the full 500 ticker scrape to happen only every six hours.
const rateLimit = 6 * 60 * 60 * 1000;

// Add a function to check to see if the rate limiting standard has been meet before allowing another scrape to be ran.
function rateLimitCheck () {
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
};

// Add a function to scrape the data needed from NYSE using Axios and Cheerio, and return it in the format of an object.
async function scrapeData (ticker) {
    // Add the Url we will be making our Axios requests to.
    const reqUrl = `https://www.nyse.com/quote/${ticker}`;
        // Add a response variable to store the page we will return from our Axios request.
        const response = await axios.get(reqUrl)
    // Add a const $ to load the data returned by Axios in the response variable as a Cheerio object (https://cheerio.js.org/docs/intro).
    const $ = cheerio.load(response.data)
        // Add a line that will scrape the stock name from the element with the class by targeting the text of the element assigned that class, accessed through the Cheerio object '$'.
        const stockName = $('m-0.font-headings.border-0.pb-0.mers:border-b-2.mers:border-solid.mers:border-secondary.mers:pb-2.5.print:orphans-3.print:widows-3.font-medium.normal-case.leading-none.print:break-after-avoid.text-3x.md:text-5xl').text();
        const price = $('d-dquote-x3').text();
    return {
        ticker: ticker,
        stockName: stockName,
        price: price
    }
};
