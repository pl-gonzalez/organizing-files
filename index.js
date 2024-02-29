import fs from 'fs-extra';
import path from 'path'; // Outros OS tem a barra invertida. path lida com isso
import inquirer from 'inquirer';
import figlet from 'figlet';
import chalk from 'chalk';
import gradient from 'gradient-string'
const mainOptions = [
    {
        type: 'list',
        name: 'main',
        message: 'File organizer - O que deseja fazer?',
        choices: [
            {
                name: 'Organizar pasta atual',
                value: 'ORGANIZAR_PASTA_ATUAL'
            },
            {
                name: 'Organizar uma pasta',
                value: 'ORGANIZAR_PASTA'
            }, 
            'TAGs',
             'Monitoramento'
            ]
    }
]

const pastaPath = [
    {
        type: 'input',
        name: 'pasta',
        message: 'Organizar pasta atual',
        validate: async (input) => {
            try{
                fs.lstatSync(input).isDirectory()
                return true;
            } catch (error) {
                console.log('Insira um caminho valido!');
                return false;
            }
        }
    }
]

const extDocumentos = ['.xlsx', '.pdf', '.docx']
const extImagens = ['.jpeg', '.png']
const extCompactos = ['.zip']
const extExecutaveis = ['.exe']

const timer = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

async function mainMenu() {
    const data = await inquirer.prompt(mainOptions);
    return data.main
}

async function folderMenu() {
    const data = await inquirer.prompt(pastaPath);
    return data.pasta 
}

async function organizarDiretorio(caminho) {

    try {
        await fs.ensureDir(`${caminho}/Documentos`)
        await fs.ensureDir(`${caminho}/Imagens`)
        await fs.ensureDir(`${caminho}/Arquivos compactados`)     // Ao executar, percebeu que ja existe uma pasta com esse nome, ignorando caixa alta
        await fs.ensureDir(`${caminho}/Instaladores e executáveis`)
        
        // Ler e separar arquivos
        await organizarArquivos(caminho);

      } catch (err) {
        console.error(err)
      }
}

async function organizarArquivos(caminho){
    try {
        let nomeArq = await fs.readdir(caminho)
        console.log(nomeArq)
        nomeArq.forEach(async (arquivo) => {
            let extArquivo = path.extname(arquivo)
            
            // Se a extensão do arquivo for do tipo Documento
            if(extDocumentos.includes(extArquivo)){             // .PDF -> extensoes com letra maiscula nao soa reconhecidas
                await moveDocumentos(`${caminho}/${arquivo}`, `${caminho}/Documentos/${arquivo}`)
            }
            // Se a extensao do arquivo for do tipo Imagem
            if(extImagens.includes(extArquivo)){
                moveDocumentos(`${caminho}/${arquivo}`, `${caminho}/Imagens/${arquivo}`)
            }
            // Se a extensao do arquivo for do tipo Arq. compactado
            if(extCompactos.includes(extArquivo)){
                moveDocumentos(`${caminho}/${arquivo}`, `${caminho}/Arquivos compactados/${arquivo}`)
            }
            // Se a extensao do arquivo for do tipo Instaladores/Executaveis
            if(extExecutaveis.includes(extArquivo)){
                moveDocumentos(`${caminho}/${arquivo}`, `${caminho}/Instaladores e executáveis/${arquivo}`)
            }
        })

        console.log('Arquivos organizados em pastas Padrao')
        
    } catch (error) {
        console.log('deu ruim listar arquivos', error)
    }  
}

async function moveDocumentos(origem, destino){
    try {
      await fs.move(origem, destino)
      console.log(`${path.parse(origem).name} ${chalk.green('MOVIDO PARA')} ${chalk.cyan(destino)}`)
    } catch (err) {
      console.error(err)
    }
  }




async function introMsg(msg){
    figlet(msg, function (err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(gradient('pink', 'cyan')(data))
    });
    await timer();
    console.log('\n\n')
}


await introMsg("Files  Organizer")
/**
 * Opcoes do menu:
 *      - Organizar uma pasta
 *      - TAGs
 *      - Monitorar pasta
 */


switch(await mainMenu()){
    case 'ORGANIZAR_PASTA':
        let folder_Options = await folderMenu()
        if(folder_Options != null) await organizarDiretorio(folder_Options) // Aqui ja tenho o caminho da pasta
        break;
    case 'ORGANIZAR_PASTA_ATUAL':
        await organizarDiretorio('./pasta atual')
        break;
}



























// disposita
// const src = './files/teste.txt'
// const dest = './test_folder/imagens/server2.js'

// // With async/await:
// async function example (src, dest) {
//     try {
//       await fs.move(src, dest)
//       console.log('success!')
//     } catch (err) {
//       console.error(err)
//     }
//   }
  
//   example(src, dest)

// Nao confirma existencia do arquivo, apenas retorna oq seria o arquivo na string do path
//   const pathName = path.parse('/test_folder/imagens/img-server2.js').name
//   const tag = pathName.substring(0, 3)
//   console.log(tag, pathName)
// const chokidar = require('chokidar');

// // One-liner for current directory
// chokidar.watch('./*.js').on('all', (event, path) => {
//   console.log(event, path);
// });

// Essa função, retorna os nomes do arquivos existentes
// function getCurrentFilenames() {
//     console.log("Current filenames:");
//     let fileName = fs.readdirSync(__dirname)
//         .filter(file => file == 'index.js')

//         console.log(fileName)
// }