import inquirer from 'inquirer';
import fs from "fs-extra"
import tagsJson from './data/tags.json' assert { type: 'json' };
    


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
            {
                name: 'TAGs',
                value: 'TAG'
            },{
                name: 'Monitoramento',
                value: 'MONITORAMENTO'
            },
            {
                name: 'Sair',
                value: 'EXIT'
            }
            ]
    }
]

const tagOptions = [
    {
        type: 'list',
        name: 'tagMenu',
        message: 'Como iremos organizar hoje?',
        choices: [
            {
                name: 'Listar todas as TAGs',
                value: 'TAGS_REGISTRADAS'
            },
            {
                name: 'Adicionar TAG',
                value: 'ADICIONAR_TAG'
            },
            {
                name: 'Remover TAG',
                value: 'REMOVER_TAG'
            },
            {
                name: 'Sair',
                value: 'EXIT'
            }
            ]
    }
]

const pastaPath = [
    {
        type: 'input',
        name: 'pasta',
        message: 'Digite o caminho da pasta:  ',
        validate: async (input) => {
            try{
                fs.lstatSync(input).isDirectory()
                return true;
            } catch (error) {
                console.log('\nInsira um caminho valido!');
                return false;
            }
        }
    }
]
const tagAdicionada = [
    {
        type: 'input',
        name: 'tag',
        message: 'Digite a TAG que deseja adicionar:  ',
        validate: async (input) => {
            try {
                const tags = tagsJson.map((tag) => tag.tagName);
                if(!tags.includes(input)){
                    return true
                } else {
                    console.log("TAGs já existente")
                    return false
                }   
            } catch (error) {
                console.log(error)
                return false
            } 
       }
    }
]

const incluirTagOptions = [
    {
        type: 'confirm',
        name: 'aplicarTag',
        message: 'Aplicar filtro por TAGs cadastradas?   ',
        default: false
    }
]
const removerTagsOptions = [
    {
        type: 'rawlist',
        name: 'removerTag',
        message: 'Qual TAG deseja remover?   ',
        choices: async (input) => {
            let obj = [];
            tagsJson.forEach((tag) => {
                obj.push(
                {
                    name: `TAG: ${tag.tagName} \t | Diretório: ${tag.tagPath}`,
                    value: tag.tagName
                })
            })

            return [
                ...obj,
                
                {
                    name: 'Sair',
                    value: 'EXIT'
                }
            ]
        }
    }
]
const monitoramentoOptions = [
    {
        type: 'list',
        name: 'monitoramento',
        message: 'Monitoramento:   ',
        choices: [
            {
                name:'Pastas monitoradas',
                value: 'PASTAS_MONITORADAS'
            },
            {
                name:'Adicionar pasta ao monitoramento',
                value: 'ADICIONAR_PASTA'
            },
            {
                name:'Remover pasta do monitoramento',
                value: 'REMOVER_PASTA'
            }
        ]
    }
]


export async function mainMenu() {
    const data = await inquirer.prompt(mainOptions);
    console.log('main menu:', data.main)
    return data.main
}

export async function pasta() {
    const data = await inquirer.prompt(pastaPath);
    return data.pasta 
}
export async function tag() {
    const data = await inquirer.prompt(tagAdicionada);
    return data.tag 
}

export async function tagMenu() {
    const data = await inquirer.prompt(tagOptions);
    return data.tagMenu 
}

export async function incluirTags() {
    const data = await inquirer.prompt(incluirTagOptions);
    return data.aplicarTag 
}

export async function removerTagMenu() {
    const data = await inquirer.prompt(removerTagsOptions);
    return data.removerTag 
}

export async function monitoramento(){
    const data = await inquirer.prompt(monitoramentoOptions);
    return data.monitoramento 
}
