const question = require('./questions/questions');
const inquirer = require('inquirer');
const mysql = require('mysql2');
// const db = require('./db/connection');
const util = require('util');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'employees_db'
});

const query = util.promisify(db.query).bind(db);

const init = async () => {
  try {
    const answers = await inquirer.prompt(question.askQuestion(question.createList));
    const choice = answers.Choice;

  switch (choice) {
    case 'View All Employees':
      viewAllEmployees();
      break;
    case 2:
      addEmployee();
      break;
    case 3:
      updateEmployeeRole();
      break;
    case 4:
      viewAllRoles();
      break;
    case 5:
      addRole();
      break;
    case 6:
      viewAllDepartments();
      break;
    case 7:
      addDepartment();
      break;
    case 8:
      console.log('Goodbye');
      process.exit();
      break;
    default:
      console.log('Invalid Choice');
    }
  } catch (err) {
    console.error(err);
  }
}

  // inquirer.prompt(question.askQuestion(question.createList)).then( answers => {
  //   console.log(answers);

  //   viewAllEmployees();
  // }) 
// }

async function viewAllEmployees() {
  try {
    await db.connect();
    const result = await query(`SELECT * FROM employee`);
    console.table(result);
    init();
  } catch (err) {
    console.error(err);
  }
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