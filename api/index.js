const puppeteer = require('puppeteer');

module.exports = async (req, res) => {
  const url = req.query.url || 'https://www.example.com'; // Default URL if none provided

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'networkidle2' }); // Wait for the page to load fully
    const screenshot = await page.screenshot({ encoding: 'base64' });

    res.status(200).json({
      message: 'Screenshot captured successfully!',
      screenshot: `data:image/png;base64,${screenshot}` // Return the screenshot as base64
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to capture screenshot', error: error.toString() });
  } finally {
    await browser.close();
  }
};
