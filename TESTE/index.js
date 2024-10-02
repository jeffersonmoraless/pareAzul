



/*

(async () => {
    const browser = await puppeteer.launch({});
    const page = await browser.newPage();
    
    const url = `https://portal.cfm.org.br/busca-medicos/`;

const search = {
    medico: '10193',
    uf: 'PR'
}

    await page.goto(url);

    await page.waitForSelector('form#buscaForm');
    await page.type('form#buscaForm .col-md-3 .form-group .form-control[name="crm"]', search.medico);
    await page.select('form#buscaForm .col-md-3 .form-group #uf', search.uf);

    await page.evaluate(() => {
        document.querySelector('form#buscaForm button[type="submit"]').click();
    });
    console.log('até aqui veio')

    await page.waitForSelector('.card-body');

    const medico = await page.evaluate(() => {
        let nome = document.querySelector('.card-body h4').textContent;

        let crm = {};

        document.querySelectorAll('.card-body .row .col-md-4').forEach((item) => {
            let [chave, valor] = item.textContent.split(':');
            crm[chave.trim()] = valor.trim();
        });

        let arrayEspecialidade = document.querySelectorAll('.card-body .row .col-md-12');
        let especialidade;

        arrayEspecialidade.forEach((item, i) => {
            if ("Especialidades/Áreas de Atuação:".trim().toLowerCase() === item.textContent.trim().toLowerCase()) {
                especialidade = arrayEspecialidade[i + 1].textContent;
            }
        });

        let [chave, valor] = document.querySelector('.card-body .row .col-md').textContent.split(':');
        let situacao = valor.trim();

        return data = {
            nome: nome,
            crm: crm,
            'Especialidades/Áreas de Atuação': especialidade,
            situacao: situacao
        }
    })

    console.log(medico);
    await browser.close();
})();*/
//importando puppeteer;
const puppeteer = require('puppeteer');

console.log('Rodando ...');



(async () => {

    //url que o navegador irá acessar;
 const url = `https://motorista.pareazul.com.br/login`
  
 //termo de busca;
 const search ={
        telefone:'Telefone',
        celular:'45999523790',
        usuario:'10193',
        senha:'Ana#170607',
        cidade:'Campo Mourão',
 }
 

  //inicializa o navegador   parametro {headless:false} mostra navegador true não mostra;
  const browser = await puppeteer.launch({headless:false});
  
  //cria uma nova pagina;
  const page = await browser.newPage();
  
  //redireciona para pagina desejada;
  await page.goto(url);
  await page.type('#telefone', '(45) 9 9952-3790', { delay: 100 });

  // Preenche o campo "Senha"
  await page.type('#senha', 'Ana#170607', { delay: 100 });

  // Seleciona o valor para o campo "Prefeitura"
  await page.waitForSelector('.ant-select-selector');
  await page.select('.ant-select-selector', 'Campo Mourão');
/*
  const selectedCity = await page.$eval('.ant-select-selection-item', element => element.textContent);
  console.log('Selected City:', selectedCity);
  /*await page.click('#prefeitura'); // Clica no campo para abrir o dropdown
  await page.waitForSelector('.ant-select-item'); // Espera o dropdown abrir
  await page.evaluate(() => {
    const elements = Array.from(document.querySelectorAll('.ant-select-item'));
    const targetElement = elements.find(el => el.textContent.trim() === 'Campo Mourão');
    if (targetElement) {
      targetElement.click();
    }
  });
  */

  // Clica no botão "Entrar"
 // await page.click('button[type="submit"]');
  
  /*
  //aguarda carregar o seletor indicado para não dar erro de seletor não encontrado; 
  await page.waitForSelector('form#buscaForm');

  //prenche o input do seletor indicado cujo nome seja 'crm', prenche com o valor que é passado após a virgula;
  await page.type('form#buscaForm .col-md-3 .form-group .form-control[name="crm"]', search.medico);
  
  await page.waitForSelector('form#buscaForm #uf');
  //seleciona o valor do select cujo id seja 'uf'seleciona o valor que é passado após a virgula por parametro; 
  await page.select('form#buscaForm .col-md-3 .form-group #uf', search.uf);
  
  //função evaluate para simular o console do navegador;
  await page.evaluate(() => {
    
    //selecionar o seletor do button cujo type seja 'submit'
    //e dispara um click com a função click(); 
    document.querySelector('form#buscaForm button[type="submit"]').click();
  });
  console.log('até aqui veio')
  //aguarda carregar o seletor indicado para não dar erro de seletor não encontrado;  
  await page.waitForSelector('.card-body');
  
  //função evaluate para simular o console do navegador e retorna para variavel medico;  
  const medico = await page.evaluate(() => {
    
    //seleciona o seletor desejado e atribui seu conteudo a variavel nome;
    let nome = document.querySelector('.card-body h4').textContent;
    
    // cria um objeto vazio com nome crm;
    let crm={};

    //seleciona todos seletores que tenha a class 'col-md-4' e percorre um a um com 
    //a função forEach; 
    document.querySelectorAll('.card-body .row .col-md-4').forEach((item) =>{
        //separa o conteudo de cada seletor com função split()passando por 
        //parametro o delimitador que neste caso é ':', e salva num array
        //onde a primeira parte do conteudo sera armazenado em posição 
        //chave e a segunda na posição valor; 
        let [chave, valor] = item.textContent.split(':');
        
        //atribui a posição chave do array a objeto crm{} que foi criado logo
        //acima como chave do objeto e a posição valor como valor da chave; 
        crm[chave.trim()] = valor.trim();
    
    });

    //seleciona todos seletores que tenha a class 'col-md-12' e atribui a uma variavel de array;
    let arrayEspecialidade = document.querySelectorAll('.card-body .row .col-md-12');
    
    //cria a variavel especialidade;
    let especialidade; 

    //percorre ao array de arrayEspecialidade posição a posição; 
    arrayEspecialidade.forEach((item,i)=>{
    //tira todo espaço to texto com função trim() e transforma todo em letras minusculas com toLowerCase()
    //e verifica e o texto é igual ao conteudo dentro do seletor item.  
    if("Especialidades/Áreas de Atuação:".trim().toLowerCase() === item.textContent.trim().toLowerCase()){
          
          // se for igual,sera atribuido avariavel especialidade o conteudo do seletor item na posição i + 1 
          //pois queremos pegar apenas oconteudo subsequente ao conteudo "Especialidades/Áreas de Atuação:"; 
          especialidade = arrayEspecialidade[i+1].textContent
      }
    });
    
    //seleciona o seletor que tenha a class 'col-md' e separa o conteudo com a função split(':')
    //passa porparametro ':' que é o delimitador, e atribui a um array na posição valor;
    let[chave,valor]=document.querySelector('.card-body .row .col-md').textContent.split(':');
    
    //atribui o conteudo do array na posição valor retirando todo os caracteres vazios a
    //variavel situação; 
    situacao = valor.trim();
    
    //aqui retorna todas as minhas variaveis no formato de um objeto que será 
    //atribuido a variavel medico;
    return data={
      nome:nome,
      crm:crm,
      'Especialidades/Áreas de Atuação':especialidade,
      situacao:situacao
    }
  })
  
  console.log(medico);
  */
  //fecha o navegador;  
 // await browser.close();
})();



/*url video: https://www.youtube.com/watch?v=SkvTMxP5WUQ
7 minutos 54 segundos
*/