import fs from 'fs-extra';

import { organizarArquivos } from "./arquivo_handler.js"
import { organizarPorTags } from './tag_handler.js';

export async function organizarDiretorio(caminho, aplicarTags) {
  if(aplicarTags) await organizarPorTags(caminho);
  
  try {
    await fs.ensureDir(`${caminho}/Documentos`)
    await fs.ensureDir(`${caminho}/Imagens`)
    await fs.ensureDir(`${caminho}/Arquivos compactados`) 
    await fs.ensureDir(`${caminho}/Instaladores e executáveis`)

    // Ler e separar arquivos
    await organizarArquivos(caminho);

  } catch (err) {
    console.error(err)
  }
}