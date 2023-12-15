# 🕷️🕸️ shiny-spider 💵🪙

![License:GPLv3.0](https://img.shields.io/badge/License-GPLv3.0-green.svg)



### TABLE OF CONTENTS
- [🧑‍💻 User Story](#user-story)
- [📄 Description](#description)
- [📁 Installation](#installation)
- [🏗️ Usage](#usage)
- [🛠️ Configuration | Customization](#usage)
- [📜 License](#license)
- [🤝 Contributing](#contributing)
- [📍 Tests](#tests)
- [📲 Contact](#contact-the-developer)

## 🧑‍💻 USER STORY

- **As a beginner developer looking into using npm packages in my development to accomplish a variety of tasks:**
  
  - I want a user-friendly package that scrapes the prices of S&P 500 index listed stocks using puppeteer.
  
  - I desire an easy-to-use solution that requires minimal configuration and has clear instructions for customization if desired.
  
  - I would like ethical rate limiting and data caching that will last as long as the server remains running built-in by default, with the rate limit being customizable based on my specific need.
  
  - I aim for a package that allows for easy customization and refactoring for my specific project needs, spelled out in the documentation and installed modules file comments.
  
  - I seek a near plug and play package to help introduce myself to the npm platform as a self taught programmer, or programmer beginning their formal education.

## 📄 DESCRIPTION

`shiny-spider` is a user-friendly npm package designed for beginner developers seeking a hassle-free solution to scrape real-time prices of S&P 500 index-listed stocks using puppeteer, directly from the NYSE's quotes. This package prioritizes simplicity, requiring minimal configuration while offering clear instructions for customization. This is [my](https://github.com/wyattbarger) first npm package release, please see the [contact ↓](#contact) section if you would like to discuss any matters regarding this release with me.

## 📁 INSTALLATION

`npm install shiny-spider`

Navigate to the root directory of your project, then run the above line of code in a new terminal.

<hr style="border:0; border-top:1px dotted #dfe2e5">

<small>*Note: You will need to run npm init within your project's driectory before installing this package, so that there is a package.json to install shiny-spider to as a dependency. The line of code below can be used if you have not yet done this.*</small>

<small>`npm init -y`</small>

## 🏗️ USAGE


After following the instructions above in "Installation" import the shiny-spider module by pasting the following code at the top of you server.js or index.js file (may vary depending on your naming preferences):

`const shinySpider = require('shiny-spider');`

Using the scraper is as simple as assigning `shinySpider()` to a variable for you to use in your node.js application, as seen bellow:

`const runShinySpider = shinySpider();`

The variable name that you decide to assign shinySpider to can be changed according to your preferences or project needs. Once assigned, shinySpider can be used as a route end point, as a function to seed specific data related to the scrape, and anything else you as the user can apply it to. shinySpider() returns its data in a array of JavaScript objects in the key-value pair format of:

    {
        ticker: '',

        stockName: 'data-from-scrape',

        price 'data-from-scrape',
    }

By default this array will contain the five hundred stocks included in the Standard and Poor's 500 Index, with the data being scraped from quotes via the [NYSE 🏦](https://www.nyse.com/quotes).

## 🛠️ CONFIGURATION

## 📜 LICENSE


This project is licensed under the **GNU General Public License v3.0** - see the [LICENSE](LICENSE) file for details.



## 🤝 CONTRIBUTING




## 📍 TESTS


`(async () => {
    console.log(await shinySpider());
  })();`

  

## 📲 CONTACT THE DEVELOPER

Developers GitHub profile:
[wyattbarger](https://github.com/wyattbarger)

Reach the developer on LinkedIn: [wyatt-barger](https://www.linkedin.com/in/wyatt-barger/)

Create a GitHub issue related to this project: [Issues](https://github.com/wyattbarger/shiny-spider/issues)

----------------------------
