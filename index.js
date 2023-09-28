const question = require('./questions/questions');
const inquirer = require('inquirer');
const db = require('./db/connection');
const util = require('util');

const query = util.promisify(db.query).bind(db);

const init = async () => {
  try {
    const answers = await inquirer.prompt(question.askQuestion(question.createList));
    const choice = answers.Choice;

  switch (choice) {
    case 1:
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
    default:
      console.log('Invalid Choice');
    }
  } catch (err) {
    console.error(err);
  }
}

async function viewAllEmployees() {
    const result = await query(`SELECT e.id, CONCAT(e.first_name, " ", e.last_name) AS name, r.title, d.name AS department, r.salary, CONCAT(e2.first_name, " ", e2.last_name) AS manager FROM employee AS e JOIN role AS r ON r.id = e.role_id LEFT JOIN employee AS e2 ON e.manager_id = e2.id JOIN department AS d ON d.id = r.department_id ORDER BY e.id`);
    console.table(result);
    init();
}

async function addEmployee() {
  const roles = await query('SELECT title AS name, id AS value FROM role');
  const manager = await query('SELECT CONCAT(first_name, " ", last_name) AS name, id AS value FROM employee WHERE manager_id IS null');
  manager.push({
    name: 'No Manager',
    value: null,
  });
  const questions = [
    {
      type: 'input',
      name: 'first_name',
      message: `Please enter the employee's first name:`
    },
    {
      type: 'input',
      name: 'last_name',
      message: `Please enter the employee's last name:`
    },
    {
      type: 'list',
      name: 'role_id',
      message: `Please enter the ID number of the employee's role:`,
      choices: roles,
    },
    {
      type: 'list',
      name: 'manager_id',
      message: `Please enter the ID number of the employee's manager:`,
      choices: manager,
    }
  ];
  const { first_name, last_name, role_id, manager_id } = await inquirer.prompt(questions);
  await query(
    `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)`,
    [first_name, last_name, role_id, manager_id]
  );
  console.log(`${first_name} ${last_name} has been added to the employee database`);
  viewAllEmployees();
}

async function updateEmployeeRole() {
  const employee = await query('SELECT CONCAT(first_name, " ", last_name) AS name, id AS value FROM employee');
  const role = await query('SELECT title AS name, id AS value FROM role');
  const questions = [
    {
      type: 'list',
      name: 'name',
      message: 'Please select the employee whose role needs updating:',
      choices: employee,
    },
    {
      type: 'list',
      name: 'role_id',
      message: 'Please select the new role for the selected employee:',
      choices: role
    }
  ];
  const { name, role_id } = await inquirer.prompt(questions);
  await query(
    'UPDATE employee SET role_id = ? WHERE id = ?',
    [role_id, name]
  );
  viewAllEmployees();
}

async function viewAllRoles() {
  // Add to query to join department names instead of id
  const result = await query(`SELECT role.id, title, department.name AS department, salary FROM role JOIN department ON department.id = role.department_id`);
  console.table(result);
  init();
}

// Create addRole function
async function addRole() {
  const department = await query(`SELECT id AS value, name FROM department`);
  const questions = [
    {
      type: 'input',
      name: 'title',
      message: 'Please enter the name of the new role:',
    },
    {
      type: 'input',
      name: 'salary',
      message: `Please enter the new role's salary:`,
    },
    {
      type: 'list',
      name: 'department_id',
      message: `Please enter the new role's department:`,
      choices: department,
    },
  ];
  const { title, salary, department_id } = await inquirer.prompt(questions);

  await query(
    `INSERT INTO role (title, salary, department_id) VALUES(?, ?, ?)`,
    [title, salary, department_id]
  );
  viewAllRoles();
}

// Create viewAllDepartments function
async function viewAllDepartments() {
  // Create variable to store query
  const result = await query(`SELECT * FROM department`);
  console.table(result);
  init();
}

// Create addDepartment function
async function addDepartment() {
  const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'Please enter the name of the new department:'
    },
  ];
  const { name } = await inquirer.prompt(questions);

  await query(
    `INSERT INTO department (name) VALUES (?)`,
    [name]
    );
  console.log(`Added ${ name } to the database.`);
  viewAllDepartments();
}


init();