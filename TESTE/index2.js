const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  await page.goto('http://sua-url-aqui.com');
  await page.waitForSelector('.busca-resultado');

  // Avalia a página para extrair os dados necessários
  const resultados = await page.evaluate(() => {
    const medicoElement = document.querySelector('.busca-resultado .resultado-item');
    
    // Extrair o nome do médico
    const nomeMedico = medicoElement.querySelector('h4').innerText.trim();
    
    // Extrair a situação
    const situacao = Array.from(medicoElement.querySelectorAll('.row .col-md'))
      .find(div => div.innerText.includes('Situação:'))
      .innerText.split(': ')[1].trim();
    
    // Extrair a data de inscrição
    const dataInscricao = Array.from(medicoElement.querySelectorAll('.row .col-md-4'))
      .find(div => div.innerText.includes('Data de Inscrição:'))
      .innerText.split(': ')[1].trim();
    
    // Extrair especialidades
    const especialidades = medicoElement.querySelector('.row.item_outro_estado + .row + .row .col-md-12').innerText.trim();
    
    return {
      nomeMedico,
      situacao,
      dataInscricao,
      especialidades
    };
  });

  console.log(resultados);

  await browser.close();
})();
