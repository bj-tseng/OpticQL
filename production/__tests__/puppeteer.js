const puppeteer = require("puppeteer");
// const puppeteerExpect = require("expect-puppeteer");
require("expect-puppeteer");

const APP = `http://localhost:${process.env.PORT || 3001}/`;

/**
 * Welcome to puppeteer! This library from Google is fast-emerging as the gold
 * standard for end-to-end browser testing.
 *
 * One of the challenges of real-time testing is that almost every single
 * action is asynchronous. Hence, puppeteer is almost always used in an
 * async/await syntax. If you aren't familiar with async/await, in short it
 * lets you "pause" a function on any Promise. While it's paused, the JS engine
 * can continue to run synchronously outside of the function (just like a
 * normal Promise or callback). Once the Promise resolves, it comes back in
 * through the event queue and the 'awaited' function can resume execution.
 *
 * For a more in-depth look at the underlying design of async/await, see
 * https://ponyfoo.com/articles/understanding-javascript-async-await
 */
describe("Front-end Integration/Features", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    page = await browser.newPage();
  });

  afterAll(() => {
    browser.close();
  });

  describe("Initial display", () => {
    it("QuadrantView loads successfully", async () => {
      // We navigate to the page at the beginning of each case so we have a fresh start
      await page.goto(APP);
      // await page.waitForSelector("#mainQuadrantContain");
      // const containerArray1 = await page.$eval("#mainQuadrantContain", (el) => {
      //   return el.children;
      // });
      // console.log("#mainQuadrantContain", containerArray1);
      const title = await page.$eval("#mainContainer", (el) => {
        return el.innerHTML;
        // console.log("HTML", el.innerHTML);
        // if (el.innerHTML === "the test works") {
        //   return true;
        // } else {
        //   return false;
        // }
        // return el.innerHTML === "the test works" ? true : false;
      });
      console.log("THE TITLE: ", title);
      const topQuadrant = await page.$eval(".topQuadrant", (el) =>
        el ? true : false
      );
      const topRow = await page.$eval("#topRow", (el) => (el ? true : false));
      const bottomRow = await page.$eval("#bottomRow", (el) =>
        el ? true : false
      );
      // expect(title).toBe(true);
      expect(topQuadrant).toBe(true);
      expect(topRow).toBe(true);
      expect(bottomRow).toBe(true);
    });

    it("OpticQL logo loads correctly", async () => {
      await page.goto(APP);
      const opticQLLogo = await page.$eval("img", (el) => {
        return el.innerHTML;
      });
      console.log("THE LOGO: ", opticQLLogo);
    });
  });
});

// it("displays a usable input field for locations", async () => {
//   await page.goto(APP); // takes a URL
//   await page.waitForSelector("#new-location"); // takes a selector - waits for it to appear in page
//   await page.focus("#new-location"); // fetches element (selector)
//   await page.keyboard.type("Tallahassee");
//   const inputValue = await page.$eval("#new-location", (el) => el.value);
//   expect(inputValue).toBe("Tallahassee");
// });

// // TODO: Finish tests

// it("renders the MarketsDisplay section", async () => {
//   await page.goto(APP);
//   await page.waitForSelector(".displayBox");
//   const title = await page.$eval("h4", (el) => el.innerHTML);
//   expect(title).toBe("Markets");
// });

// it("renders the TotalsDisplay area", async () => {
//   await page.goto(APP);
//   await page.waitForSelector("#totals");
//   const title = await page.$eval("strong", (el) => el.innerHTML); // $eval - runs document.querySelector in the page takes (selector, func) - func is el.SOMETHING - whatever you want to return (innerHTML, value, href)
//   expect(title).toBe("Total Cards: ");
// });
//   });

// describe("State interactions", () => {
//   it("can add a new market", async () => {
//     await page.goto(APP);
//     // await page.waitForSelector('.primary');
//     // await page.waitForSelector('.allMarkets');
//     // await page.waitForSelector('#new-location'); // takes a selector - waits for it to appear in page
//     await page.focus("#new-location"); // tells it where to look to perform an action (next line)
//     await page.keyboard.type("Tallahassee"); // selects the type box and types in it
//     const initialLength = await page.$$eval(".marketBox", (el) => el.length); // page.$$ - runs Array.from(doc.querySelectorAll(selector))
//     await page.click(".primary");
//     const newLength = await page.$$eval(".marketBox", (el) => el.length);
//     expect(newLength).toBe(initialLength + 1);
//   });

//   it("can add and remove cards", async () => {
//     await page.goto(APP);
//     await page.waitForSelector("button");
//     await page.focus("#new-location"); // focus on new location entry box
//     await page.keyboard.type("Tallahassee"); // type in box
//     await page.click(".primary"); // submit new market

//       const button = await page.$$eval("button", (el) =>
//         el.filter((element) => element.innerHTML === "+")
//       );
//       console.log("button", button);
//       await button.click();
//       const endCount = await page.$eval("p", (el) => el.innerHTML);
//       expect(endCount).toEqual(1);
//       // store the count number
//       // select the plus button
//       // click it
//       // expect the count to equal the count number + 1
//     });

//     xit("cannot delete cards from a market with zero cards", () => {});
//   });

//   describe("Server interactions", () => {
//     // TODO: You'll need to require in and query the test DB in order to ensure
//     // that the right items show up. You may find it's easiest to start each
//     // test with a fresh DB.
//     xit("loads all markets from database on pageload", () => {});

//     xit("maintains synced state after refresh", () => {
//       // First you'll need to make something to sync!
//     });
//   });
// });
