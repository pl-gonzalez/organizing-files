
import { introMsg } from './msg_figlet.js';
import { mainMenu, pasta, tagMenu, tag, incluirTags, removerTagMenu, monitoramento } from './menu.js';
import { organizarDiretorio } from './diretorio_handler.js';
import { listaTags, adicionarTag, removerTag } from './tag_handler.js';





/**
 * Opcoes do menu:
 *      - Organizar uma pasta
 *      - TAGs
 *      - Monitorar pasta
 */


let caminhoPasta;
let porTag;
let exit = false

while(true) {
    await introMsg("Files  Organizer")

    switch(await mainMenu()){
    
        case 'ORGANIZAR_PASTA_ATUAL':
            await organizarDiretorio('./pasta atual')
            porTag = await incluirTags()
    
            if(porTag == true) await organizarDiretorio('./pasta atual', porTag)
            else await organizarDiretorio('./pasta atual', porTag)
            break;

        case 'ORGANIZAR_PASTA':
            caminhoPasta = await pasta()
            porTag = await incluirTags()
    
            if(caminhoPasta != null && porTag == false) await organizarDiretorio(caminhoPasta, porTag) // Aqui ja tenho o caminho da pasta
            else if(caminhoPasta != null && porTag == true) await organizarDiretorio(caminhoPasta, porTag)
            else console.log('Algum problema com o caminho')
            break;
    
        case 'EXIT':
            console.log("exit2")
            process.exit(0)
            break;

        case 'TAG':
            
            let tagMenuOptions = await tagMenu()
            let tagAdicionada;
            switch(tagMenuOptions){
                case 'TAGS_REGISTRADAS':
                    // lista de tags registradas
                    await listaTags()
                    
                    break;
                    
                case 'ADICIONAR_TAG':
                    tagAdicionada = await tag()
                    caminhoPasta = await pasta()
                    
                    //Diretorio e tag ja validados no input em tag() e pasta()
                    if(caminhoPasta != null) await adicionarTag(tagAdicionada, caminhoPasta)
                    break;
                
                case 'REMOVER_TAG':
                    const nomeTag = await removerTagMenu()
                    if(nomeTag == 'EXIT') process.exit(0)
                    await removerTag(nomeTag)
                    break;

                case 'EXIT':
                    console.log("exit1")
                    process.exit(0)
                    break;
                        
                }
        default:
            console.log('default')
            break;

        case 'MONITORAMENTO':
            let monitMenuOptions = await monitoramento()

            switch(monitMenuOptions){
                case 'PASTAS_MONITORADAS':
                    console.log('pastas monitoradas')
                    
                    break;
                    
                case 'ADICIONAR_PASTA':
                    console.log('adicionar pasta ao monitoramento')
                    break;
                
                case 'REMOVER_PASTA':
                    console.log('Revmoer pasta do monitoramento')
                    break;

                case 'EXIT':
                    console.log("exit1")
                    process.exit(0)
                    break;
                        
                }
    }
}
                
                