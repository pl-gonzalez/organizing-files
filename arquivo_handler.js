import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path'; // Outros OS tem a barra invertida. path lida com isso




const extDocumentos = ['.xlsx', '.pdf', '.docx']
const extImagens = ['.jpeg', '.png']
const extCompactos = ['.zip']
const extExecutaveis = ['.exe']


export async function organizarArquivos(caminho){
    try {
        let listaArquivos = await fs.readdir(caminho)
        // console.log(listaArquivos)
        listaArquivos.forEach(async (arquivo) => {
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

export async function moveDocumentos(origem, destino){
    try {
      await fs.move(origem, destino, {
        overwrite: true
      })
      console.log(`${path.parse(origem).name} ${chalk.green('MOVIDO PARA')} ${chalk.cyan(destino)}`)
    } catch (err) {
      console.error(err)
    }
  }

