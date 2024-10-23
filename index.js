const puppeteer = require('puppeteer');

exports.handler = async (event) => {
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.goto('https://example1.com');

    const screenshotBuffer = await page.screenshot({ encoding: 'binary' });

    await browser.close();

    return {
      statusCode: 200,
      body: screenshotBuffer.toString('base64'),
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': 'attachment; filename="screenshot.png"',
      },
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
