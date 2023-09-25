const question = require('./questions/question');
const inquirer = require('inquirer');

function init() {
  inquirer.prompt(question.askQuestion(question.createList)).then( answers => {
    console.log(answers);
  }) 
}

init();