const question = require('./questions/questions');
const inquirer = require('inquirer');
const connection = require('./db/connection');


async function init() {
  const { choice } = await inquirer.prompt(question.askQuestion(question.createList));
  console.log(choice);
  switch (choice) {
    case 'View All Employees':
      viewAllEmployees();
      break;
    case 'Add Employee':
      addEmployee();
      break;
    case 'Update Employee Role':
      updateEmployeeRole();
      break;
    case 'View All Roles':
      viewAllRoles();
      break;
    case 'Add Role':
      addRole();
      break;
    case 'View All Departments':
      viewAllDepartments();
      break;
    case 'Add Department':
      addDepartment();
      break;
    default:
      console.log('Goodbye');
  }









  // inquirer.prompt(question.askQuestion(question.createList)).then( answers => {
  //   console.log(answers);

  //   viewAllEmployees();
  // }) 
}

async function viewAllEmployees() {
  const result = await query(`SELECT * FROM employee`);
  console.table(result);
  init();
}

// async function addEmployee() {
//   const employee
// }

async function viewAllRoles() {
  const result = await query(`SELECT * FROM role`);
  console.table(result);
  init();
}

async function addRole() {
  const departments = await query(`SELECT id, name FROM departments`);
  const questions = [
    {
      type: 'input',
      name: 'title',
      message: 'Please enter your new title.',
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Please enter your new salary.',
    },
    {
      type: 'input',
      name: 'department_id',
      message: 'Please enter your new department.',
      choices: departments,
    },
  ];
  const { title, salary, department_id } = await inquirer.prompt(questions);

  await query(
    `INSERT INTO role (title, salary, department_id) VALUES(?, ?, ?)`,
    [title, salary, department_id]
  );
  viewAllRoles();
}

init();