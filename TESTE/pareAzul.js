//const puppeteer = require ('puppeteer')

const puppeteer = require('puppeteer');
function esperar(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async()=>{
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://motorista.pareazul.com.br/login');
    await page.waitForSelector('.ant-select-selector')
    const selects = await page.$$('.ant-select-selector');
    let delay = 200;
    
    //await page.click('.ant-select-selector');
    await selects[0].click();
    
    await page.waitForSelector('.ant-select-item')
    const formas = await page.$$('.ant-select-item');
    const opcaoSelecionar = "CPF";
    setTimeout(async()=>{
      for( let opcao of formas){
        const text = await page.evaluate(el=> el.textContent, opcao);
        if (text.trim() === opcaoSelecionar){
          await opcao.click();
          break;
        }
      }  
    },3000)
    
    await page.waitForSelector('#cpf')
    await page.type('#cpf','05896964919',{delay:200});
    
    await page.waitForSelector('#senha')
    await page.type('#senha','Ana#170607',{delay:150});
    
    await page.waitForSelector('#senha')
    await selects[1].click();

   
    await page.waitForSelector('.ant-select-item')
      const cidades = await page.$$('.ant-select-item');
      const cidadeSelecionar = "Campo Mourão";
    for ( let cidade of cidades){
      const textCidade = await page.evaluate(el=>el.textContent, cidade);
      if (textCidade.trim() === cidadeSelecionar){
         await cidade.click();
         break;
      }
    } 
    

    await page.click('button.ant-btn.ant-btn-primary.btn-form')
    setTimeout(async()=>{
        // Esperar pelo iframe do reCAPTCHA
    const recaptchaFrame = await page.waitForSelector('iframe[src*="recaptcha"]');
    
    const frame = await recaptchaFrame.contentFrame();

    // Esperar o checkbox do reCAPTCHA estar disponível
    const recaptchaCheckbox = await frame.waitForSelector('.recaptcha-checkbox-border');
   
    //await recaptchaCheckbox.click();    
    },5000)
    
    

   
    //await esperar(5000);
   /* await page.evaluate(async()=>{
      const captcha = document.getElementsByClassName('recaptcha-checkbox-border') 
      setTimeout(()=>{
        console.log('XXXX',captcha)
      },10000)
      
      
    })
   
*/    

    //src="https://www.google.com/recaptcha/api2/anchor?ar=1&k=6LfrvJ0UAAAAAOyGHByGEUGg3sYJTx6BubITsWy8&co=aHR0cHM6Ly9tb3RvcmlzdGEucGFyZWF6dWwuY29tLmJyOjQ0Mw..&hl=pt-PT&type=image&v=rKbTvxTxwcw5VqzrtN-ICwWt&theme=light&size=normal&badge=bottomright&cb=n2894yxky5ci"
    //await page.click('.recaptcha-checkbox-border')
    
    https://www.google.com/recaptcha/api2/anchor?ar=1&k=6LfrvJ0UAAAAAOyGHByGEUGg3sYJTx6BubITsWy8&co=aHR0cHM6Ly9tb3RvcmlzdGEucGFyZWF6dWwuY29tLmJyOjQ0Mw..&hl=pt-BR&type=image&v=rKbTvxTxwcw5VqzrtN-ICwWt&theme=light&size=normal&badge=bottomright&cb=qd6liaewnd94
})();


/*

const puppeteer = require('puppeteer');

function esperar(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://motorista.pareazul.com.br/login');

    // Esperar e clicar no seletor de opções
    await page.waitForSelector('.ant-select-selector');
    const selects = await page.$$('.ant-select-selector');
    await selects[0].click();
    
    // Esperar e selecionar a opção
    await page.waitForSelector('.ant-select-item');
    const formas = await page.$$('.ant-select-item');
    const opcaoSelecionar = "CPF";
    for (let opcao of formas) {
        const text = await page.evaluate(el => el.textContent, opcao);
        if (text.trim() === opcaoSelecionar) {
            await opcao.click();
            break;
        }
    }
    
    // Preencher CPF e senha
    await page.waitForSelector('#cpf');
    await page.type('#cpf', '05896964919');
    
    await page.waitForSelector('#senha');
    await page.type('#senha', 'Ana#170607');
    
    // Selecionar cidade
    await page.waitForSelector('.ant-select-selector');
    await selects[1].click();
    
    await page.waitForSelector('.ant-select-item');
    const cidades = await page.$$('.ant-select-item');
    const cidadeSelecionar = "Campo Mourão";
    for (let cidade of cidades) {
        const textCidade = await page.evaluate(el => el.textContent, cidade);
        if (textCidade.trim() === cidadeSelecionar) {
            await cidade.click();
            break;
        }
    }
    
    // Clicar no botão de submit
    await page.click('button.ant-btn.ant-btn-primary.btn-form');
    
    // Esperar o reCAPTCHA carregar
    await esperar(5000);
    
    // Esperar pelo iframe do reCAPTCHA
    const recaptchaFrame = await page.waitForSelector('iframe[src*="recaptcha"]');
    const frame = await recaptchaFrame.contentFrame();

    // Esperar o checkbox do reCAPTCHA estar disponível
    const recaptchaCheckbox = await frame.waitForSelector('.recaptcha-checkbox-border');
    await recaptchaCheckbox.click();

    
    // Obter a posição do reCAPTCHA checkbox
    const box = await recaptchaCheckbox.boundingBox();

    // Função para mover o mouse suavemente
    async function moveMouseSmoothly(page, startX, startY, endX, endY, steps = 50) {
      const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
      for (let i = 0; i <= steps; i++) {
        let x = startX + ((endX - startX) * i) / steps;
        let y = startY + ((endY - startY) * i) / steps;
        await page.mouse.move(x, y);
        await sleep(50); // Ajuste o tempo de atraso conforme necessário
      }
    }

    // Mover o mouse até a posição do reCAPTCHA checkbox
    await moveMouseSmoothly(page, 0, 0, box.x + box.width / 2, box.y + box.height / 2);

    // Clicar no reCAPTCHA checkbox
    await recaptchaCheckbox.click();

    // Fechar o navegador (remova este comando se quiser ver o resultado)
    // await browser.close();
})();*/