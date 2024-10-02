const buscarMedico = require('./index4');
console.log("rodou!!!");

const search ={
    medico:`10193`,
    uf:'PR'
}  

async function main(){

    const dados = await buscarMedico(search.medico,search.uf);
    
    console.log(dados);
}

main();

/*
let texto = 'CRM: 10193-PR';
texto = texto.split(':');
let obj ={};

obj[texto[0]] = texto[1].trim();

console.log('objeto:',obj);

console.log('convertido stringfy: ',newTexto);

let texto2 =JSON.parse(newTexto)

/*
console.log('convertido parse: ',texto2.crm);
let texto = ['Inscrições em outro estado:','Especialidades/Áreas de Atuação:','CARDIOLOGIA - RQE Nº: 16610','Visto(s) Provisório(s) ativo(s):'];
//console.log(texto);
console.log('array',texto);

let obj ={};
let Especialidade;
texto.forEach((item ,i)=> {
    if('Especialidades/Áreas de Atuação:' === item){
        
        Especialidade=texto[i+1];
    }
});
console.log(Especialidade)

*/

/*let nova = texto.map(item=>{
    let [chave,valor]=item.split(':');

    obj[chave]=valor.trim();

    return obj

}) 
console.log(nova);

/*texto.forEach(e=>{
    
   
    
let newText = e.split(':');
    console.log(e)
    obj[newText[0]] = newText[1].trim();
    /*console.log('posição '+[i]+': ',e);
    i++;
})

//console.log('objeto',);


[
    { CRM: "10193-PR" },
    { Data de Inscrição: "23/04/1986" },
    { Primeira inscrição na UF: "23/04/1986" }
]
*/

