const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const render = require("./lib/htmlRenderer");
let employeesArr = []

const validateEmail = (email) => {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
}

const validateName = (name) => {
    return name !== '' || "Please enter a name"
}

const validateID = (id) => {
    const reg = /^\d+$/;
    return reg.test(id) || "ID should be a number!";
}

const validatePhoneNumber = (id) => {
    const reg = /^\d+$/;
    return reg.test(id) || "Phone Number should be a number!";
}

console.log('Please build your team: ')
const userInput = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'ManagerName',
            message: 'Please enter the Managers name',
            default: 'Annisa',
            validate: validateName
        },
        {
            type: 'number',
            name: 'ManagerID',
            message: 'Please enter the Managers id',
            default: '006',
            validate: validateID
        },
        {
            type: 'input',
            name: 'ManagerEmail',
            message: 'Please enter the Managers email',
            default: 'a.purbandari@gmail.com',
            validate: validateEmail
        },
        {
            type: 'number',
            name: 'OfficeNumber',
            message: 'Please enter the Manager office number',
            default: '123456789',
            validate: validatePhoneNumber
        },
        {
            type: 'list',
            name: 'EmployeeType',
            message: 'Please choose a team member you would like to add',
            choices: ['Engineer', 'Intern', 'I do not want to add more team members.']
        },


    ]).then((answers) => {
        const manager = new Manager(answers.ManagerName, answers.ManagerID, answers.ManagerEmail, answers.OfficeNumber)
        employeesArr.push(manager)

        if (answers.EmployeeType === "Engineer") {
            engineerAnswer()
        }
        else if (answers.EmployeeType === "Intern") {
            internAnswer()
        }
        else {
            fs.writeFile("team.html", render(employeesArr), function (err) {
                if (err) throw err
                console.log("Only the Manager is listed.")
            })
        }
    });
};

function resume() {

    inquirer.prompt([
        {
            type: 'list',
            name: 'EmployeeType',
            message: 'Which type of team member would you like to add?',
            choices: ['Engineer', 'Intern', 'I do not want to add more team members.']
        }
    ]).then(answers => {

        if (answers.EmployeeType === "Engineer") {
            engineerAnswer()
        }
        else if (answers.EmployeeType === "Intern") {
            internAnswer()
        }
        else {
            fs.writeFile("team.html", render(employeesArr), function (err) {

                if (err) throw err

                console.log("Your Html has been rendered, please look for the team.html file.");
            })
        }
    })
}

const internAnswer = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'internname',
            message: 'Please type intern name',
            default: 'Alvaro',
            validate: validateName
        },
        {
            type: 'number',
            name: 'internid',
            message: 'Please type intern ID',
            default: '010',
            validate: validateID
        },
        {
            type: 'input',
            name: 'internemail',
            message: 'Please type intern email address',
            default: 'alvaro.b.budiman@gmail.com',
            validate: validateEmail
        },
        {
            type: 'input',
            name: 'internschool',
            message: 'What school is the Intern attending?',
            default: 'University of Sydney',
        },
    ]).then((answers) => {

        const intern = new Intern(answers.internname, answers.internid, answers.internemail, answers.internschool)
        employeesArr.push(intern)
        resume()
    });
}

const engineerAnswer = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'engineername',
            message: 'Please type engineering name',
            default: 'Joulmer',
            validate: validateName
        },
        {
            type: 'number',
            name: 'engineerid',
            message: 'Please type engineering ID',
            default: '020',
            validate: validateID
        },
        {
            type: 'input',
            name: 'engineeremail',
            message: 'What is the Engineers email address?',
            default: 'joulmer@gmail.com',
            validate: validateEmail
        },
        {
            type: 'input',
            name: 'engineerGithub',
            message: 'Please type engineering GitHub username',
            default: 'joulmer'
        },
    ]).then((answers) => {

        const engineer = new Engineer(answers.engineername, answers.engineerid, answers.engineeremail, answers.engineerGithub)
        employeesArr.push(engineer)
        resume()
    });
}


userInput();
