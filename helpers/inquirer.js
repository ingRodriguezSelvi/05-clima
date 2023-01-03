import * as colors from "colors";
import inquirer from "inquirer";

const questions = [
    {
        type: 'list',
        name: 'option',
        message: '¿ Que desea hacer ?',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Buscar ciudad`
            },
            {
                value: 2,
                name: `${'2.'.green} Historial`
            },
            {
                value: 0,
                name: `${'0.'.green} Salir`
            }
        ]
    }
];

const questionsPause = [
    {
        type: 'input',
        name: 'pause',
        message: `Pulsa ${'Enter'.green} para continuar \n`,
    }
]
export const inquirerMenu = async () => {
    console.log('========================'.green);
    console.log(' Seleccione una opcion '.green);
    console.log('========================'.green);

    const {option} = await inquirer.prompt(questions);
    return option

}
export const pause = async () => {
    console.log('\n');
    return inquirer.prompt(questionsPause).then();
}

export const readInput = async (message = '') => {
    const question = [{
        type: 'input',
        name: 'desc',
        message,
        validate(value) {
            if (value.length === 0) {
                return 'Por favor ingrese un valor'
            }
            return true;
        }
    }]

    const {desc} = await inquirer.prompt(question);
    return desc;
}

export const listCities = async (cities = []) => {
    const choices = cities.map((city, index) => {
        return {
            value: city.id,
            name: `${index + 1}. ${city.name}`
        }
    });
    choices.push({
        value: 0,
        name: '0.'.green + 'Cancelar'
    })
    const questionsDelete = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione una ciudad',
            choices
        }
    ];
    const {id} = await inquirer.prompt(questionsDelete);
    return id
}

export const listTaskForCheck = async (task = []) => {
    const choices = task.map((task, index) => {
        return {
            value: task.id,
            name: `${index + 1}. ${task.desc}`,
            checked: !!(task.completedDate)
        }
    });
    const questionsDelete = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ];
    const {ids} = await inquirer.prompt(questionsDelete);
    return ids;
}

export const confirm = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const {ok} = await inquirer.prompt(question);
    return ok;
}


