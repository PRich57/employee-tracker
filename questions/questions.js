module.exports = {

  // Function to create a list of option for the CLI menu
  createList: () => {
    const result = [
      {
        name: 'View All Employees',
        value: 1
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
      {
        name: 'Quit',
        value: 8
      },
    ]
    return result;
  },

  // This function defines the CLI question with the provided choices
  askQuestion: (cb) => {
    const choices = cb();
    return [
      {
        type: 'list',
        name: 'Choice',
        message: 'What would you like to do?', // Prompt for the user
        choices // The list of choices obtained from the callback
      }
    ]
  }
}