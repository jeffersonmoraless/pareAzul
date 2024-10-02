const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://motorista.pareazul.com.br/login');

  // Move o mouse para a posição (x, y) na página
  await page.mouse.move(500, 500);

  //await browser.close();
})();