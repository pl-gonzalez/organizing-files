
import { introMsg } from './msg_figlet.js';
import { mainMenu, pasta, tagMenu, tag, incluirTags } from './menu.js';
import { organizarDiretorio } from './diretorio_handler.js';
import { listaTags, adicionarTag } from './tag_handler.js';



await introMsg("Files  Organizer")

/**
 * Opcoes do menu:
 *      - Organizar uma pasta
 *      - TAGs
 *      - Monitorar pasta
 */

let caminhoPasta;
let porTag;
switch(await mainMenu()){
    
    case 'ORGANIZAR_PASTA':
        caminhoPasta = await pasta()
        porTag = await incluirTags()

        if(caminhoPasta != null && porTag == false) await organizarDiretorio(caminhoPasta, porTag) // Aqui ja tenho o caminho da pasta
        else if(caminhoPasta != null && porTag == true) await organizarDiretorio(caminhoPasta, porTag)
        else console.log('Algum problema com o caminho')
        break;

    case 'ORGANIZAR_PASTA_ATUAL':
        await organizarDiretorio('./pasta atual')
        porTag = await incluirTags()

        if(porTag == true) await organizarDiretorio('./pasta atual', porTag)
        else await organizarDiretorio('./pasta atual', porTag)

        break;

    case 'TAG':
        let tagMenuOptions = await tagMenu()
        
        switch(tagMenuOptions){
            case 'TAGS_REGISTRADAS':
                // lista de tags registradas
                await listaTags()
                
                
                break;
            
            case 'ADICIONAR_TAG':
                let tagAdicionada = await tag()
                let caminhoPasta = await pasta()
                
                //Diretorio e tag ja validados no input em tag() e pasta()
                if(caminhoPasta != null) await adicionarTag(tagAdicionada, caminhoPasta)
                break;
        }
        break;
}
