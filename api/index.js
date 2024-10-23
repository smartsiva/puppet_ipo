const puppeteer = require('puppeteer');

module.exports = async (req, res) => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  
  const page = await browser.newPage();

  try {
    await page.goto('https://www.example.com'); // Change to your target URL
    const pageContent = await page.content();

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
