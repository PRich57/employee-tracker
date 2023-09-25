module.exports = {

  createList:() => {
    const result = [
      {
        name: 'Timmy',
        value: 1
      },
      {
        name: 'Tim',
        value: 2
      },
      {
        name: 'Tommy',
        value: 3
      },
    ]
    return result;
  },
  askQuestion:(cb) => {
    const choices = cb();
    return [
      {
        type: 'list',
        name: 'manager_id',
        message: 'Pick a manager',
        choices
      }
    ]
  }
}