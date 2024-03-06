import fs from 'fs-extra'
import chalk from 'chalk'
import jsonfile from 'jsonfile'
import path from 'path';

import tagsJson from './data/tags.json' assert { type: 'json' };
import { moveDocumentos } from './arquivo_handler.js';
 
export async function listaTags(){
    tagsJson.forEach((tag) => {
        console.log(`${chalk.cyan('TAG:')}\t ${tag.tagName} \t\t\t ${chalk.cyan('Path:')}\t ${tag.tagPath}`)
    })
}

export async function adicionarTag(tagName, tagPath = ''){
    const tagsObj = {
        tagName,
        tagPath,
    }
    tagsJson.push(tagsObj)

    jsonfile.writeFile('./data/tags.json', tagsJson, { spaces: 2 }, function (err) {
        if (err) console.error(err)

        console.log(`TAG adicionada. ${chalk.cyan('TAG:')}${tagName} \t ${chalk.cyan('Path:')}${tagPath}`)
      })
}

export async function removerTag(tagRemovida){

    const index = tagsJson.findIndex((tag) => tag.tagName == tagRemovida)
    if(index !== -1) {
        tagsJson.splice(index, 1)
    }

    jsonfile.writeFile('./data/tags.json', tagsJson, { spaces: 2 }, function (err) {
        if (err) console.error(err)

        console.log(`TAG removida. ${chalk.cyan('TAG:')}${tagRemovida}`)
      })
}



export async function organizarPorTags(caminho) {
    
    try {
        /**
         * Verificar se existe uma tag em cada arquivo 
         */
        let listaArquivos = await fs.readdir(caminho, {
            withFileTypes: true
        })
        
        
        listaArquivos.forEach((arquivo) => {
            let nomeArquivo = path.parse(`${caminho}/${arquivo.name}`)

            if(nomeArquivo.ext !== '')
                tagsJson.forEach(async (tag) => {
                    if(nomeArquivo.name.includes(tag.tagName)){
                        // console.log(tag.tagPath, `${caminho}/${nomeArquivo}`)
                        const nomeArquivoSemTag = nomeArquivo.base.replace(`${tag.tagName} `, '')
                        await moveDocumentos(`${caminho}/${nomeArquivo.base}`, `${tag.tagPath}/${nomeArquivoSemTag}`)
                        console.log('Arquivos com TAG foram movidos')
                    }
                    
                });
                
        });
    } catch (error) {
        console.log(error)
    }
}