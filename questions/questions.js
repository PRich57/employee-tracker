module.exports = {

  createList: () => {
    const result = [
      {
        name: 'View All Employees',
        values: 1
      },
      {
        name: 'Add Employee',
        value: 2
      },
      {
        name: 'Update Employee Role',
        value: 3
      },
      {
        name: 'View All Roles',
        value: 4
      },
      {
        name: 'Add Role',
        value: 5
      },
      {
        name: 'View All Departments',
        value: 6
      },
      {
        name: 'Add Department',
        value: 7
      },
    ]
    return result;
  },
  askQuestion: (cb) => {
    const choices = cb();
    return [
      {
        type: 'list',
        name: 'a',
        message: 'What would you like to do?',
        choices
      }
    ]
  }
}