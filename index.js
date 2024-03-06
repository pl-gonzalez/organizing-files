import { introMsg } from './msg_figlet.js';
import { mainMenu, pasta, tagMenu } from './menu.js';
import { organizarDiretorio } from './diretorio_handler.js';



await introMsg("File  Organizer")


while(true) {

    switch(await mainMenu()){
    
        case 'ORGANIZAR_PASTA_ATUAL':
            await organizarDiretorio()
            
            break;

        case 'ORGANIZAR_PASTA':
            let caminho = await pasta()
            await organizarDiretorio(caminho)
            break;
    
        case 'TAG': 
            await tagMenu()
            break;
            
        case 'EXIT':
            process.exit(0)

        default:
            // console.log('default')
            break;

    }
}
                
                