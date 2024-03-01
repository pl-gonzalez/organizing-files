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
            }, 
             'Monitoramento'
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


export async function mainMenu() {
    const data = await inquirer.prompt(mainOptions);
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