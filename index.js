const puppeteer = require('puppeteer');

module.exports = async (req, res) => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],  // Required for running in Vercel
  });
  const page = await browser.newPage();

  try {
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.89 Safari/537.36'
    );
    
    await page.goto('https://www.investorgain.com/report/ipo-subscription-live/333/ipo/');

    const pageContent = await page.content(); // Extract HTML content of the page

    res.status(200).json({
      message: "Puppeteer success!",
      html: pageContent
    });
  } catch (error) {
    res.status(500).json({ message: "Puppeteer failed", error: error.toString() });
  } finally {
    await browser.close();
  }
};
