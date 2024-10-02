const puppeteer = require('puppeteer');
const request = require('request');
const {chave} =require('./config')



async function sleep(seg){
    return new Promise((resolve,reject)=>{
        setTimeout(function(){
            resolve();
        },seg * 1000);
    });
}

async function curl(options){
    return new Promise((resolve,reject)=>{
        request(options,(err,res,body)=>{
            if(err){
                return reject(err);
            }
            resolve(body);
        })
    })
}

async function resolve_captcha(site_key, site_url){
    return new Promise(async (resolve,reject)=>{
        let url =`https://2captcha.com/in.php?key=${chave}&json=true&method=userrecaptcha&googlekey=${site_key}&pageurl=${site_url}`
        let resposta = await curl({
            url:url,
            method:'GET'
        });

        try{
            resposta = JSON.parse(resposta);
            if(resposta.status != 1 ){
                return reject("falha ao obter o ID do captcha!!!")
            }
            let captcha_id = resposta.request;
            
            while(true){
                await sleep(15);
                console.log("verificando se o captcha esta pronto");
                let resposta2 = await curl({
                    url:`https://2captcha.com/res.php?key=${chave}&action=get&id=${captcha_id}&json=true`,
                    method:'GET'
                });
                resposta2 = JSON.parse(resposta2);
                console.log(resposta2);
                
                if(resposta2.status == 1){
                    return resolve(resposta2.request);
                }
                
            }
                //console.log(resposta)
        }catch(e){
            console.log(e);
            reject(e);
        }
        

    })
        
}

/*async function run(){
    let site_url = 'https://google.com/recaptcha/api2/demo'
    let site_key = '6Le-wvkSAAAAAPBMRTvw0Q4Muexq9bi0DJwx_mJ-'
    let token = await resolve_captcha(site_key,site_url);
    //console.log(token)

    const browser = await puppeteer.launch({headless:false});
    //let token = "este é meu token atualizado comsucesso"
    const page = await browser.newPage();

    await page.goto('https://google.com/recaptcha/api2/demo');
    
    let navigation_promise = page.waitForNavigation();
    
    await page.evaluate((token)=>{
        document.getElementById('g-recaptcha-response').innerHTML=token;
        document.getElementById('g-recaptcha-response').style.display ='';
        document.getElementById('recaptcha-demo-submit').click();
    }, token)
    
    await navigation_promise;

}
*/
async function run(){
    let site_url = 'https://motorista.pareazul.com.br/login'
    let site_key = '6LfrvJ0UAAAAAOyGHByGEUGg3sYJTx6BubITsWy8'
    let token = await resolve_captcha(site_key,site_url);
    //console.log(token)

    const browser = await puppeteer.launch({headless:false});
    //let token = "este é meu token atualizado comsucesso"
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
    await sleep(2.5)
    
        // Esperar pelo iframe do reCAPTCHA
    const recaptchaFrame = await page.waitForSelector('iframe[src*="recaptcha"]');
    
    const frame = await recaptchaFrame.contentFrame();
    // Esperar o checkbox do reCAPTCHA estar disponível
    const recaptchaCheckbox = await frame.waitForSelector('.recaptcha-checkbox-border');
    //await recaptchaCheckbox.click();

    //const recaptchaCheckbox = await frame.waitForSelector('.recaptcha-checkbox-border');

    

    //let token ="aqui esta o token ativado"
    //let navigation_promise = page.waitForNavigation();
    await sleep(2.5)
    await page.evaluate((token)=>{
            document.getElementById('g-recaptcha-response').innerHTML=token;
            document.getElementById('g-recaptcha-response').style.display='';
            //document.getElementById('recaptcha-demo-submit').click();
    },token)
    
    //await sleep(2.5)
    //await recaptchaCheckbox.click();
    //await navigation_promise;

}
run();

