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
        description: {type: Sequelize.STRING},
        startDate: {type: Sequelize.DATE, field: 'start_date'},
        endDate: {type: Sequelize.DATE, field: 'end_date'},
      }
    );
  },
  down: async queryInterface => {
    await queryInterface.dropTable('quizzes');
  },
};
