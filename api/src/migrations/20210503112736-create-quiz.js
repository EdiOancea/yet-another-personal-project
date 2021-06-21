'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'quizzes',
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        startDate: {type: Sequelize.DATE, field: 'start_date'},
        endDate: {type: Sequelize.DATE, field: 'end_date'},
        graded: Sequelize.BOOLEAN,
      }
    );
  },
  down: async queryInterface => {
    await queryInterface.dropTable('quizzes');
  },
};
