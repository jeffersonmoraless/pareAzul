const  puppeteer = require("puppeteer");

console.log('my function');

(async()=>{
    console.log("init")
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.mercadolivre.com.br/')

    

    

    
})();