const puppeteer = require('puppeteer');

async function getCardDetailsAddress(url) {
  const browser = await puppeteer.launch({headless: 'new'});
  const page = await browser.newPage();
  
  try {
    await page.goto(url);
    await page.setRequestInterception(true);
    
    let result;
    
    const analysisPromise = new Promise((resolve) => {
      page.on('request', (request) => {
        if (request.resourceType() === 'xhr' || request.resourceType() === 'fetch') {
          const requestUrl = request.url();
          if (requestUrl.includes('card.wb.ru')) {
            result = requestUrl;
            resolve();
          }
        }
        request.continue();
      });
    });
    
    await page.waitForTimeout(1000);
    await analysisPromise;
    return result;
  } catch (error) {
    console.error('Ошибка при отслеживании XHR-адресов запросов:', error.message);
    throw error;
  } finally {
    await browser.close();
  }
}

module.exports = getCardDetailsAddress;



