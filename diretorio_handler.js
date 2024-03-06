import fs from 'fs-extra';

import { organizarArquivos } from "./arquivo_handler.js"
import { organizarPorTags } from './tag_handler.js';

import { incluirTags } from './menu.js';

export async function organizarDiretorio(caminho = '../') {
    
  if(await incluirTags()) await organizarPorTags(caminho);
  
  try {
    await fs.ensureDir(`${caminho}/Documentos`)
    await fs.ensureDir(`${caminho}/Imagens`)
    await fs.ensureDir(`${caminho}/Arquivos compactados`) 
    await fs.ensureDir(`${caminho}/Executáveis`)

    // Ler e separar arquivos
    await organizarArquivos(caminho);

  } catch (err) {
    console.error(err)
  }
}