(async()=>{

    if(___grecaptcha_cfg !== undefined){
        
        return Object.entries(___grecaptcha_cfg.clients).map(([id_client,dados_client])=>{

            // Assume-se que clientes com ID >= 10000 são reCAPTCHA V3, enquanto IDs menores são reCAPTCHA V2.
            // Esta lógica pode ser baseada em observações específicas ou documentação interna.
            const data ={id:id_client , versao: id_client >= 10000 ? 'v3': 'v2'};

            const objects = Object.entries(dados_client).filter(([ _ , value])=> value && typeof value === 'object');
                                                            
        }) 

    } 
})()